'use client';

import React, { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import type { WizardAction, WizardState } from '@/lib/wizardState';
import { wizardReducer, initialWizardState } from '@/lib/wizardState';
import { loadWizardDraft, saveWizardDraft, clearWizardDraft } from '@/lib/draftStorage';

type WizardDraftContextValue = {
  state: WizardState;
  dispatch: React.Dispatch<WizardAction>;
  reset: () => void;
  clear: () => void;
};

const WizardDraftContext = createContext<WizardDraftContextValue | null>(null);

type WizardDraftProviderProps = {
  children: React.ReactNode;
  hydrate?: boolean;
  persist?: boolean;
  initialState?: WizardState;
};

export const WizardDraftProvider = ({
  children,
  hydrate = true,
  persist = true,
  initialState,
}: WizardDraftProviderProps) => {
  const [state, dispatch] = useReducer(wizardReducer, initialState ?? initialWizardState);
  const hydratedRef = useRef(false);

  useEffect(() => {
    if (!hydrate) {
      hydratedRef.current = true;
      return;
    }

    const draft = loadWizardDraft();
    if (draft) dispatch({ type: 'hydrate', state: draft });

    hydratedRef.current = true;
  }, [hydrate]);

  useEffect(() => {
    if (!persist) return;
    if (!hydratedRef.current) return;

    saveWizardDraft(state);
  }, [state, persist]);

  const value: WizardDraftContextValue = {
    state,
    dispatch,
    reset: () => dispatch({ type: 'reset' }),
    clear: () => clearWizardDraft(),
  };

  return <WizardDraftContext.Provider value={value}>{children}</WizardDraftContext.Provider>;
};

export const useWizardDraft = (): WizardDraftContextValue => {
  const ctx = useContext(WizardDraftContext);
  if (!ctx) {
    throw new Error('useWizardDraft must be used within <WizardDraftProvider />');
  }
  return ctx;
};
