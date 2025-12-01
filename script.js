// ---------- NPS API LOGIC ----------

async function fetchParkData(parkCode) {
    const apiKey = config.API_KEY; // from config.js
    const url = `https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=${apiKey}`;

    const container = document.getElementById('nps-data');

    // Show loading message
    container.innerHTML = '<p>Loading park data...</p>';
    container.scrollIntoView({ behavior: 'smooth' });

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.data || data.data.length === 0) {
            container.innerHTML = `
        <h3>No results</h3>
        <p>No park data returned for code <code>${parkCode}</code>.</p>
      `;
            return;
        }

        const park = data.data[0];
        renderParkData(park, container);

    } catch (error) {
        console.error('Error fetching NPS data:', error);
        container.innerHTML = `
      <h3>Error Loading Data</h3>
      <p>Could not load park data. Please check your API key and try again.</p>
      <p class="error-details">Error: ${error.message}</p>
    `;
    }
}

function renderParkData(park, container) {
    const html = `
    <h3>${park.fullName}</h3>
    <p>${park.description}</p>
    <div class="park-info">
      <p><strong>Weather Info:</strong> ${park.weatherInfo || 'No weather info available.'}</p>
      <a href="${park.url}" target="_blank" class="btn">Visit Official Site</a>
    </div>
  `;
    container.innerHTML = html;
}

// Set up click handlers for any link with data-park-code
function initParkButtons() {
    const buttons = document.querySelectorAll('a[data-park-code]');

    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // stop normal navigation

            const parkCode = button.getAttribute('data-park-code');
            fetchParkData(parkCode);
        });
    });
}

// ---------- INITIALIZE EVERYTHING ----------

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM ready, initializing page logic...');
    initParkButtons();
});