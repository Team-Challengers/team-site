import { auth } from "../firebase.js";
import { db } from "../firebase.js";
import {
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import * as UC from "https://cdn.jsdelivr.net/npm/@uploadcare/file-uploader@1/web/uc-file-uploader-regular.min.js";

let image = "";

let domain = [];

const imagePreview = document.querySelector("#image-preview");

imagePreview.style.display = "none";

//image Hanndling

UC.defineComponents(UC);
const provider = document.querySelector("uc-upload-ctx-provider");

provider.addEventListener("file-url-changed", (e) => {
  console.log("url changed");
  image = e.detail.cdnUrl;
  imagePreview.setAttribute("src", image);
  imagePreview.setAttribute("alt", "image");
  imagePreview.style.display = "inline";
});

provider.addEventListener("file-deleted", () => {
  console.log("delete");
  image = "";
  imagePreview.setAttribute("src", image);
  imagePreview.setAttribute("alt", "image");
  imagePreview.style.display = "none";
});

/**************/

const loader = document.querySelector(".pageLoader");

const title = document.querySelector("#event-name");

const description = document.querySelector("#event-description");

// const image = document.querySelector("#event-image");

const date = document.querySelector("#event-date");

const fromTime = document.querySelector("#timeDropdown1");

const toTime = document.querySelector("#timeDropdown2");

const form = document.querySelector("#eventsForm");

loader.style.display = "inline";

const btnLoader = document.querySelector("#loader");

const submitBtn = document.querySelector("#submitBtn");

btnLoader.style.display = "none";

// JavaScript for form validation
(function () {
  ("use strict");

  // Date validation to allow only future dates
  const eventDateInput = document.getElementById("event-date");
  const today = new Date().toISOString().split("T")[0];
  eventDateInput.setAttribute("min", today);
  // Loop over the form and prevent submission if there are invalid fields
  form.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add("was-validated");
      } else {
        console.log(checkTimeValue());
        const [year, month, day] = date.value.split("-"); // Split into parts
        const formattedDate = `${day}-${month}-${year}`; // Format as DD-MM-YYYY

        const interestCheckboxes = document.querySelectorAll(".domainCheckBox");

        interestCheckboxes.forEach((checkBox) => {
          if (checkBox.checked) {
            domain.push(checkBox.value);
          }
        });

        const data = {
          title: title.value,
          description: description.value,
          image: image,
          date: formattedDate,
          from: fromTime.value,
          to: toTime.value,
          registrations: [],
          domain: domain,
        };

        if (data.image === "" || domain.length == 0 || !checkTimeValue()) {
          if (image === "") {
            alert("Enter the image");
          } else if (domain.length === 0) {
            alert("Select domain");
          }
        } else {
          addEventToDB(data);
        }
      }
    },
    false
  );

  // Real-time validation
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.checkValidity()) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
      } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
      }
    });
  });

  const checkTimeValue = () => {
    if (fromTime.value === toTime.value) {
      return false;
    } else {
      return true;
    }
  };

  toTime.addEventListener("change", () => {
    if (fromTime.value === toTime.value) {
      toTime.classList.add("is-invalid");
    } else {
      toTime.classList.remove("is-invalid");
    }
  });
})();

const addEventToDB = async (data) => {
  try {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        btnLoader.style.display = "inline";
        submitBtn.style.display = "none";
        await addDoc(collection(db, "events"), data).then((data) => {
          btnLoader.style.display = "none";
          submitBtn.style.display = "inline";
          alert("Submitted Successfully");
          form.reset();
          form.classList.remove("was-validated");
          imagePreview.style.display = "none";
          image = "";
          imagePreview.setAttribute("src", "");
        });
      } else {
        window.location.href = "/";
      }
    });
  } catch (err) {
    console.log(err.message);
    alert("Some Error occured please try again");
  }
};

const isLoggedIn = () => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      loader.style.display = "none";
    } else if (!user) {
      window.location.href = "/";
    }
  });
};

window.onload = isLoggedIn();
