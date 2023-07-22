import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAWc0e98tTozGuMCC6rmeFHF17I1pIhkbY',
  authDomain: 'mdm-todo.firebaseapp.com',
  projectId: 'mdm-todo',
  storageBucket: 'mdm-todo.appspot.com',
  messagingSenderId: '608690607517',
  appId: '1:608690607517:web:2eefa469795a34026b8b74',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
