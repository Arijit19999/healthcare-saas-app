import React from 'react';
import { cn } from '../../utils/cn';

type Tone = 'gray' | 'green' | 'red' | 'yellow' | 'indigo' | 'blue';

interface BadgeProps {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}

const tones: Record<Tone, string> = {
  gray: 'bg-gray-100 text-gray-700',
  green: 'bg-green-100 text-green-700',
  red: 'bg-red-100 text-red-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  indigo: 'bg-indigo-100 text-indigo-700',
  blue: 'bg-blue-100 text-blue-700',
};

const Badge: React.FC<BadgeProps> = ({ tone = 'gray', children, className }) => (
  <span
    className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      tones[tone],
      className
    )}
  >
    {children}
  </span>
);

export default Badge;
