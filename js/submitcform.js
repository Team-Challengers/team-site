document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission
    console.log("submitted");

    // Get the form fields
    var formFields = this.elements;

    // Check if all fields are filled
    var isValid = true;
    for (var i = 0; i < formFields.length; i++) {
        if (formFields[i].type === "text" || formFields[i].type === "email" || formFields[i].type === "textarea") {
            if (formFields[i].value.trim() === "") {
                isValid = false;
                break;
            }
        }
    }

    // Send the form using EmailJS only if it's valid
    if (isValid) {
        emailjs.sendForm("service_0af8oll", "template_6tbc1pa", this).then(
            () => {
                alert("Submitted successfully!"); // Alert on success
                this.reset(); // Optionally reset the form
            },
            (error) => {
                alert("Error: " + JSON.stringify(error)); // Alert on error
                console.log("FAILED...", error);
            }
        );
     } //  else {
    //     alert("Please fill in all fields.");
    // }
});