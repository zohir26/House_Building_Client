import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket:import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId:import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId:import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId:import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };



const firebaseConfig = {
  apiKey: "AIzaSyBKpFC6gLLvRujvuCxyM1KbCQITbsob-Is",
  authDomain: "first-firebase-7d3a1.firebaseapp.com",
  projectId: "first-firebase-7d3a1",
  storageBucket: "first-firebase-7d3a1.firebasestorage.app",
  messagingSenderId: "845248994754",
  appId: "1:845248994754:web:9b821dd2b3b77ad9f40a5b",
  measurementId: "G-6YLTS2WC1Y"
};

const app = initializeApp(firebaseConfig);
export default app;