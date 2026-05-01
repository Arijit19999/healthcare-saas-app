import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCJ4TVYzOHZBWVbmLB4ZZJTnJ1RWlxYgJw",
  authDomain: "b2b-saas-application-ragaai.firebaseapp.com",
  projectId: "b2b-saas-application-ragaai",
  storageBucket: "b2b-saas-application-ragaai.firebasestorage.app",
  messagingSenderId: "154911875920",
  appId: "1:154911875920:web:fc03673e869f31028ac255",
  measurementId: "G-WZ9KSLZF7R",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  googleAuthProvider,
  analytics,
  signOut,
};
