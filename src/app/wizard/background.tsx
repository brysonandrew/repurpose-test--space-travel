import { Card } from '@/components/ui/Card';

export default function WizardBackground({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 py-10 dark:bg-black">
      <Card className="mx-auto flex w-full max-w-xl flex-col gap-8 p-8 sm:p-12">{children}</Card>
    </main>
  );
}
