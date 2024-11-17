import { db } from "./firebase.js";
import {
  addDoc,
  collection,
  query,
  getDocs,
  updateDoc,
  arrayUnion,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { auth } from "./firebase.js";

let eventsData = [];

let eventInfoId = "";

let deleteEventId = "";

const pageLoader = document.querySelector(".pageLoader");

pageLoader.style.display = "inline";

const name = document.querySelector("#name");
const usn = document.querySelector("#usn");
const year = document.querySelector("#year");
const branch = document.querySelector("#branch");
// const registerForm = document.querySelector("#registerForm");

const submitLoader = document.querySelector("#submitLoaderBtn");

const registrationSubmit = document.querySelector(".registrationSubmit");

submitLoader.style.display = "none";

const createEventCard = (data, loggedInStatus, eventId) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardImage = document.createElement("img");
  cardImage.setAttribute("src", data.image);
  cardImage.style.width = "100%";
  cardImage.style.height = "50%";
  card.appendChild(cardImage);

  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");
  card.appendChild(cardContent);

  data.domain.forEach((domain_single) => {
    const cardContentSpan = document.createElement("span");
    cardContentSpan.classList.add("tag");
    cardContentSpan.textContent = domain_single;
    cardContentSpan.style.marginRight = "2rem";
    cardContent.appendChild(cardContentSpan);
  });

  const cardTitle = document.createElement("div");
  cardTitle.classList.add("card-title");
  cardTitle.innerHTML = data.title;
  cardContent.appendChild(cardTitle);

  const cardDescription = document.createElement("p");
  cardDescription.classList.add("card-description");
  cardDescription.innerText = data.description;
  cardContent.appendChild(cardDescription);

  const cardFooter = document.createElement("div");
  cardFooter.innerHTML = `<p> Date :  ${data.date} & 20-11-2024 </p><br/><p>Timings : ${data.from} - ${data.to}</p>`;
  cardFooter.classList.add("card-footer");
  cardContent.appendChild(cardFooter);

  card.appendChild(cardContent);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  createCardBtn(eventId, buttonContainer, loggedInStatus, data);

  card.appendChild(buttonContainer);

  const cardConatiner = document.querySelector(".card-container");

  cardConatiner.appendChild(card);
};

const createCardBtn = (eventId, buttonContainer, loginStatus, data) => {
  const resgisterAttributes = {
    id: eventId,
    type: "button",
    class: "btn btn-primary button register",
    // "data-bs-toggle": "modal",
    // "data-bs-target": "#registrationModal",
  };

  if (loginStatus) {
    // Create the "Edit" button
    // const editButton = document.createElement("button");
    // editButton.classList.add("button", "edit");
    // editButton.setAttribute("type", "button");
    // editButton.textContent = "Edit";
    // editButton.addEventListener("click", () => {
    //   console.log("edited");
    // });
    // buttonContainer.appendChild(editButton);
    // Create the "Delete" button with a unique id
    // const deleteButton = document.createElement("button");
    // deleteButton.classList.add("button", "delete");
    // deleteButton.setAttribute("type", "button");
    // deleteButton.setAttribute("id", eventId);
    // deleteButton.textContent = "Delete";
    // deleteButton.addEventListener("click", () => {
    //   deleteEventId = deleteButton.getAttribute("id");
    //   deleteFunction(deleteEventId, data);
    // });
    // buttonContainer.appendChild(deleteButton);
  }
  const registerBtn = document.createElement("button");

  Object.entries(resgisterAttributes).forEach(([key, value]) => {
    registerBtn.setAttribute(key, value);
  });

  registerBtn.innerText = "Register";

  registerBtn.addEventListener("click", () => {
    registerBtn.disabled = "true";
    window.open("https://forms.gle/SpySXiJkXCRBmY7J6", "_blank");
    // eventInfoId = registerBtn.getAttribute("id");
  });

  buttonContainer.appendChild(registerBtn);
};

const getEventsList = async (loggedInStatus) => {
  const cardConatiner = document.querySelector(".card-container");
  pageLoader.style.display = "inline";
  // cardConatiner.innerHTML = "";
  // cardConatiner.replaceChildren();
  const q = query(collection(db, "events"));
  const querySnapShot = await getDocs(q);
  if (querySnapShot.size > 0) {
    querySnapShot.forEach((doc) => {
      const data = doc.data();
      createEventCard(data, loggedInStatus, doc.id);
      // const dataObj = {
      //   data: data,
      //   id: data.id,
      // };
      // eventsData.push(dataObj);
    });
  }
  // eventsData.forEach((eventData) => {
  //   createEventCard(eventData.data, loggedInStatus, eventData.id);
  // });
  pageLoader.style.display = "none";
};

const deleteFunction = async (eventId, data) => {
  const registrationId = data.registrations;

  const documentRef = doc(db, "events", eventId);

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      deleteDoc(documentRef)
        .then(() => {
          registrationId.forEach(async (id) => {
            const registrationRef = doc(db, "registrations", id);
            await deleteDoc(registrationRef).catch((err) => console.log(err));
          });

          alert("Event deleted Successfully");
          getEventsList(true);
        })
        .catch((err) => {
          console.log(err);
          alert("Some error occuered please try again");
        });
    } else {
      alert("Access Denied");
    }
  });
};

const isLoggedIn = async () => {
  // auth.onAuthStateChanged(async (user) => {
  //   if (user) {
  getEventsList(false);
  // } else {
  //   getEventsList(false);
  // }
  // });
};

const resgisterEvent = (function () {
  ("use strict");
  // Loop over the form and prevent submission if there are invalid fields
  registerForm.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();
      if (!registerForm.checkValidity()) {
        event.stopPropagation();
        registerForm.classList.add("was-validated");
      } else {
        const data = {
          name: name.value,
          usn: usn.value,
          branch: branch.value,
          year: year.value,
          eventId: eventInfoId,
        };

        eventRegistration(eventInfoId, data);
      }
    },
    false
  );
})();

const eventRegistration = async (eventId, data) => {
  registrationSubmit.style.display = "none";
  submitLoader.style.display = "inline";

  let registrationId = "";

  await addDoc(collection(db, "eventRegistrations"), data)
    .then((data) => {
      registrationId = data.id;
    })
    .catch((err) => {
      console.log(err);
      alert("Some error occured please try again");
    });

  const docRef2 = doc(db, "events", eventId);

  await updateDoc(docRef2, {
    registrations: arrayUnion(registrationId),
  })
    .then(() => {
      submitLoader.style.display = "none";
      registerForm.reset();
      alert("Registered");
    })
    .catch((error) => {
      console.error("Error adding registration: ", error);
      alert("Some Error occured please try again");
    });
  registrationSubmit.style.display = "inline";
  submitLoader.style.display = "none";
};
window.onload = isLoggedIn();
