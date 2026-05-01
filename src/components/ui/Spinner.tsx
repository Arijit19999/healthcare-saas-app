import React from 'react';
import { SpinnerIcon } from './Icon';

interface SpinnerProps {
  size?: number;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 20, className = '' }) => (
  <SpinnerIcon size={size} className={`animate-spin ${className}`} />
);

export default Spinner;
