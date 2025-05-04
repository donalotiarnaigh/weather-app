/**
 * Accessibility Testing Helper
 *
 * Utility functions to run accessibility tests with axe-core and Puppeteer
 */

const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');
const config = require('./config');
const fs = require('fs');
const path = require('path');

/**
 * Run accessibility tests on a specific page
 * @param {string} pagePath - The path to test, relative to baseUrl
 * @param {string} pageName - The name of the page for reporting
 * @returns {Promise<Object>} - Results of the accessibility test
 */
async function testPageAccessibility(pagePath, pageName) {
  // Launch browser
  const browser = await puppeteer.launch({
    headless: 'new', // Use new headless mode
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    // Create a new page
    const page = await browser.newPage();

    // Set viewport size
    await page.setViewport({ width: 1280, height: 800 });

    // Navigate to the page
    const url = `${config.baseUrl}${pagePath}`;
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: config.timeout,
    });

    // Wait for any animations or transitions to complete
    // Use setTimeout instead of waitForTimeout for compatibility with older Puppeteer versions
    await new Promise(resolve => setTimeout(resolve, 500));

    // Run axe analysis
    const results = await new AxePuppeteer(page).configure(config.axeConfig).analyze();

    // Take a screenshot for reference
    const screenshotDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    await page.screenshot({
      path: path.join(screenshotDir, `${pageName}-${Date.now()}.png`),
      fullPage: true,
    });

    return results;
  } finally {
    // Always close the browser
    await browser.close();
  }
}

/**
 * Generate a human-readable report from axe results
 * @param {Object} results - Axe test results
 * @returns {string} - Formatted report
 */
function generateAccessibilityReport(results) {
  const { violations, passes, incomplete, inapplicable } = results;

  let report = '# Accessibility Test Report\n\n';

  // Summary
  report += '## Summary\n\n';
  report += `- URL: ${results.url}\n`;
  report += `- Timestamp: ${new Date().toISOString()}\n`;
  report += `- Total violations: ${violations.length}\n`;
  report += `- Passing checks: ${passes.length}\n`;
  report += `- Incomplete checks: ${incomplete.length}\n`;
  report += `- Inapplicable checks: ${inapplicable.length}\n\n`;

  // Violations
  if (violations.length > 0) {
    report += '## Violations\n\n';

    violations.forEach((violation, index) => {
      report += `### ${index + 1}. ${violation.id}: ${violation.impact} impact\n\n`;
      report += `- Description: ${violation.description}\n`;
      report += `- Help: ${violation.help}\n`;
      report += `- Help URL: ${violation.helpUrl}\n`;
      report += `- Affected nodes: ${violation.nodes.length}\n\n`;

      // Show the first 3 nodes as examples
      const nodesToShow = violation.nodes.slice(0, 3);
      if (nodesToShow.length > 0) {
        report += '#### Example Nodes:\n\n';
        nodesToShow.forEach((node, nodeIndex) => {
          report += `##### Node ${nodeIndex + 1}\n`;
          report += '```html\n';
          report += `${node.html}\n`;
          report += '```\n\n';

          if (node.failureSummary) {
            report += 'Failure Summary:\n';
            report += '```\n';
            report += `${node.failureSummary}\n`;
            report += '```\n\n';
          }
        });
      }
    });
  } else {
    report += '## No violations found! 🎉\n\n';
  }

  return report;
}

/**
 * Save the accessibility report to a file
 * @param {string} report - Formatted report text
 * @param {string} pageName - Name of the page tested
 */
function saveReport(report, pageName) {
  const reportsDir = path.join(__dirname, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const reportPath = path.join(reportsDir, `${pageName}-report-${Date.now()}.md`);
  fs.writeFileSync(reportPath, report, 'utf8');

  console.log(`Accessibility report for ${pageName} saved to ${reportPath}`);
}

module.exports = {
  testPageAccessibility,
  generateAccessibilityReport,
  saveReport,
};
