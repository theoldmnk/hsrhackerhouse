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
        
        // What're you shipping field
        const shippingCell = document.createElement('td');
        shippingCell.textContent = record.fields["what're you shipping?"] || 'No Description Provided';

         // Link to what you shipped field
        const linkCell = document.createElement('td');
        if (record.fields['link to what you shipped']) {
            const link = document.createElement('a');
            link.href = record.fields['link to what you shipped'];
            link.textContent = 'Visit';
            link.target = "_blank";
            linkCell.appendChild(link);
        } else {
            linkCell.textContent = 'No Link Provided';
        }
        
       // Social field
        const socialCell = document.createElement('td');
        if (record.fields.Social) { // This should be lowercase if that's how it's defined in Airtable
            const socialLink = document.createElement('a');
            socialLink.href = `http://${record.fields.Social}`;
            socialLink.textContent = record.fields.Social;
            socialLink.target = "_blank";
            socialCell.appendChild(socialLink);
        } else {
            socialCell.textContent = 'No Social Info';
        }

        // Append cells to the row
        row.appendChild(nameCell);
        row.appendChild(shippingCell);
        row.appendChild(linkCell);
        row.appendChild(socialCell);
        
        // Append the row to the table body
        tableBody.appendChild(row);
    });
}

// Add this function to be called when the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    fetchAirtableData().then(records => {
        displayData(records);
    }).catch(error => {
        console.error("Error handling data:", error);
    });
});
