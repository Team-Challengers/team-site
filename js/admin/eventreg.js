
        // Function to show the respective event details
        function showEventDetails(eventId) {
            // Hide all event boxes
            const eventBoxes = document.querySelectorAll('.event-box');
            eventBoxes.forEach(box => {
                box.style.display = 'none'; // Hide all tables
            });

            // Show the selected event box
            const selectedBox = document.getElementById(eventId);
            if (selectedBox) {
                selectedBox.style.display = 'table'; // Display the selected table
            }
        }

        // Initialize by hiding all event tables
        window.onload = () => {
            const eventBoxes = document.querySelectorAll('.event-box');
            eventBoxes.forEach(box => {
                box.style.display = 'none'; // Hide all tables on page load
            });
        };
   


    const eventData = {
        Event1: [
            { name: "Name1", email: "Email1", phone: "Phone1", branch: "Branch1", year: "Year1" }
        ],
        Event2: [
            { name: "Name2", email: "Email2", phone: "Phone2", branch: "Branch2", year: "Year2" }
        ],
        Event3: [
            { name: "Name3", email: "Email3", phone: "Phone3", branch: "Branch3", year: "Year3" }
        ]
    };

   
    function fetchRegistrations(eventName) {
        const data = eventData[eventName];
        updateTable(data);
    }

  
    function updateTable(data) {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';

        data.forEach(registration => {
            const row = `<tr>
                <td>${registration.name}</td>
                <td>${registration.email}</td>
                <td>${registration.phone}</td>
                <td>${registration.branch}</td>
                <td>${registration.year}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }

