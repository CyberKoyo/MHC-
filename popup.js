// popup.js - NYC Housing Laws Extension

const locationText = document.getElementById('locationText');
const locationHint = document.getElementById('locationHint');
const changeBtn = document.getElementById('changeLocation');
const cityInput = document.getElementById('cityInput');
const submitBtn = document.getElementById('submitLocation');
const contentDiv = document.getElementById('content');
const noDataMessage = document.getElementById('noDataMessage');
const locationSection = document.getElementById('locationSection');
const inputSection = document.getElementById('inputSection');

let currentLocation = null;
let detectionAttempts = 0;

// Toggle location input
changeBtn.addEventListener('click', () => {
    if (inputSection.style.display === 'none') {
        inputSection.style.display = 'flex';
        cityInput.focus();
        changeBtn.textContent = 'Cancel';
    } else {
        inputSection.style.display = 'none';
        changeBtn.textContent = 'Edit';
    }
});

// Submit manual location
submitBtn.addEventListener('click', searchLocation);

// Allow Enter key in input
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchLocation();
});

function searchLocation() {
    const input = cityInput.value.trim();
    if (input) {
        // Try to parse as "City, State" format
        const parts = input.split(',').map(p => p.trim());
        if (parts.length >= 1) {
            const city = parts[0];
            const state = parts.length > 1 ? parts[1] : 'NY'; // Default to NY if not specified
            
            displayLaws(city, state);
            inputSection.style.display = 'none';
            changeBtn.textContent = 'Edit';
            cityInput.value = '';
        } else {
            alert('Please enter in format: City, State or City');
        }
    }
}

// Display laws based on location
function displayLaws(city, state) {
    const laws = getLawsByCity(city, state);
    currentLocation = { city, state };
    
    // Normalize display
    const displayCity = city.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    locationText.textContent = `📍 ${displayCity}, ${state}`;
    
    // Show hint if NYC
    if (city.toLowerCase() === 'new york' && state === 'NY') {
        locationHint.textContent = '✓ NYC Tenant Rights';
    } else if (city.toLowerCase() !== 'new york' || state !== 'NY') {
        locationHint.textContent = '⚠️ NYC data only - results may not apply';
    }
    
    contentDiv.innerHTML = '';
    noDataMessage.style.display = 'none';

    if (!laws) {
        noDataMessage.style.display = 'block';
        return;
    }

    // Create sections for each law type (NYC focus: Rent Control, Habitability, Fair Housing, L-T Rights)
    const sections = [
        { key: 'rentControl', emoji: '💰', class: 'rent', title: 'Rent Stabilization' },
        { key: 'habitability', emoji: '🏠', class: 'habitability', title: 'Habitability Standards' },
        { key: 'fairHousing', emoji: '⚖️', class: 'fair', title: 'Fair Housing Laws' },
        { key: 'landlordTenantRights', emoji: '📋', class: 'lt-rights', title: 'Landlord-Tenant Rights' }
    ];

    sections.forEach(section => {
        const data = laws[section.key];
        if (data) {
            const div = createLawSection(section.emoji, section.title, data, section.class);
            contentDiv.appendChild(div);
        }
    });

    // Add notes if available
    if (laws.notes) {
        const notesDiv = document.createElement('div');
        notesDiv.className = 'notes';
        notesDiv.innerHTML = `<strong>📌 Important:</strong> ${laws.notes}`;
        contentDiv.appendChild(notesDiv);
    }
}

// Create a single law section
function createLawSection(emoji, title, data, cssClass) {
    const section = document.createElement('div');
    section.className = `law-section ${cssClass}`;

    const titleEl = document.createElement('div');
    titleEl.className = 'law-title';
    titleEl.innerHTML = `${emoji} ${title} <span class="expand-toggle">›</span>`;

    const summary = document.createElement('div');
    summary.className = 'law-summary';
    summary.textContent = data.summary;

    const detailsUl = document.createElement('ul');
    detailsUl.className = 'law-details';
    data.details.forEach(detail => {
        const li = document.createElement('li');
        li.innerHTML = detail;
        detailsUl.appendChild(li);
    });

    section.appendChild(titleEl);
    section.appendChild(summary);
    section.appendChild(detailsUl);

    // Toggle expand/collapse on title click
    titleEl.addEventListener('click', () => {
        section.classList.toggle('expanded');
    });

    // Expand by default
    section.classList.add('expanded');

    return section;
}

// Initialize: Try to detect location from storage or wait for content script
function initializeExtension() {
    chrome.storage.local.get(['detectedLocation'], (result) => {
        if (result.detectedLocation) {
            const { city, state } = result.detectedLocation;
            displayLaws(city, state);
            return;
        }
        
        // No stored location, show hint
        locationText.textContent = '🔍 Detecting...';
        locationHint.textContent = '';
        
        // Wait a bit for auto-detection, then show manual input option
        setTimeout(() => {
            if (!currentLocation) {
                locationText.textContent = '📝 Manual Entry';
                locationHint.textContent = 'Click Edit to search by location';
                contentDiv.innerHTML = '<p style="text-align: center; padding: 20px; color: #6b7280; font-size: 13px;"><strong>Open a Zillow listing</strong> to auto-detect the address, or use the Edit button to search manually.</p>';
            }
        }, 2000);
    });
}

initializeExtension();

// Listen for messages from content script with detected location
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'LOCATION_FOUND') {
        const { city, state } = message.data;
        chrome.storage.local.set({ detectedLocation: { city, state } });
        displayLaws(city, state);
    }
});
