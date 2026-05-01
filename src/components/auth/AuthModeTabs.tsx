import React from 'react';
import { cn } from '../../utils/cn';

export type AuthMode = 'signin' | 'signup';

interface AuthModeTabsProps {
  mode: AuthMode;
  onChange: (mode: AuthMode) => void;
}

const AuthModeTabs: React.FC<AuthModeTabsProps> = ({ mode, onChange }) => (
  <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
    {(['signin', 'signup'] as const).map((m) => (
      <button
        key={m}
        type="button"
        onClick={() => mode !== m && onChange(m)}
        className={cn(
          'flex-1 py-2 text-sm font-medium rounded-md transition-all',
          mode === m
            ? 'bg-white text-indigo-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        )}
      >
        {m === 'signin' ? 'Sign In' : 'Sign Up'}
      </button>
    ))}
  </div>
);

export default AuthModeTabs;
