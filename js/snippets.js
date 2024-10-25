document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission
    console.log("submitted");

    // Send the form using EmailJS
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
});