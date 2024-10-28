import { auth } from "../firebase.js";

const pageLoader = document.querySelector(".pageLoader");
console.log(pageLoader);

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

const logout = async () => {
  await auth
    .signOut()
    .then(() => {
      console.log("User  signed out");
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
};

const logOut = document.querySelector("#logout");

logOut.addEventListener("click", () => {
  logout();
});

window.onload = isLogin();
