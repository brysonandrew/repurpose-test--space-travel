'use client';
import React, { useReducer, useEffect, useRef, useState } from "react";
import { ReviewStep } from "../../../components/wizard/ReviewStep";
import { wizardReducer, initialWizardState, saveWizardDraft, loadWizardDraft, clearWizardDraft } from "../../../lib/wizardState";
import { validateDraft } from "../../../lib/validation";
import { useRouter } from "next/navigation";

export default function Step3() {
  const [state, dispatch] = useReducer(
    wizardReducer,
    undefined,
    () => loadWizardDraft() ?? initialWizardState
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const router = useRouter();
  const errors = validateDraft(state);
  const [destinations, setDestinations] = useState<any[]>([]);
  const hasSubmitted = useRef(false);

  useEffect(() => {
    saveWizardDraft(state);
  }, [state]);

  useEffect(() => {
    // fetch destination list so we can show proper names
    fetch("/api/destinations").then(res => res.json()).then(setDestinations);
  }, []);

  function handleBack() {
    router.push("/wizard/step-2");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (Object.keys(errors).length !== 0) {
      setError("Please fix all validation errors and complete all steps.");
      return;
    }
    if (submitting || hasSubmitted.current) return;
    setSubmitting(true);
    try {
      // POST booking
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.success && data.bookingId) {
        setBookingId(data.bookingId);
        clearWizardDraft();
        hasSubmitted.current = true;
      } else {
        throw new Error("Booking failed: No booking ID returned");
      }
    } catch (e: any) {
      setError(e.message || "Submit failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (bookingId) {
    return (
      <div style={{marginTop:60}}>
        <h2>Booking Confirmed!</h2>
        <p>Your booking ID: <b>{bookingId}</b></p>
        <button type="button" onClick={() => router.push("/wizard/step-1")}>Book another trip</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <ReviewStep state={state} destinations={destinations} />
      {error && <div style={{ color: "red", marginTop: 20 }}>{error}</div>}
      <div style={{ display: "flex", justifyContent: "space-between", gap: 24, marginTop: 36 }}>
        <button type="button" onClick={handleBack} disabled={submitting}>← Back</button>
        <button type="submit" disabled={submitting}>
          {submitting ? "Booking..." : "Confirm and Book"}
        </button>
      </div>
    </form>
  );
}
