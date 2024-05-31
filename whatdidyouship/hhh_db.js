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
        
        // Name field
        const nameCell = document.createElement('td');
        nameCell.textContent = record.fields.Name || 'No Name Provided';
        
        // Link to what you shipped field
        const linkCell = document.createElement('td');
        if (record.fields['Link to What You Shipped']) {
            const link = document.createElement('a');
            link.href = record.fields['Link to What You Shipped'];
            link.textContent = record.fields['Link to What You Shipped'];
            linkCell.appendChild(link);
        } else {
            linkCell.textContent = 'No Link Provided';
        }
        
        // Social field
        const socialCell = document.createElement('td');
        socialCell.textContent = record.fields.Social || 'No Social Info';

        row.appendChild(nameCell);
        row.appendChild(linkCell);
        row.appendChild(socialCell);
        
        tableBody.appendChild(row);
    });
}
