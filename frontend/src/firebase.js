// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-20c6e.firebaseapp.com",
  projectId: "real-estate-20c6e",
  storageBucket: "real-estate-20c6e.firebasestorage.app",
  messagingSenderId: "97657859228",
  appId: "1:97657859228:web:4ef6dabc4daa4424135159"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);