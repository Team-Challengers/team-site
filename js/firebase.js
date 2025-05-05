import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

import {
  getFirestore, // Correct import for Firestore
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// firebaseConfig
const firebaseConfig = {
  apiKey: "AIzaSyDY1EPvNDxjPFzEikW80OUfiulv5nNb0Uk",
  authDomain: "challengers-ad326.firebaseapp.com",
  projectId: "challengers-ad326",
  storageBucket: "challengers-ad326.firebasestorage.app",
  messagingSenderId: "142595397371",
  appId: "1:142595397371:web:e222038cd9dcc5473a825e",
  measurementId: "G-31X3C0F33S",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth();

export default app;
