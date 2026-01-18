import clsx from "clsx";
/**
 * StepIndicator — visually shows wizard steps and progress. Accessible, contrasts for glass backgrounds.
 * Props: steps (array), currentIdx (number), gap optional
 */
export function StepIndicator({ steps, currentIdx, className = "", gap = 3 }: {
  steps: string[];
  currentIdx: number;
  gap?: number;
  className?: string;
}) {
  return (
    <nav aria-label="Progress" className={clsx("flex items-center gap-4", className)}>
      {steps.map((label, i) => (
        <div key={i} className={clsx(
          "flex items-center",
          i < steps.length - 1 ? `mr-${gap}` : undefined
        )}>
          <span
            className={clsx(
              "inline-flex items-center justify-center w-8 h-8 rounded-full border",
              i < currentIdx
                ? "bg-zinc-200/80 dark:bg-zinc-800/80 border-zinc-400 text-zinc-900 dark:text-zinc-100"
                : i === currentIdx
                  ? "bg-white/70 dark:bg-zinc-900/80 border-zinc-600 text-zinc-900 dark:text-zinc-100 ring-2 ring-zinc-500"
                  : "bg-transparent border-zinc-400 text-zinc-400"
            )}
            aria-current={i === currentIdx ? "step" : undefined}
          >
            {i + 1}
          </span>
          <span className="ml-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 select-none">
            {label}
          </span>
        </div>
      ))}
    </nav>
  );
}
