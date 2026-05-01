import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useAuth } from '../hooks/useAuth';
import { Alert, Button, ShieldIcon, GoogleIcon } from '../components/ui';
import AuthModeTabs, { AuthMode } from '../components/auth/AuthModeTabs';
import AuthForm from '../components/auth/AuthForm';
import AuthDivider from '../components/auth/AuthDivider';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const { loading, error, reset, signIn, signUp, signInWithGoogle, signUpWithGoogle } = useAuth();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  const handleEmailAuth = async (email: string, password: string) => {
    setSuccess(null);
    if (mode === 'signup') {
      const result = await signUp(email, password);
      if (result.ok) {
        setMode('signin');
        setSuccess('Account created! Please sign in to continue.');
      }
    } else {
      const result = await signIn(email, password);
      if (result.ok) navigate('/dashboard');
    }
  };

  const handleGoogle = async () => {
    setSuccess(null);
    if (mode === 'signup') {
      const result = await signUpWithGoogle();
      if (result.ok) {
        setMode('signin');
        setSuccess('Account created with Google! Please sign in to continue.');
      }
    } else {
      const result = await signInWithGoogle();
      if (result.ok) navigate('/dashboard');
    }
  };

  const handleModeChange = (next: AuthMode) => {
    setMode(next);
    setSuccess(null);
    reset();
  };

  const isSignup = mode === 'signup';

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm mb-3 shadow-lg">
            <ShieldIcon size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Healthcare Portal</h1>
          <p className="text-white/80 text-sm mt-1">
            {isSignup
              ? 'Create your account to get started'
              : 'Sign in to continue to your dashboard'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <AuthModeTabs mode={mode} onChange={handleModeChange} />

          {success && (
            <div className="mb-4">
              <Alert tone="success">{success}</Alert>
            </div>
          )}
          {error && (
            <div className="mb-4">
              <Alert tone="error">{error}</Alert>
            </div>
          )}

          <AuthForm mode={mode} loading={loading} onSubmit={handleEmailAuth} />

          <AuthDivider />

          <Button
            type="button"
            variant="outline"
            fullWidth
            onClick={handleGoogle}
            disabled={loading}
            leftIcon={<GoogleIcon size={18} />}
          >
            Google
          </Button>

          <p className="text-center text-sm text-gray-600 mt-6">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => handleModeChange(isSignup ? 'signin' : 'signup')}
              className="text-indigo-600 font-semibold hover:text-indigo-700"
            >
              {isSignup ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>

        <p className="text-center text-white/70 text-xs mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
