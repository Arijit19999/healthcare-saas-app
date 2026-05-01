import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Spinner from './ui/Spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, authReady } = useStore();
  const location = useLocation();

  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner size={32} className="text-indigo-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
