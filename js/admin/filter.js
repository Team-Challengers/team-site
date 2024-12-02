import { db } from "../firebase.js";
import {
  collection,
  query,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const applyBtn = document.querySelector(".apply-button-all");

console.log(applyBtn);

applyBtn.addEventListener("click", async () => {
  console.log("Added");
  await applyFilters();
});

// Toggle dropdown visibility
export function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  const allDropdowns = document.querySelectorAll(
    ".dropdown, .dropdown-container"
  );

  allDropdowns.forEach((dd) => {
    if (dd !== dropdown) dd.style.display = "none";
  });

  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

// Clear selection in the dropdown
export function clearSelection(type) {
  const radios = document.querySelectorAll(`input[name="${type}"]`);
  radios.forEach((radio) => {
    radio.checked = false;
  });
  document.getElementById(
    type === "domain" ? "domainDropdown" : "yearDropdown"
  ).style.display = "none";
}

// Clear all filters in the main filter dropdown
export function clearAllFilters() {
  document
    .querySelectorAll('.dropdown-container input[type="radio"]')
    .forEach((radio) => {
      radio.checked = false;
    });
  document.getElementById("filterDropdown").style.display = "none";
}

// Apply the selected filters and close the filter dropdown
export async function applyFilters() {
  const selectedDomain = document.querySelectorAll(".domain");
  const selectedYear = document.querySelectorAll(".year");

  console.log(selectedDomain);
  console.log(selectedYear);

  let filterRecruitData = [];

  const formattedFilterData = {
    ...(selectedDomain.value !== "All" && {
      interestField: selectedDomain.value,
    }),

    ...(selectedYear.value !== "All" && {
      year: selectedYear.value,
    }),
  };

  // Create the base query
  let recruitQuery = query(collection(db, "recruits"));

  // Dynamically add filters from formattedFilterData
  Object.keys(formattedFilterData).forEach((key) => {
    recruitQuery = query(
      recruitQuery,
      where(key, "==", formattedFilterData[key])
    );
  });

  // Get the filtered documents
  const querySnapshot = await getDocs(projectQueryExpense);
  let message = "Applied Filters:\n";

  if (!querySnapshot.empty) {
    filterRecruitData = querySnapshot.docs.map((doc) => {
      return doc.data();
    });
  }

  console.log(filterRecruitData);

  // Check if the "All" option is selected for Domain
  message +=
    selectedDomain && selectedDomain.value !== "All"
      ? `Domain: ${selectedDomain.value}\n`
      : "Domain: All\n";

  // Check if the "All" option is selected for Year
  message +=
    selectedYear && selectedYear.value !== "All"
      ? `Year: ${selectedYear.value}\n`
      : "Year: All\n";

  // Check if "All" is selected from the "All" radio button
  // message += selectedAll ? 'All: Selected\n' : '';

  //   alert(message);
  //   document.getElementById("filterDropdown").style.display = "none";
}
// Apply filter for Domain dropdown and close it
export function applyDomainFilter() {
  const selectedDomain = document.querySelector('input[name="domain"]:checked');
  const message =
    selectedDomain && selectedDomain.value !== "All"
      ? `Applied Domain Filter: ${selectedDomain.value}`
      : "Applied Domain Filter: All";
  alert(message);
  document.getElementById("domainDropdown").style.display = "none";
}

// Apply filter for Year dropdown and close it
export function applyYearFilter() {
  const selectedYear = document.querySelector('input[name="year"]:checked');
  const message =
    selectedYear && selectedYear.value !== "All"
      ? `Applied Year Filter: ${selectedYear.value}`
      : "Applied Year Filter: All";
  alert(message);
  document.getElementById("yearDropdown").style.display = "none";
}
