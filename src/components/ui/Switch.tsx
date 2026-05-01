import React from 'react';
import { cn } from '../../utils/cn';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange, label, disabled = false }) => (
  <label className={cn('inline-flex items-center gap-2', disabled && 'opacity-60')}>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full transition',
        'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
        checked ? 'bg-indigo-600' : 'bg-gray-300'
      )}
    >
      <span
        className={cn(
          'inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition',
          checked ? 'translate-x-5' : 'translate-x-0.5'
        )}
      />
    </button>
    {label && <span className="text-sm text-gray-700">{label}</span>}
  </label>
);

export default Switch;
