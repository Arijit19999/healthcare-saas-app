import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { auth, onAuthStateChanged } from './services/firebaseAuth';
import { useStore } from './store/useStore';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import PatientDetailsPage from './pages/PatientDetailsPage';

const App: React.FC = () => {
  const { setUser, setAuthReady } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, [setUser, setAuthReady]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <AnalyticsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient-details"
        element={
          <ProtectedRoute>
            <PatientDetailsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
