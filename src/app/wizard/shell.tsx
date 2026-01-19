import { StepIndicator } from "@/components/ui/StepIndicator";
import WizardBackground from "@/app/wizard/background";

const steps = ["Destination", "Travelers", "Review"];

/**
 * WizardShell — centers the wizard, applies glassmorphism Card container,
 * and renders StepIndicator + title. Children are the step content.
 */
export default function WizardShell({
  step = 0,
  children,
}: {
  step?: number;
  children: React.ReactNode;
}) {
  return (
    <WizardBackground>
      <div className="flex flex-col items-center gap-4">
        <StepIndicator steps={steps} currentIdx={step} />
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
          Intergalactic Booking Wizard
        </h1>
      </div>
      <div className="w-full">{children}</div>
    </WizardBackground>
  );
}
