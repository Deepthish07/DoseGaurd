import React from 'react';

interface ToggleProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel?: string;
}

export function Toggle({ id, checked, onChange, ariaLabel }: ToggleProps) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        checked ? 'bg-blue-600' : 'bg-slate-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
        aria-hidden="true"
      />
    </button>
  );
}