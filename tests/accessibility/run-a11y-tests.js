/**
 * Run Accessibility Tests
 *
 * This is a standalone script to run accessibility tests and generate reports.
 * It can be used outside of Jest for quicker iteration when fixing issues.
 */

const config = require('./config');
const { testPageAccessibility, generateAccessibilityReport, saveReport } = require('./a11y-helper');

/**
 * Main function to run all accessibility tests
 */
async function runAllTests() {
  try {
    console.log('Running accessibility tests...');

    // Test home page
    console.log('\nTesting home page...');
    const homeResults = await testPageAccessibility(config.pages.homePage, 'home');
    const homeReport = generateAccessibilityReport(homeResults);
    saveReport(homeReport, 'home');

    // Test weather results page
    console.log('\nTesting weather results page...');
    const weatherResults = await testPageAccessibility(
      config.pages.weatherResultsPage,
      'weather-results'
    );
    const weatherReport = generateAccessibilityReport(weatherResults);
    saveReport(weatherReport, 'weather-results');

    // Test error page
    console.log('\nTesting error page...');
    const errorResults = await testPageAccessibility(config.pages.errorPage, 'error');
    const errorReport = generateAccessibilityReport(errorResults);
    saveReport(errorReport, 'error');

    // Print summary
    console.log('\n=== SUMMARY ===');
    console.log(`Home page: ${homeResults.violations.length} violations`);
    console.log(`Weather results page: ${weatherResults.violations.length} violations`);
    console.log(`Error page: ${errorResults.violations.length} violations`);

    // Exit with non-zero status if any violations
    const totalViolations =
      homeResults.violations.length +
      weatherResults.violations.length +
      errorResults.violations.length;

    if (totalViolations > 0) {
      console.log(
        `\n❌ Found ${totalViolations} accessibility violations. Check the reports for details.`
      );
      process.exit(1);
    } else {
      console.log('\n✅ No accessibility violations found! All pages pass WCAG standards.');
      process.exit(0);
    }
  } catch (error) {
    console.error('Error running accessibility tests:', error);
    process.exit(1);
  }
}

// Run all tests
runAllTests();
