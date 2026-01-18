import React from "react";

export default function WizardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <h1>Intergalactic Booking Wizard</h1>
      <div>{children}</div>
    </main>
  );
}
