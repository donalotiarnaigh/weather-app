/**
 * Accessibility Tests
 *
 * This file contains Jest tests for running accessibility checks on key app pages
 * using axe-core and Puppeteer.
 */

const config = require('./config');
const { testPageAccessibility, generateAccessibilityReport, saveReport } = require('./a11y-helper');

// Increase timeout for these tests since they involve browser operations
jest.setTimeout(config.timeout * 2);

describe('Accessibility Tests', () => {
  test('Home page meets accessibility standards', async () => {
    // Test the home page
    const results = await testPageAccessibility(config.pages.homePage, 'home');

    // Generate and save report
    const report = generateAccessibilityReport(results);
    saveReport(report, 'home');

    // Assert no violations (or only ones we've explicitly allowed)
    expect(results.violations).toEqual([]);
  });

  test('Weather results page meets accessibility standards', async () => {
    // Test the weather results page
    const results = await testPageAccessibility(config.pages.weatherResultsPage, 'weather-results');

    // Generate and save report
    const report = generateAccessibilityReport(results);
    saveReport(report, 'weather-results');

    // Assert no violations (or only ones we've explicitly allowed)
    expect(results.violations).toEqual([]);
  });

  test('Error page meets accessibility standards', async () => {
    // Test the error page
    const results = await testPageAccessibility(config.pages.errorPage, 'error');

    // Generate and save report
    const report = generateAccessibilityReport(results);
    saveReport(report, 'error');

    // Assert no violations (or only ones we've explicitly allowed)
    expect(results.violations).toEqual([]);
  });
});
