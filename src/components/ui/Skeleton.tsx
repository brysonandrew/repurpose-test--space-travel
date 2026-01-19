import clsx from 'clsx';

export interface Props {
  count?: number;
  className?: string;
  itemClassName?: string;
}
export const Skeleton = ({ count = 6, className, itemClassName }: Props) => {
  return (
    <ul className={clsx('flex flex-col gap-4', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <li
          key={index}
          className={clsx(
            'rounded-lg border border-zinc-700 bg-zinc-900/60 px-5 py-4 shadow-sm backdrop-blur-sm',
            itemClassName,
          )}
        >
          <div className="flex items-center gap-3">
            <div className="mr-4 h-4 w-4 rounded-full border border-zinc-600" />

            <div className="flex w-full flex-col gap-2">
              <div className="h-4 w-40 animate-pulse rounded bg-zinc-700/60" />
              <div className="h-3 w-72 max-w-[80%] animate-pulse rounded bg-zinc-700/40" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
