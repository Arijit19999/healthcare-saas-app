import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { EyeIcon, EyeOffIcon } from './Icon';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: React.ReactNode;
  error?: string;
  hint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, leftIcon, error, hint, type, className, id, ...rest }, ref) => {
    const [showPwd, setShowPwd] = useState(false);
    const isPwd = type === 'password';
    const effectiveType = isPwd ? (showPwd ? 'text' : 'password') : type;
    const inputId = id ?? (label ? `input-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block mb-1.5 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            type={effectiveType}
            className={cn(
              'w-full border rounded-lg py-2.5 transition',
              'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
              leftIcon ? 'pl-10' : 'pl-3',
              isPwd ? 'pr-10' : 'pr-3',
              error
                ? 'border-red-300 bg-red-50/30'
                : 'border-gray-300 bg-white',
              className
            )}
            {...rest}
          />
          {isPwd && (
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
              aria-label={showPwd ? 'Hide password' : 'Show password'}
            >
              {showPwd ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          )}
        </div>
        {error ? (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        ) : hint ? (
          <p className="mt-1 text-xs text-gray-500">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
