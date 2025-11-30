// Function to fetch and display NPS data
async function getParkData() {
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const parkCode = 'jotr'; // Joshua Tree National Park
    const url = `https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const park = data.data[0];

        const container = document.getElementById('nps-data');
        
        // Create HTML content
        const html = `
            <h3>${park.fullName}</h3>
            <p>${park.description}</p>
            <div class="park-info">
                <p><strong>Weather Info:</strong> ${park.weatherInfo}</p>
                <a href="${park.url}" target="_blank" class="btn">Visit Official Site</a>
            </div>
        `;
        
        container.innerHTML = html;

    } catch (error) {
        console.error('Error fetching NPS data:', error);
        document.getElementById('nps-data').innerHTML = `
            <h3>Error Loading Data</h3>
            <p>Could not load park data. Please check your API key and try again.</p>
            <p class="error-details">Error: ${error.message}</p>
        `;
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', getParkData);
