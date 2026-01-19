import { WizardState } from '@/lib/wizardState';
import { Destination } from '@/lib/types';

interface Props {
  state: WizardState;
  destinations: Destination[];
}

export function ReviewStep({ state, destinations }: Props) {
  const dest = destinations.find((d) => d.id === state.destinationId);
  return (
    <section className="flex flex-col gap-6">
      <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
        Booking Review
      </h2>
      <div className="mb-2">
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">Destination:</span>{' '}
        <span>{dest ? dest.name : '-'}</span>
      </div>
      <div className="mb-2">
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">Departure:</span>{' '}
        <span>{state.departureDate || '-'}</span>
        <br />
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">Return:</span>{' '}
        <span>{state.returnDate || '-'}</span>
      </div>
      <div>
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">Travelers:</span>
        <ol className="mt-1 ml-4 list-decimal text-zinc-700 dark:text-zinc-300">
          {state.travelers.map((trav, i) => (
            <li
              key={i}
              className="mb-1"
            >
              {trav.fullName} (age {trav.age})
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
