// content.js - Runs on Zillow pages to extract location and send to popup

(function() {
  const STATE_CODES = {
    'New York': 'NY', 'NY': 'NY',
    'California': 'CA', 'CA': 'CA',
    'Texas': 'TX', 'TX': 'TX',
    'Florida': 'FL', 'FL': 'FL',
    'Pennsylvania': 'PA', 'PA': 'PA',
    'Illinois': 'IL', 'IL': 'IL',
    'Ohio': 'OH', 'OH': 'OH',
    'Georgia': 'GA', 'GA': 'GA',
    'North Carolina': 'NC', 'NC': 'NC',
    'Michigan': 'MI', 'MI': 'MI',
    'Massachusetts': 'MA', 'MA': 'MA',
    'Washington': 'WA', 'WA': 'WA'
  };

  let lastSentAddress = null;

  // Try to extract address from Zillow page
  function extractZillowAddress() {
    // Primary selectors for detail pages
    const addressSelectors = [
      'h1[data-test="home-details-summary-heading"]',
      'h1.hdp-heading',
      '.ds-box h1',
      'h1[itemprop="address"]',
      '[data-test="propertyAddress"]',
      '.address-title',
      '.zpid-header h1'
    ];

    for (let selector of addressSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        const text = element.textContent.trim();
        if (text && text.length > 5) {
          return text;
        }
      }
    }

    // Fallback: look for breadcrumb navigation
    const breadcrumbs = document.querySelectorAll('[data-test="breadcrumbs"] a, .breadcrumbs a');
    if (breadcrumbs.length > 0) {
      return breadcrumbs[breadcrumbs.length - 1].textContent.trim();
    }

    // Fallback: look in URL if on listing page
    const url = window.location.href;
    if (url.includes('/homes/')) {
      const urlAddress = extractAddressFromUrl(url);
      if (urlAddress) return urlAddress;
    }

    return null;
  }

  // Extract address from URL pattern
  function extractAddressFromUrl(url) {
    // Zillow URLs often have format: /homes/12345_zpid/
    // Can also be /homes/12345_fpid/ or /homes/123-Main-St-City-State-Zipcode/
    const match = url.match(/\/homes\/([^/]+)/);
    if (match) {
      const part = match[1].replace(/_zpid|_fpid/, '');
      // Decode URL and try to extract address
      return decodeURIComponent(part).replace(/-/g, ' ');
    }
    return null;
  }

  // Extract city and state from address
  function parseAddress(addressString) {
    if (!addressString) return null;
    
    // Remove zip codes, parentheticals
    let cleaned = addressString.replace(/\(\d+\)/, '').replace(/\b\d{5}\b/, '').trim();
    
    // Split by comma
    const parts = cleaned.split(',').map(p => p.trim()).filter(p => p);
    
    if (parts.length >= 2) {
      let city = parts[parts.length - 2];
      let state = parts[parts.length - 1];
      
      // Normalize state (convert full name to code if needed)
      if (state.length > 2) {
        state = STATE_CODES[state] || state;
      }
      
      // Quick validation: state should be 2 chars, city should have content
      if (state.length === 2 && city.length > 1) {
        return { 
          city, 
          state: state.toUpperCase(), 
          fullAddress: addressString 
        };
      }
    }
    
    return null;
  }

  // Send location data to popup/background
  function notifyLocationFound() {
    const address = extractZillowAddress();
    const parsed = parseAddress(address);
    
    if (parsed && parsed.fullAddress !== lastSentAddress) {
      lastSentAddress = parsed.fullAddress;
      try {
        chrome.runtime.sendMessage({
          type: 'LOCATION_FOUND',
          data: parsed
        });
      } catch (e) {
        // Extension context might be invalid, silently fail
        console.log('Could not send message to extension');
      }
    }
  }

  // Wait for page to load, then extract
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', notifyLocationFound);
  } else {
    notifyLocationFound();
  }

  // Watch for SPA navigation with debounce
  let debounceTimer = null;
  const observer = new MutationObserver(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      notifyLocationFound();
    }, 500); // Wait 500ms after mutations stop before checking
  });

  observer.observe(document.body, {
    subtree: true,
    childList: true
  });
})();
