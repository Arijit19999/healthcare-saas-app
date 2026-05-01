import React from 'react';
import Card from './Card';
import { TrendUpIcon, TrendDownIcon } from './Icon';
import { cn } from '../../utils/cn';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg?: string;
  trend?: { value: number; positive?: boolean };
  hint?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  iconBg = 'bg-indigo-100 text-indigo-600',
  trend,
  hint,
}) => (
  <Card padding="md" className="hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        {trend && (
          <div className="mt-2 flex items-center gap-1 text-xs font-medium">
            <span
              className={cn(
                'inline-flex items-center gap-0.5',
                trend.positive ? 'text-green-600' : 'text-red-600'
              )}
            >
              {trend.positive ? <TrendUpIcon size={14} /> : <TrendDownIcon size={14} />}
              {trend.value}%
            </span>
            {hint && <span className="text-gray-500">{hint}</span>}
          </div>
        )}
      </div>
      <div className={cn('p-3 rounded-xl', iconBg)}>{icon}</div>
    </div>
  </Card>
);

export default StatCard;
