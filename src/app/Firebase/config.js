// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz0keAPCsooZxjsps91ZgNTc2RykKNc-M",
  authDomain: "drapeelegance-12001.firebaseapp.com",
  projectId: "drapeelegance-12001",
  storageBucket: "drapeelegance-12001.firebasestorage.app",
  messagingSenderId: "310389398950",
  appId: "1:310389398950:web:104572c644b628386e8367",
}

// Initialize Firebase
let firebaseApp
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig)
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebaseApp)
export default firebaseApp

