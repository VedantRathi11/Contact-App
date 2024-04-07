// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkbR3ZUgwEY_TvHF_V-FZiziCs54ppEwM",
  authDomain: "vite-contact-7c0d4.firebaseapp.com",
  projectId: "vite-contact-7c0d4",
  storageBucket: "vite-contact-7c0d4.appspot.com",
  messagingSenderId: "807029772738",
  appId: "1:807029772738:web:a0decff4abbb27fbf5c65b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
