// Define the function to fetch data from Airtable
async function fetchAirtableData() {
    try {
        const response = await fetch('https://api.airtable.com/v0/appZ05ICl0Fxp5kgC/hhh_projects', {
            headers: {
                Authorization: 'Bearer patu4vehpLdDhH8UM.91fa109d1f8b2863f7c95cf6695e86b6b5ce752bca952f11caae45a5132fde03'
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
    const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing table rows

    records.forEach(record => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent = record.fields.Name || 'No Name Provided'; // Use test data if field is empty
        row.appendChild(nameCell);
        tableBody.appendChild(row);
    });
}
