import { redirect } from "next/navigation";

export default function WizardRoot() {
  // Default to step-1 for /wizard
  redirect("/wizard/step-1");
  return null;
}
