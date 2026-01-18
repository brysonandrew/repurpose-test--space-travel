import React from "react";
import clsx from "clsx";

/**
 * Card component — glassmorphism panel for use in wizard container and cards.
 * Applies soft blur, neutral background, border, and subtle shadow.
 * Extend with extra classes as needed for selected/pressed.
 */
export function Card({
  children,
  className = "",
  as: Tag = "div",
  ...props
}: React.PropsWithChildren<{
  className?: string;
  as?: keyof JSX.IntrinsicElements;
} & React.HTMLAttributes<HTMLElement>>) {
  return (
    <Tag
      className={clsx(
        "backdrop-blur-md bg-white/60 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm",
        "transition-all duration-200",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
