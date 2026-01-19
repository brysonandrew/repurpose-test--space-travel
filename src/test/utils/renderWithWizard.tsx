import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { WizardDraftProvider } from '@/contexts/WizardDraftContext';
import { WizardState } from '@/lib/wizardState';

type Options = Omit<RenderOptions, 'wrapper'> & {
  hydrate?: boolean;
  persist?: boolean;
  initialState?: WizardState;
};

export function renderWithWizard(
  ui: React.ReactElement,
  { hydrate = false, persist = false, initialState, ...options }: Options = {},
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <WizardDraftProvider
        hydrate={hydrate}
        persist={persist}
        initialState={initialState}
      >
        {children}
      </WizardDraftProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
}
