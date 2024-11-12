import { db } from "./firebase";
import {
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { auth } from "./firebase.js";

const q = query(collection(db, "events"));

const createEventCard = (data, loggedInStatus) => {
  console.log("Card creation code here");
};

const getEventsList = async (loggedInStatus) => {
  const querySnapShot = await getDocs(q);
  if (querySnapShot.size > 0) {
    querySnapShot.forEach((doc) => {
      const data = doc.data();
      createEventCard(data, loggedInStatus);
    });
  }
};

const isLoggedIn = async () => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      getEventsList(true);
      dataLoader.style.display = "none";
    } else {
      getEventsList(false);
    }
    loader.style.display = "none";
  });
};

window.onload = isLoggedIn();
