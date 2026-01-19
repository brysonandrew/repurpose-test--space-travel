import { WizardState } from '@/lib/wizardState';
import { Destination } from '@/lib/types';

interface Props {
  state: WizardState;
  destinations: Destination[];
}

export function ReviewStep({ state, destinations }: Props) {
  const destination = destinations.find((d) => d.id === state.destinationId);

  return (
    <section className="mx-auto flex max-w-nav flex-col gap-6 rounded-xl bg-zinc-900/60 p-6 shadow-sm">
      <h2 className="text-center text-2xl font-semibold text-zinc-100">Booking Review</h2>

      <div className="flex flex-col gap-3 text-zinc-300">
        <div className="flex items-center justify-between">
          <span className="font-medium text-zinc-400">Destination</span>
          <span className="text-zinc-100">{destination ? destination.name : '-'}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-zinc-400">Departure</span>
          <span className="text-zinc-100">{state.departureDate || '-'}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-zinc-400">Return</span>
          <span className="text-zinc-100">{state.returnDate || '-'}</span>
        </div>
      </div>

      <div className="border-t border-zinc-700 pt-4">
        <h3 className="mb-2 text-sm font-semibold tracking-wide text-zinc-400 uppercase">
          Travelers
        </h3>

        <ul className="flex flex-col gap-1 text-zinc-200">
          {state.travelers.map((traveler, index) => (
            <li
              key={index}
              className="flex items-center justify-between rounded-md bg-zinc-800/60 px-3 py-2"
            >
              <span>{traveler.fullName}</span>
              <span className="text-sm text-zinc-400">age {traveler.age}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
