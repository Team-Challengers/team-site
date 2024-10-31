import { db } from "./firebase.js";
import {
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const fullName = document.querySelector("#fullName");

const email = document.querySelector("#email");

const mobile = document.querySelector("#mobile");

const usn = document.querySelector("#usn");

const branch = document.querySelector("#branch");

const interestField = document.querySelector("#domain");

const section = document.querySelector("#section");

const year = document.querySelector("#year");

// const yesRadioBtn = document.querySelector("#yes");

// const noRadioBtn = document.querySelector("#no");

const loaderBtn = document.querySelector("#loadButton");

const submitBtn = document.querySelector("#submitBtn");

const form = document.querySelector("#recruitmentForm");

loaderBtn.style.display = "none";

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
        // let launchPadMember;
        // if (yesRadioBtn.checked) {
        //   launchPadMember = "yes";
        // } else if (noRadioBtn.checked) {
        //   launchPadMember = "no";
        // }

        const data = {
          fullName: fullName.value,
          email: email.value,
          mobile: mobile.value,
          usn: usn.value,
          branch: branch.value,
          section: section.value,
          interestField: interestField.value,
          year: year.value,
          selected: false,
          // launchPadMember,
        };

        addToDB(data);
      }
    },
    false
  );
})();

const addToDB = async (data) => {
  try {
    submitBtn.style.display = "none";
    loaderBtn.style.display = "inline";
    const docRef = await addDoc(collection(db, "recruits"), data)
      .then((data) => {
        alert("Registered Successfully");
      })
      .catch((err) => {
        alert("Some error occured please try again");
      });
    loaderBtn.style.display = "none";
    submitBtn.style.display = "inline";
    form.reset();
    form.classList.remove("was-validated");
  } catch (e) {
    console.log(e);
    alert("Some error occured Please try again");
  }
};
