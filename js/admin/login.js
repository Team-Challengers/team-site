import { db } from "./firebase.js";
import {
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { auth } from "../firebase.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const email = document.querySelector(".email");
const password = document.querySelector(".password");

const adminLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("logged In");
  } catch (err) {
    console.log(err.message);
  }
};
