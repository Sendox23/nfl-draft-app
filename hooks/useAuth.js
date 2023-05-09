import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../api/firebase";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signUpWithEmail = async (email, password, teamName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // Update user profile with display name
      await updateProfile(user, { displayName: teamName });

      setUser({
        uid: user.uid,
        displayName: teamName,
      });
      setError(null);
      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };
  const signInWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      setUser({
        uid: user.uid,
        displayName: user.displayName,
      });
      setError(null);
      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    user,
    error,
    loading,
    signUpWithEmail,
    signInWithEmail,
    signOutUser,
  };
};