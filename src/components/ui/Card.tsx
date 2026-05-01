import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const Card: React.FC<CardProps> = ({ padding = 'md', className, children, ...rest }) => (
  <div
    className={cn(
      'bg-white rounded-2xl shadow-sm border border-gray-100',
      paddings[padding],
      className
    )}
    {...rest}
  >
    {children}
  </div>
);

export default Card;
