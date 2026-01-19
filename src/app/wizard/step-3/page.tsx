'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ReviewStep } from '@/components/wizard/ReviewStep';
import { FormAlert } from '@/components/shared/FormAlert';
import { WizardFooter } from '@/components/shared/WizardFooter';
import { validateDraft } from '@/lib/validation';
import type { Destination } from '@/lib/types';
import WizardShell from '@/app/wizard/shell';
import WizardBackground from '@/app/wizard/background';
import { useWizardDraft } from '@/contexts/WizardDraftContext';
import { clearWizardDraft } from '@/lib/draftStorage';

type BookingResponse = { success: true; bookingId: string };

function isBookingResponse(x: unknown): x is BookingResponse {
  return (
    typeof x === 'object' &&
    x !== null &&
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (x as any).success === true &&
    /* eslint-disable @typescript-eslint/no-explicit-any */
    typeof (x as any).bookingId === 'string'
  );
}

export default function Step3() {
  const router = useRouter();
  const { state } = useWizardDraft();

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const hasSubmitted = useRef(false);

  const currentErrors = useMemo(() => validateDraft(state), [state]);
  const isInvalid = Object.keys(currentErrors).length !== 0;

  useEffect(() => {
    fetch('/api/destinations')
      .then((res) => res.json())
      .then(setDestinations)
      .catch(() => {});
  }, []);

  function handleBack() {
    router.push('/wizard/step-2');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Validate at the moment of submit
    const nextErrors = validateDraft(state);
    if (Object.keys(nextErrors).length !== 0) {
      setError('Please fix all validation errors and complete all steps.');
      return;
    }

    if (submitting || hasSubmitted.current) return;

    setSubmitting(true);
    try {
      const payload = {
        destinationId: state.destinationId,
        departureDate: state.departureDate,
        returnDate: state.returnDate,
        travelers: state.travelers,
      };

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data: unknown = await res.json();
      if (!isBookingResponse(data)) {
        throw new Error('Booking failed: No booking ID returned');
      }

      setBookingId(data.bookingId);
      clearWizardDraft();
      hasSubmitted.current = true;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Submit failed');
    } finally {
      setSubmitting(false);
    }
  }

  if (bookingId) {
    return (
      <WizardBackground>
        <div className="text-center">
          <h2 className="text-xl font-semibold">Booking Confirmed!</h2>
          <p className="mt-2">
            Your booking ID: <b>{bookingId}</b>
          </p>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push('/wizard/step-1')}
              className="mt-6 underline underline-offset-4"
            >
              Book another trip
            </button>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="mt-6 underline underline-offset-4"
            >
              Home
            </button>
          </div>
        </div>
      </WizardBackground>
    );
  }

  return (
    <WizardShell>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10"
      >
        <ReviewStep
          state={state}
          destinations={destinations}
        />

        {error && (
          <FormAlert
            message={error}
            className="mt-3"
          />
        )}

        <WizardFooter
          leftButtonLabel="← Back"
          onLeftClick={handleBack}
          leftDisabled={submitting}
          rightButtonChildren={submitting ? 'Booking...' : 'Confirm and Book'}
          rightDisabled={submitting || isInvalid}
        />
      </form>
    </WizardShell>
  );
}
