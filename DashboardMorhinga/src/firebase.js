// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARh3-PdXSRqZ8e9TvG2vkLD6ZGJaBc0pE",
  authDomain: "apacdados.firebaseapp.com",
  databaseURL: "https://apacdados-default-rtdb.firebaseio.com",
  projectId: "apacdados",
  storageBucket: "apacdados.firebasestorage.app",
  messagingSenderId: "1023362929535",
  appId: "1:1023362929535:web:8edf7affc0a046d6f6404a",
  measurementId: "G-SD1TG359B1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);