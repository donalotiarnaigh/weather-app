/**
 * Loading States and Transitions
 *
 * This script handles showing and hiding loading indicators and managing
 * transitions between UI states.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Get references to DOM elements
  const weatherForm = document.querySelector('form');
  const searchButton = document.getElementById('search-button');
  const searchIcon = searchButton ? searchButton.querySelector('i') : null;
  const cityInput = document.getElementById('cityInput');
  const loadingContainer = document.querySelector('.loading-container');
  const weatherIcon = document.getElementById('weatherIcon');

  // Only proceed if we're on a page with the weather form
  if (weatherForm && searchButton && cityInput) {
    // Add loading state when form is submitted
    weatherForm.addEventListener('submit', function (event) {
      // Show loading spinner in button
      if (searchIcon) {
        searchIcon.className = 'spinner-border spinner-border-sm';
        searchIcon.setAttribute('role', 'status');
        searchIcon.setAttribute('aria-hidden', 'true');
      }

      // Disable the search button and add loading text
      searchButton.setAttribute('disabled', 'disabled');
      searchButton.innerHTML = searchButton.innerHTML.replace('Search', 'Loading...');

      // Disable the input
      cityInput.setAttribute('readonly', 'readonly');

      // Add a loading class to the form for styling
      weatherForm.classList.add('is-loading');

      // Show the loading skeleton if it exists
      if (loadingContainer) {
        // Hide the form
        weatherForm.style.display = 'none';

        // Show the loading container
        loadingContainer.classList.remove('d-none');
        loadingContainer.classList.add('d-block');

        // This would normally submit the form and navigate, but we'll
        // add a small delay to show the loading state before the actual navigation
        setTimeout(() => {
          // Let the form submit normally
          return true;
        }, 300);
      }
    });
  }

  // Add loading animation to weather icon if present
  if (weatherIcon) {
    // Initially set the loading class
    weatherIcon.classList.add('loading');

    // Remove the loading class once the image has loaded
    weatherIcon.onload = function () {
      weatherIcon.classList.remove('loading');
    };
  }

  // Handle page transitions with fade effects
  const contentElements = document.querySelectorAll('.weather-search-card, .weather-result');

  // If elements exist, add visible class after a short delay for entrance animation
  if (contentElements.length > 0) {
    setTimeout(() => {
      contentElements.forEach(el => {
        el.classList.add('visible');
      });
    }, 50);
  }
});
