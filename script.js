// Function to fetch and display NPS data
async function getParkData(parkCode) {
    const apiKey = config.API_KEY;
    const url = `https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=${apiKey}`;

    const container = document.getElementById('nps-data');
    container.innerHTML = '<p>Loading park data...</p>';
    container.scrollIntoView({ behavior: 'smooth' });

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const park = data.data[0];

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
        container.innerHTML = `
            <h3>Error Loading Data</h3>
            <p>Could not load park data. Please check your API key and try again.</p>
            <p class="error-details">Error: ${error.message}</p>
        `;
    }
}

// Add event listeners to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('a[data-park-code]');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const parkCode = button.getAttribute('data-park-code');
            getParkData(parkCode);
        });
    });
});
