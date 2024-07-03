import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { db, getDoc, doc, setDoc, auth } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Setting up onAuthStateChanged listener");
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed", user);
      if (user) {
        try {
          const userDocRef = doc(db, "Users", user.uid);
          const userSnapshot = await getDoc(userDocRef);

          if (!userSnapshot.exists()) {
            console.log("User does not exist in Firestore, creating...");
            await setDoc(userDocRef, {
              email: user.email,
            });
          }
          setCurrentUser(user);
          console.log("User set in state", user);
        } catch (error) {
          console.error("Error accessing Firestore: ", error);
          alert(`Firestore Error: ${error.message}`);
        }
      } else {
        setCurrentUser(null);
        console.log("User set to null");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
