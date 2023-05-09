import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import styles from "./login.module.css";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";

const LoginPage = () => {
  const { user, signInWithEmail, signUpWithEmail, error } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teamName, setTeamName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let user;
      if (isSignUp) {
        user = await signUpWithEmail(email, password, teamName);
      } else {
        user = await signInWithEmail(email, password);
      }
      router.push(`/my-team/${user.uid}`);
    } catch (err) {
      console.error("Error during login or signup:", err);
    }
  };

  const toggleSignUp = () => setIsSignUp(!isSignUp);

  if (user) {
    return (
      <Layout>
        <main className={styles.loginMain}>
          <h1>You are already logged in</h1>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.loginMain}>
        <h1>{isSignUp ? "Sign up" : "Login"}</h1>{" "}
        {isSignUp && (
          <div className={styles.inputGroup}>
            <label htmlFor="teamName">Team Name:</label>
            <input
              type="text"
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>
        )}
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleFormSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={isSignUp ? styles.signupButton : styles.loginButton}
          >
            {isSignUp ? "Sign up" : "Login"}
          </button>
        </form>
        <p>
          {isSignUp ? "Already a member?" : "Not a member yet?"}{" "}
          <span className={styles.toggleSignup} onClick={toggleSignUp}>
            {isSignUp ? "Login" : "Sign up"}
          </span>
        </p>
      </div>
    </Layout>
  );
};

export default LoginPage;
