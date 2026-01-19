import { WizardDraftProvider } from '@/contexts/WizardDraftContext';

export default function WizardLayout({ children }: { children: React.ReactNode }) {
  return <WizardDraftProvider>{children}</WizardDraftProvider>;
}
