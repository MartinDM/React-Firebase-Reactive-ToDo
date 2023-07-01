import { useState, useEffect } from "react";
import { auth, googleProvider } from "../config/firebase";
import { getAuth, signInWithPopup, signOut } from 'firebase/auth'
import GoogleButton from 'react-google-button'

import './Login.scss'

export const Login = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged((user) => setIsLoggedIn(!!user))
  }, [])

  const handleGoogleAuth = async () => {
    if (getAuth().currentUser) {
      await signOut(getAuth())
    } else {
      await signInWithPopup(auth, googleProvider)
    }
  }
  return (
    <>
      <button type="button" onClick={handleGoogleAuth}>
        <GoogleButton {...isLoggedIn && { label: `Sign out` }} />
      </button>

    </>
  )
};
