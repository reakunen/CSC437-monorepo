/**
 * Dark Mode Toggle Functionality
 * This module handles dark mode toggle for the Lifestyle & Success Platform
 */

// Function to create and dispatch a custom event
function relayEvent(event, eventType, detail) {
    event.stopPropagation();
    const customEvent = new CustomEvent(eventType, {
        bubbles: true,
        detail: detail
    });
    event.currentTarget.dispatchEvent(customEvent);
}

// Initialize dark mode toggle functionality
function initDarkMode() {
    // Add change event handler to the dark mode toggle label
    document.querySelector('.dark-mode-toggle').onchange = function(event) {
        relayEvent(event, 'darkmode:toggle', {
            darkMode: event.target.checked
        });
    };

    // Add event listener to the body for the custom event
    document.body.addEventListener('darkmode:toggle', function(event) {
        if (event.detail.darkMode) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
    });

    // Check for saved dark mode preference in localStorage
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initDarkMode);

// Export for use in ES modules (uncomment for module usage)
// export { initDarkMode }; 