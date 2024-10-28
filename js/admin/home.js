import { auth } from "../firebase.js";

const pageLoader = document.querySelector("#pageLoader");

pageLoader.style.display = "block";

const isLogin = () => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      pageLoader.style.display = "none";
    } else if (!user) {
      window.location.href = "/";
    }
  });
};

window.onload = isLogin();
