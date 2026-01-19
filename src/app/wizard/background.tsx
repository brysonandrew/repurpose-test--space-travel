import { Card } from '@/components/ui/Card';

export default function WizardBackground({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black py-10">
      <Card className="mx-auto flex w-full max-w-xl flex-col gap-8 p-8 sm:p-12">{children}</Card>
    </main>
  );
}
