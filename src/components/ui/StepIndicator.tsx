import clsx from 'clsx';
/**
 * StepIndicator — visually shows wizard steps and progress. Accessible, contrasts for glass backgrounds.
 * Props: steps (array), currentIdx (number), gap optional
 */
export function StepIndicator({
  steps,
  currentIdx,
  className = '',
  gap = 3,
}: {
  steps: string[];
  currentIdx: number;
  gap?: number;
  className?: string;
}) {
  return (
    <nav
      aria-label="Progress"
      className={clsx('flex items-center gap-4', className)}
    >
      {steps.map((label, i) => (
        <div
          key={i}
          className={clsx('flex items-center', i < steps.length - 1 ? `mr-${gap}` : undefined)}
        >
          <span
            className={clsx(
              'inline-flex h-8 w-8 items-center justify-center rounded-full border',
              i < currentIdx
                ? 'border-zinc-400 bg-zinc-200/80 text-zinc-900 dark:bg-zinc-800/80 dark:text-zinc-100'
                : i === currentIdx
                  ? 'border-zinc-600 bg-white/70 text-zinc-900 ring-2 ring-zinc-500 dark:bg-zinc-900/80 dark:text-zinc-100'
                  : 'border-zinc-400 bg-transparent text-zinc-400',
            )}
            aria-current={i === currentIdx ? 'step' : undefined}
          >
            {i + 1}
          </span>
          <span className="ml-2 text-xs font-medium text-zinc-700 select-none dark:text-zinc-300">
            {label}
          </span>
        </div>
      ))}
    </nav>
  );
}
