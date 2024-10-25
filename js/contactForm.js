// document
//   .getElementById("contact-form")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     // these IDs from the previous steps
//     emailjs.sendForm("service_0af8oll", "template_6tbc1pa", this).then(
//       () => {
//         console.log("SUCCESS!");
//       },
//       (error) => {
//         console.log("FAILED...", error);
//       }
//     );
//   });

const bootstrapValidation = (() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        if (!form.checkValidity()) {
          event.stopPropagation();
        } else {
          emailjs.init({
            publicKey: "a0Dannguw0kzPA30D",
          });
          emailjs.sendForm("service_0af8oll", "template_6tbc1pa", this).then(
            () => {
              console.log("SUCCESS!");
            },
            (error) => {
              console.log("FAILED...", error);
            }
          );
        }
        // } else {
        //   document
        //     .getElementById("contact-form")
        //     .addEventListener("submit", (event) => {
        //       event.preventDefault();
        //       console.log("submitted  ");
        //     });
        // }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
