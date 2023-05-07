import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user, signOutUser } = useAuth();

  return (
    <nav className={styles.navbar}>
      <Link href="/">NFL Draft App</Link>
      {user && (
        <ul>
          <li>
            {" "}
            <Link href="/available-players">Available Players</Link>
          </li>
          <li>
           <Link href={`/my-team/${user.uid}`} >My Team</Link>
          </li>
        </ul>
      )}

      <div className={styles.links}>
        {user ? (
          <>
            <span className={styles.userEmail}>{user.email}</span>
            <button className={styles.logoutButton} onClick={signOutUser}>
              Logout
            </button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
