import { auth } from "../firebase.js";
import { db } from "../firebase.js";
import {
  getDocs,
  collection,
  query,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const loader = document.querySelector(".pageLoader");

const table = document.querySelector(".main-content");

const dataLoader = document.querySelector("#dataLoader");

dataLoader.style.display = "block";

function toggleDropdown(element) {
  const details = element.childNodes[1];
  const arrow = details.childNodes[0];

  if (details.style.display === "block") {
    details.style.display = "none";
    arrow.style.transform = "rotate(0deg)";
  } else {
    details.style.display = "block";
    // arrow.style.transform = "rotate(180deg)";
  }

  console.log("clicked");
}

const createDropDown = (data) => {
  let outerDiv = document.createElement("div");
  outerDiv.classList.add("recruitreq");

  let headerDiv = document.createElement("div");
  headerDiv.classList.add("recruitreq-header");

  let nonBreakingSpace = document.createTextNode("\u00A0");

  let nameSpan = document.createElement("span");
  nameSpan.innerText = data.fullName;
  headerDiv.appendChild(nameSpan);
  headerDiv.appendChild(nonBreakingSpace);

  let usn = document.createElement("span");
  usn.innerText = data.usn;
  headerDiv.appendChild(usn);
  headerDiv.appendChild(nonBreakingSpace);

  let arrow = document.createElement("span");
  arrow.innerHTML = "\u25BC";
  headerDiv.appendChild(arrow);

  outerDiv.appendChild(headerDiv);

  let ul = document.createElement("ul");
  ul.classList.add("recruitreq-details");
  let nameLi = document.createElement("li");
  let usnLi = document.createElement("li");
  let contactLi = document.createElement("li");
  let emailLi = document.createElement("li");
  let branchLi = document.createElement("li");
  let yearLi = document.createElement("li");
  let sectionLi = document.createElement("li");
  let domainLi = document.createElement("li");

  nameLi.innerHTML = `Name : <span  class="name">${data.fullName}</span>`;
  ul.appendChild(nameLi);

  usnLi.innerHTML = `USN : <span  class="usn">${data.usn}</span>`;
  ul.appendChild(usnLi);

  contactLi.innerHTML = `Contact  : <span  class="contact">${data.mobile}</span>`;
  ul.appendChild(contactLi);

  emailLi.innerHTML = `Email : <span  class="email">${data.email}</span>`;
  ul.appendChild(emailLi);

  yearLi.innerHTML = `Year : <span  class="year">${data.year}</span>`;
  ul.appendChild(yearLi);

  branchLi.innerHTML = `Branch : <span  class="branch">${data.branch}</span>`;
  ul.appendChild(branchLi);

  sectionLi.innerHTML = `Section : <span  class="section">${data.section}</span>`;
  ul.appendChild(sectionLi);

  domainLi.innerHTML = `Domain : <span   class="intdomain">${data.interestField}</span>`;
  ul.appendChild(domainLi);

  outerDiv.appendChild(ul);
  outerDiv.addEventListener("click", () => {
    toggleDropdown(outerDiv);
  });

  table.appendChild(outerDiv);
};

const isLoggedIn = async () => {
  auth.onAuthStateChanged(async (user) => {
    if (!user || user) {
      loader.style.display = "none";
      const resp = await getFreshersDetails();
      if (resp === false) {
        const h1 = document.createElement("h1");
        h1.textContent = "No One registerd  Yet";
        table.appendChild(h1);
        dataLoader.style.display = "none";
      }
      dataLoader.style.display = "none";
    } else {
      window.location.href = "/";
    }
  });
};

const getFreshersDetails = async () => {
  const q = query(collection(db, "recruits"));
  const querySnapShot = await getDocs(q);
  if (querySnapShot.size > 0) {
    querySnapShot.forEach((doc) => {
      const data = doc.data();
      createDropDown(data);
    });
  } else if (querySnapShot.size == 0) {
    return false;
  }
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

window.onload = isLoggedIn();
