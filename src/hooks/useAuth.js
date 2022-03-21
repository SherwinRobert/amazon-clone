import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { app } from "../firebase-config";


const Auth = React.createContext();

export const useAuth = () => {
    return useContext(Auth)
}

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({
      isLoggedIn: false,
      name: "",
    });

    const auth = getAuth();
    const createAccount = (email,password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const signIn = (email,password) => {
        return signInWithEmailAndPassword(auth, email, password) 
    };
    
    const logOut = () => {
       return auth.signOut();
    }

     useEffect(() => {
       const unsubscribe = auth.onAuthStateChanged((user) => {
           setUser({
               isLoggedIn: user ? true : false,
               name: user
         });
       });

         return unsubscribe;
         
     }, []);
  

    let value = {
        signIn,
        createAccount,
        logOut,
        user
    }

    return (
        <Auth.Provider value={value}>
            {children}
        </Auth.Provider>
    )
}

export default AuthProvider;