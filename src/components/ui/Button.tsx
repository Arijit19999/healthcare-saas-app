import React from 'react';
import { cn } from '../../utils/cn';
import Spinner from './Spinner';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg',
  secondary: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
  outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
  ghost: 'text-gray-700 hover:bg-gray-100',
  danger: 'bg-red-500 hover:bg-red-600 text-white shadow-sm',
};

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  children,
  disabled,
  ...rest
}) => {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all',
        'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
    >
      {loading ? <Spinner size={18} /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
};

export default Button;
