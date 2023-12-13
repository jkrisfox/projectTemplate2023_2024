// import { SessionProvider } from "next-auth/react";

// export default function AuthProvider({children}) {
//   return <SessionProvider>{children}</SessionProvider>
// }

'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function signOut() {
    return auth.signOut();
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function getUser() {
    return auth.currentUser;
  }

  function isLoggedIn() {
    return auth.currentUser !== null;
  }

  async function isAdmin() {
    return await auth.currentUser.getIdTokenResult().then((idTokenResult) => {
      if (!!idTokenResult.claims.admin) {
        return true;
      } else {
        return false;
      }
    }).catch(err => {
      throw err;
    });
  }

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(
    (user) => {
      setCurrentUser(user);
      setLoading(false);
    },
    (error) => {
      console.error("Authentication error:", error);
      setLoading(false);
    }
  );

  return unsubscribe;
}, []);


  const value = {
    currentUser,
    getUser,
    isLoggedIn,
    isAdmin,
    login,
    signOut,
    signUp
  }

  return (
    <AuthContext.Provider value={value}>
      { !loading && children }
    </AuthContext.Provider>
  )

}