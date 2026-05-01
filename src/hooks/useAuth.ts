import { useCallback, useState } from 'react';
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  googleAuthProvider,
  signOut,
} from '../services/firebaseAuth';
import { useStore } from '../store/useStore';

const friendlyError = (code: string): string => {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Invalid email or password.';
    case 'auth/email-already-in-use':
      return 'An account already exists with this email.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in was cancelled.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled. Enable it in Firebase Console.';
    case 'auth/network-request-failed':
      return 'Network error. Check your connection.';
    default:
      return 'Something went wrong. Please try again.';
  }
};

export const useAuth = () => {
  const { setUser, logout } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => setError(null);

  const signIn = useCallback(
    async (email: string, password: string) => {
      setError(null);
      setLoading(true);
      try {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        setUser(credential.user);
        return { ok: true as const };
      } catch (err) {
        const code = (err as { code?: string })?.code ?? '';
        const message = friendlyError(code);
        setError(message);
        return { ok: false as const, message };
      } finally {
        setLoading(false);
      }
    },
    [setUser]
  );

  const signUp = useCallback(async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Conventional flow: do NOT auto-sign-in. Sign user out so they explicitly log in.
      await signOut(auth);
      return { ok: true as const };
    } catch (err) {
      const code = (err as { code?: string })?.code ?? '';
      const message = friendlyError(code);
      setError(message);
      return { ok: false as const, message };
    } finally {
      setLoading(false);
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithRedirect(auth, googleAuthProvider);
      // Page redirects to Google — onAuthStateChanged handles the result on return
      return { ok: true as const };
    } catch (err) {
      const code = (err as { code?: string })?.code ?? '';
      const message = friendlyError(code);
      setError(message);
      setLoading(false);
      return { ok: false as const, message };
    }
  }, []);

  const signOutUser = useCallback(async () => {
    try {
      await signOut(auth);
    } finally {
      logout();
    }
  }, [logout]);

  return {
    loading,
    error,
    reset,
    signIn,
    signUp,
    signInWithGoogle,
    signOut: signOutUser,
  };
};
