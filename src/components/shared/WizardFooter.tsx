import React from "react";

type WizardFooterProps = {
  leftButtonLabel?: string;
  onLeftClick?: () => void;
  leftDisabled?: boolean;
  hideLeftButton?: boolean;

  rightButtonLabel?: string;
  rightButtonChildren?: React.ReactNode;
  onRightClick?: (e: React.FormEvent) => void;
  rightDisabled?: boolean;
  rightDataTestId?: string;
  rightAriaLabel?: string;
  rightButtonType?: "button" | "submit";
  className?: string;
};

export const WizardFooter: React.FC<WizardFooterProps> = ({
  leftButtonLabel = "← Back",
  onLeftClick,
  leftDisabled = false,
  hideLeftButton = false,
  rightButtonLabel = "Next",
  rightButtonChildren,
  onRightClick,
  rightDisabled = false,
  rightDataTestId,
  rightAriaLabel,
  rightButtonType = "submit",
  className = "",
}) => (
  <div className={`mt-7 flex w-full justify-between gap-4 ${className}`}>
    {!hideLeftButton ? (
      <button
        type="button"
        onClick={onLeftClick}
        disabled={leftDisabled}
        className="rounded-lg border border-zinc-700 bg-zinc-900/60 px-6 py-2 font-medium text-zinc-100 transition-all hover:bg-zinc-800 disabled:opacity-50"
      >
        {leftButtonLabel}
      </button>
    ) : (
      <span />
    )}{" "}
    {/* keep space for button layout */}
    <button
      type={rightButtonType}
      onClick={onRightClick}
      disabled={rightDisabled}
      data-testid={rightDataTestId}
      aria-label={rightAriaLabel}
      className="rounded-lg bg-zinc-900/80 px-6 py-2 font-bold text-white transition-all hover:bg-zinc-900 disabled:opacity-50"
    >
      {rightButtonChildren || rightButtonLabel}
    </button>
  </div>
);
