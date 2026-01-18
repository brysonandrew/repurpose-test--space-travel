import React from 'react';
import clsx from 'clsx';

/**
 * Card component — glassmorphism panel for use in wizard container and cards.
 * Applies soft blur, neutral background, border, and subtle shadow.
 * Extend with extra classes as needed for selected/pressed.
 */
export function Card({
  children,
  className = '',
  as: Tag = 'div',
  ...props
}: React.PropsWithChildren<
  {
    className?: string;
    as?: keyof JSX.IntrinsicElements;
  } & React.HTMLAttributes<HTMLElement>
>) {
  return (
    <Tag
      className={clsx(
        'rounded-xl border border-zinc-200 bg-white/60 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/60',
        'transition-all duration-200',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
