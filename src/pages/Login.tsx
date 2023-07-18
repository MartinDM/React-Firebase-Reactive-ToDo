import { useState, useEffect } from "react";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup } from 'firebase/auth'
import GoogleButton from 'react-google-button'
import { useNavigate } from "react-router-dom";

import './Login.scss'

export const Login = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    auth.onAuthStateChanged((user) => setIsLoggedIn(!!user))
    if (isLoggedIn) {
      navigate('/')
    }
  }, [navigate, isLoggedIn])

  const handleGoogleAuth = async () => {
    await signInWithPopup(auth, googleProvider)
  }

  return (
    <>
      <div className="login">
        <button type="button" onClick={handleGoogleAuth}>
          <GoogleButton />
        </button>
      </div>
    </>
  )
};
