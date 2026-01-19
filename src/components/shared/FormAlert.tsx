import React from 'react';

export type FormAlertProps = {
  message: React.ReactNode;
  variant?: 'error';
  className?: string;
};

export const FormAlert: React.FC<FormAlertProps> = ({ message, variant = 'error', className }) => {
  let styleClass = 'rounded-lg border px-4 py-3 text-sm';
  if (variant === 'error') {
    styleClass += ' border-red-900/40 bg-red-950/30 text-red-200';
  }
  return (
    <div
      role="alert"
      className={`${styleClass}${className ? ` ${className}` : ''}`}
      data-testid="form-alert"
    >
      {message}
    </div>
  );
};
