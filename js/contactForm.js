(function () {
  // https://dashboard.emailjs.com/admin/account
  emailjs.init({
    publicKey: "LPW_sMZa5ktCZ3U_9",
  });
})();

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
          emailjs.sendForm("service_vaeonco", "template_u4fmpnm", this).then(
            () => {
              console.log("SUCCESS!");
            },
            (error) => {
              console.log("FAILED...", error);
            }
          );
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
