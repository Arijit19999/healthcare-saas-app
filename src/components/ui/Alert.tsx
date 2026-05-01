import React from 'react';
import { AlertIcon, CheckIcon } from './Icon';
import { cn } from '../../utils/cn';

type Tone = 'error' | 'success' | 'info';

interface AlertProps {
  tone: Tone;
  children: React.ReactNode;
  className?: string;
}

const styles: Record<Tone, { wrap: string; icon: React.ReactNode }> = {
  error: {
    wrap: 'bg-red-50 border-red-200 text-red-700',
    icon: <AlertIcon size={18} className="text-red-500" />,
  },
  success: {
    wrap: 'bg-green-50 border-green-200 text-green-700',
    icon: <CheckIcon size={18} className="text-green-500" />,
  },
  info: {
    wrap: 'bg-blue-50 border-blue-200 text-blue-700',
    icon: <AlertIcon size={18} className="text-blue-500" />,
  },
};

const Alert: React.FC<AlertProps> = ({ tone, children, className }) => {
  const { wrap, icon } = styles[tone];
  return (
    <div className={cn('p-3 border rounded-lg flex items-start gap-2', wrap, className)}>
      <span className="shrink-0 mt-0.5">{icon}</span>
      <div className="text-sm">{children}</div>
    </div>
  );
};

export default Alert;
