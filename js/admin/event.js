import { auth } from "../firebase.js";
import { db } from "../firebase.js";
import {
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const loader = document.querySelector(".pageLoader");

const title = document.querySelector("#event_name");

const description = document.querySelector("event_description");

const image = document.querySelector("#event_image");

const date = document.querySelector("#event_date");

const form = document.querySelector("#addEventForm");

loader.display = "inline";

// JavaScript for form validation
(function () {
  ("use strict");
  // Loop over the form and prevent submission if there are invalid fields
  form.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add("was-validated");
      } else {
        const data = {
          title: title,
          description: description,
          image: image,
          date: date,
          registrations: [],
        };

        addEventToDB(data);
      }
    },
    false
  );
})();

const addEventToDB = async (data) => {
  try {
    await addDoc(collection(db, "events"), data).then((data) => {
      alert("Submitted Successfully");
    });
  } catch (err) {
    console.log(err.message);
    alert("Some Error occured please try again");
  }
};
                               
const isLoggedIn = () => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      loader.display = "none";
    } else if (!user) {
      window.location.href = "/";
    }
  });
};

window.onload = isLoggedIn();