'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ReviewStep } from '@/components/wizard/ReviewStep';
import { initialWizardState, loadWizardDraft, clearWizardDraft } from '@/lib/wizardState';
import { validateDraft } from '@/lib/validation';
import type { Destination } from '@/lib/types';
import WizardShell from '@/app/wizard/shell';
import WizardBackground from '@/app/wizard/background';

export default function Step3() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [state, setState] = useState(() => initialWizardState);
  const [destinations, setDestinations] = useState<Destination[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const hasSubmitted = useRef(false);

  useEffect(() => {
    setState(loadWizardDraft() ?? initialWizardState);
    setMounted(true);
  }, []);

  useEffect(() => {
    fetch('/api/destinations')
      .then((res) => res.json())
      .then(setDestinations)
      .catch(() => {
        // keep UI stable; optional: set an error state
      });
  }, []);

  const errors = useMemo(() => validateDraft(state), [state]);

  function handleBack() {
    router.push('/wizard/step-2');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (Object.keys(errors).length !== 0) {
      setError('Please fix all validation errors and complete all steps.');
      return;
    }
    if (submitting || hasSubmitted.current) return;

    setSubmitting(true);
    try {
      // ✅ send payload explicitly (avoid wizard-only fields)
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
      if (
        typeof data === 'object' &&
        data !== null &&
        // @ts-expect-error runtime narrowing
        data.success === true &&
        // @ts-expect-error runtime narrowing
        typeof data.bookingId === 'string'
      ) {
        // @ts-expect-error runtime narrowing
        setBookingId(data.bookingId);
        clearWizardDraft();
        hasSubmitted.current = true;
      } else {
        throw new Error('Booking failed: No booking ID returned');
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Submit failed';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  // ✅ critical: server + initial client render match
  if (!mounted) {
    return <div className="min-h-screen" />;
  }

  if (bookingId) {
    return (
      <WizardBackground>
        <div className="text-center">
          <h2 className="text-xl font-semibold">Booking Confirmed!</h2>
          <p className="mt-2">
            Your booking ID: <b>{bookingId}</b>
          </p>
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
            Go home
          </button>
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
        {error && <div className="mt-3 text-red-500">{error}</div>}
        <div className="mt-7 flex w-full justify-between gap-4">
          <button
            type="button"
            onClick={handleBack}
            disabled={submitting}
            className="rounded-lg border border-zinc-200 bg-white/70 px-6 py-2 font-medium text-zinc-900 transition-all hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-zinc-900/80 px-6 py-2 font-bold text-white transition-all hover:bg-zinc-900 disabled:opacity-50"
          >
            {submitting ? 'Booking...' : 'Confirm and Book'}
          </button>
        </div>
      </form>
    </WizardShell>
  );
}
