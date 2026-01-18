import React from "react";

import { Card } from "@/components/ui/Card";
import { StepIndicator } from "@/components/ui/StepIndicator";

const steps = ["Destination", "Travelers", "Review"];

/**
 * WizardShell — centers the wizard, applies glassmorphism Card container,
 * and renders StepIndicator + title. Children are the step content.
 */
export default function WizardShell({ step = 0, children }: { step?: number; children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black py-10">
      <Card className="w-full max-w-xl mx-auto p-8 sm:p-12 flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4">
          <StepIndicator steps={steps} currentIdx={step} />
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Intergalactic Booking Wizard</h1>
        </div>
        <div className="w-full">{children}</div>
      </Card>
    </main>
  );
}
