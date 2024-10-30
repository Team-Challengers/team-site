import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

import {
  getFirestore, // Correct import for Firestore
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCUaQIV4_ZQsnReSZT4qfjn6btUDAw-GoI",
//   authDomain: "challengers-66645.firebaseapp.com",
//   projectId: "challengers-66645",
//   storageBucket: "challengers-66645.appspot.com",
//   messagingSenderId: "202449545843",
//   appId: "1:202449545843:web:b02596feba5560c89b1806",
//   measurementId: "G-P315CS7PTG",
// };

// firebaseConfig

// Initialize Firebase
console.log(window.FIREBASE_CONFIG);
const app = initializeApp(window.FIREBASE_CONFIG);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);

export const auth = getAuth();

export default app;
