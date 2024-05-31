// Define the function to fetch data from Airtable
async function fetchAirtableData() {
    try {
        const response = await fetch('https://api.airtable.com/v0/appZ05ICl0Fxp5kgC/tbl3hE7p96MzJHu52/hhh_projects?filterByFormula={ReviewStatus}="Approved"', {
            headers: {
                Authorization: 'patu4vehpLdDhH8UM.91fa109d1f8b2863f7c95cf6695e86b6b5ce752bca952f11caae45a5132fde03'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.records; // This returns an array of records
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Define the function to display data on the webpage
function displayData(records) {
    const container = document.getElementById('data-container'); // Make sure you have a div with this ID in your HTML
    container.innerHTML = ''; // Clear previous content
    records.forEach(record => {
        const div = document.createElement('div');
        div.className = 'record-item'; // Optional: Add a class for styling
        div.innerHTML = `<h3>${record.fields.Name}</h3><p>${record.fields.ProjectDescription}</p>`;
        container.appendChild(div);
    });
}

// Set up the document to fetch and display data once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    fetchAirtableData().then(records => {
        if (records) {
            displayData(records);
        }
    });
});
