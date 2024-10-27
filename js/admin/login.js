import { auth } from "../firebase.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const email = document.querySelector("#email");
const password = document.querySelector("#password");

const loginForm = document.querySelector("#loginForm");

const loading = document.querySelector("#loader");
loading.style.display = "none";

const loginBtn = document.querySelector("#loginBtn");

const pageLoader = document.querySelector(".pageLoader");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  adminLogin();
});

const isLoggedIn = () => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      window.location.href = "/admin/home.html";
    } else {
      pageLoader.style.display = "none";
    }
  });
};

const adminLogin = async () => {
  try {
    loginBtn.style.display = "none";
    loading.style.display = "block";
    await signInWithEmailAndPassword(auth, email.value, password.value);
    loginForm.reset();
    loading.style.display = "none";
    loginBtn.style.display = "block";
    alert("logged In");
    window.location.href = "/admin/home.html";
  } catch (err) {
    loading.style.display = "none";
    loginBtn.style.display = "block";
    alert("Either username or password is incorrect");
  }
};

window.onload = isLoggedIn();
