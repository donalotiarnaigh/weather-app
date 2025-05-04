/**
 * Accessibility Testing Configuration
 *
 * This file contains configuration options for accessibility testing with axe-core
 */

module.exports = {
  // Base URL for all tests
  baseUrl: 'http://localhost:3000',

  // Test pages
  pages: {
    homePage: '/',
    weatherResultsPage: '/weather/london',
    errorPage: '/weather/nonexistentcity12345',
  },

  // Test timeout in milliseconds
  timeout: 10000,

  // Axe configuration
  axeConfig: {
    // WCAG level to test against
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
    },
    // Rules configuration
    rules: [],
    // Note: If you need to disable specific rules, use this format:
    // rules: [
    //   { id: 'color-contrast', enabled: false }
    // ]
  },
};
