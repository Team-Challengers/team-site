// // import * as emailjs from "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
// // (function () {
// //   // https://dashboard.emailjs.com/admin/account
// //   emailjs.init({
// //     publicKey: "LPW_sMZa5ktCZ3U_9",
// //   });
// // })();

// const loadButton = document.querySelector("#loadButton");

// const submitBtn = document.querySelector("#submitBtn");

// loadButton.style.display = "none";
// (() => {
//   "use strict";

//   // Fetch all the forms we want to apply custom Bootstrap validation styles to
//   const forms = document.querySelectorAll(".needs-validation");

//   // Loop over them and prevent submission
//   Array.from(forms).forEach((form) => {
//     form.addEventListener(
//       "submit",
//       (event) => {
//         event.preventDefault();

//         if (!form.checkValidity()) {
//           event.stopPropagation();
//         } else {
//           submitBtn.style.display = "none";
//           loadButton.style.display = "block";
//           emailjs.sendForm("service_vaeonco", "template_u4fmpnm", form).then(
//             () => {
//               console.log("SUCCESS!");
//               // alert("Email Received We will  reach back to you soon");
//               submitBtn.style.display = "block";
//               loadButton.style.display = "none";
//             },
//             (error) => {
//               alert("Some error occurred please try again");
//               console.log("FAILED...", error);
//               submitBtn.style.display = "block";
//               loadButton.style.display = "none";
//             }
//           );
//         }

//         form.classList.add("was-validated");
//       },
//       false
//     );
//   });
// })();
