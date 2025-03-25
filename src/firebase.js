// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAz0keAPCsooZxjsps91ZgNTc2RykKNc-M",
    authDomain: "drapeelegance-12001.firebaseapp.com",
    projectId: "drapeelegance-12001",
    storageBucket: "drapeelegance-12001.firebasestorage.app",
    messagingSenderId: "310389398950",
    appId: "1:310389398950:web:104572c644b628386e8367"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
