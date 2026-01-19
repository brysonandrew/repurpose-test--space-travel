import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { WizardDraftProvider } from '@/contexts/WizardDraftContext';

type Options = Omit<RenderOptions, 'wrapper'> & {
  hydrate?: boolean;
  persist?: boolean;
};

export function renderWithWizard(
  ui: React.ReactElement,
  { hydrate = false, persist = false, ...options }: Options = {},
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <WizardDraftProvider
        hydrate={hydrate}
        persist={persist}
      >
        {children}
      </WizardDraftProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
}
