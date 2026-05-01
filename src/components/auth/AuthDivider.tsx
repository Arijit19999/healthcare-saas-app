import React from 'react';

const AuthDivider: React.FC<{ label?: string }> = ({ label = 'or continue with' }) => (
  <div className="relative my-5">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-200" />
    </div>
    <div className="relative flex justify-center text-xs">
      <span className="bg-white px-3 text-gray-500 uppercase tracking-wider">{label}</span>
    </div>
  </div>
);

export default AuthDivider;
