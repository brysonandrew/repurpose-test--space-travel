import React from "react";
import clsx from "clsx";

/**
 * Button component — styled for primary, secondary, loading, disabled states. Glassmorphism-friendly.
 * Use type={...} for semantic buttons, pass variant.
 */
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  loading?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", loading, disabled, children, ...props }, ref) => {
    return (
      <button
        type={props.type || "button"}
        className={clsx(
          "font-semibold px-5 py-2.5 rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2",
          variant === "primary"
            ? "bg-zinc-900/80 text-white border border-zinc-800/40 shadow-md hover:bg-zinc-800/90 focus-visible:ring-zinc-400/60"
            : "bg-white/70 text-zinc-900 border border-zinc-200 hover:bg-white/90 focus-visible:ring-zinc-800/40",
          "disabled:opacity-60 disabled:pointer-events-none",
          loading && "relative text-transparent before:content-[''] before:absolute before:inset-0 before:backdrop-blur-[3px]",
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 border-2 border-zinc-400/60 border-t-transparent rounded-full animate-spin" aria-label="loading"></span>
        ) : null}
        <span className={loading ? "invisible" : undefined}>{children}</span>
      </button>
    );
  }
);
Button.displayName = "Button";
