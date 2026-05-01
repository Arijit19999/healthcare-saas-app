import React, { useState } from 'react';
import { Input, Button, MailIcon, LockIcon, ShieldIcon } from '../ui';
import { AuthMode } from './AuthModeTabs';

interface AuthFormProps {
  mode: AuthMode;
  loading: boolean;
  onSubmit: (email: string, password: string) => void;
}

const validate = (email: string, password: string, confirm: string, isSignup: boolean) => {
  if (!/^\S+@\S+\.\S+$/.test(email)) return 'Please enter a valid email address.';
  if (password.length < 6) return 'Password must be at least 6 characters.';
  if (isSignup && password !== confirm) return 'Passwords do not match.';
  return null;
};

const AuthForm: React.FC<AuthFormProps> = ({ mode, loading, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [clientError, setClientError] = useState<string | null>(null);
  const isSignup = mode === 'signup';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate(email, password, confirm, isSignup);
    if (validationError) {
      setClientError(validationError);
      return;
    }
    setClientError(null);
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        leftIcon={<MailIcon size={18} />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        autoComplete="email"
        required
      />

      <Input
        label="Password"
        type="password"
        leftIcon={<LockIcon size={18} />}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={isSignup ? 'At least 6 characters' : 'Enter your password'}
        autoComplete={isSignup ? 'new-password' : 'current-password'}
        minLength={6}
        required
      />

      {isSignup && (
        <Input
          label="Confirm Password"
          type="password"
          leftIcon={<ShieldIcon size={18} />}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          minLength={6}
          required
        />
      )}

      {clientError && <p className="text-xs text-red-600">{clientError}</p>}

      <Button type="submit" loading={loading} fullWidth size="md">
        {isSignup ? 'Create Account' : 'Sign In'}
      </Button>
    </form>
  );
};

export default AuthForm;
