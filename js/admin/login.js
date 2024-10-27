import { auth } from "../firebase.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const email = document.querySelector("#email");
const password = document.querySelector("#password");

const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  adminLogin();
});

const adminLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    loginForm.reset();
    window.location.href = "/admin.html";
    alert("Logged In");
  } catch (err) {
    console.log(err.message);
    alert("Either username or password is incorrect");
  }
};
