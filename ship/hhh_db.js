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
        const linkURL = record.fields['link to what you shipped'];
        if (linkURL) {
            const link = document.createElement('a');
            // Check if the link starts with http:// or https://
            link.href = linkURL.startsWith('http://') || linkURL.startsWith('https://') ? linkURL : 'https://' + linkURL;
            link.textContent = 'Visit';
            link.target = "_blank";
            linkCell.appendChild(link);
        } else {
            linkCell.textContent = 'No Link Provided';
        }

        // Social field
        const socialCell = document.createElement('td');
        const socialURL = record.fields.social;
        if (socialURL) {
            const socialLink = document.createElement('a');
            // Same check for the social link
            socialLink.href = socialURL.startsWith('http://') || socialURL.startsWith('https://') ? socialURL : 'https://' + socialURL;
            socialLink.textContent = socialURL;
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
