// background.js - Service Worker

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'LOCATION_FOUND') {
        // Store the location for popup to access
        chrome.storage.local.set({
            detectedLocation: message.data,
            lastUpdated: new Date().toISOString()
        });
    }
});

// Clean up old storage if needed
chrome.storage.local.onChanged.addListener((changes, namespace) => {
    // You could add cleanup logic here if storage grows too large
});
