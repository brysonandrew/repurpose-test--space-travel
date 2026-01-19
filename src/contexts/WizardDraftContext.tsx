"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import type { WizardAction, WizardState } from "@/lib/wizardState";
import { wizardReducer, initialWizardState } from "@/lib/wizardState";
import {
  loadWizardDraft,
  saveWizardDraft,
  clearWizardDraft,
} from "@/lib/draftStorage";

/**
 * Public context shape exposed to consumers.
 * Keeps the API small and explicit:
 *  - state: current wizard draft
 *  - dispatch: reducer actions
 *  - reset: reset to initial wizard state
 *  - clear: wipe persisted draft from storage
 */
type WizardDraftContextValue = {
  state: WizardState;
  dispatch: React.Dispatch<WizardAction>;
  reset: () => void;
  clear: () => void;
};

const WizardDraftContext = createContext<WizardDraftContextValue | null>(null);

type WizardDraftProviderProps = {
  children: React.ReactNode;

  /**
   * Whether to hydrate initial state from persisted storage.
   * Useful for tests or controlled environments.
   */
  hydrate?: boolean;

  /**
   * Whether to persist state changes to storage.
   * Can be disabled for tests or ephemeral flows.
   */
  persist?: boolean;

  /**
   * Optional explicit initial state override
   * (primarily for tests or controlled entry points).
   */
  initialState?: WizardState;
};

/**
 * Provider responsible for:
 *  - owning the wizard reducer
 *  - hydrating draft state from storage
 *  - persisting changes back to storage
 */
export const WizardDraftProvider = ({
  children,
  hydrate = true,
  persist = true,
  initialState,
}: WizardDraftProviderProps) => {
  // Core reducer-driven state for the wizard
  const [state, dispatch] = useReducer(
    wizardReducer,
    initialState ?? initialWizardState
  );

  /**
   * Tracks whether hydration has completed.
   * Prevents saving the default initial state
   * over a valid persisted draft on first render.
   */
  const hydratedRef = useRef(false);

  /**
   * Hydration effect:
   *  - Load persisted draft (if enabled)
   *  - Dispatch hydrate action once on mount
   */
  useEffect(() => {
    if (!hydrate) {
      hydratedRef.current = true;
      return;
    }

    const draft = loadWizardDraft();
    if (draft) {
      dispatch({ type: "hydrate", state: draft });
    }

    hydratedRef.current = true;
  }, [hydrate]);

  /**
   * Persistence effect:
   *  - Save state changes to storage
   *  - Guarded so it only runs after hydration
   */
  useEffect(() => {
    if (!persist) return;
    if (!hydratedRef.current) return;

    saveWizardDraft(state);
  }, [state, persist]);

  const value: WizardDraftContextValue = {
    state,
    dispatch,
    reset: () => dispatch({ type: "reset" }),
    clear: () => clearWizardDraft(),
  };

  return (
    <WizardDraftContext.Provider value={value}>
      {children}
    </WizardDraftContext.Provider>
  );
};

/**
 * Hook for consuming wizard draft state.
 * Enforces usage within the provider boundary.
 */
export const useWizardDraft = (): WizardDraftContextValue => {
  const ctx = useContext(WizardDraftContext);
  if (!ctx) {
    throw new Error(
      "useWizardDraft must be used within <WizardDraftProvider />"
    );
  }
  return ctx;
};
