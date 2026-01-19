import React from "react";
import clsx from "clsx";

type Props<T extends React.ElementType> = React.PropsWithChildren<{
  as?: T;
  className?: string;
}> &
  Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Card<T extends React.ElementType = "div">({
  children,
  className,
  as,
  ...props
}: Props<T>) {
  const Tag = (as ?? "div") as React.ElementType;

  return (
    <Tag
      className={clsx(
        "rounded-xl border border-zinc-800 bg-zinc-900/60 shadow-sm backdrop-blur-md",
        "transition-all duration-200",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
