# Accessibility Testing Guide

This document explains how to run accessibility tests for the Weather App and how to interpret the results.

## Overview

The Weather App uses automated accessibility testing with [axe-core](https://github.com/dequelabs/axe-core) and [Puppeteer](https://pptr.dev/) to check compliance with [WCAG 2.1 AA standards](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.1&levels=aaa).

Our testing approach:
1. Automated tests check for common accessibility issues
2. Tests run against all key pages of the application
3. Reports are generated in Markdown format for easy reading
4. Screenshots are captured for visual reference

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- The Weather App running locally on port 3000

## Running the Tests

### Using the npm Script

The simplest way to run accessibility tests is using the npm script:

```bash
# Make sure the app is running first
npm run dev

# In another terminal, run:
npm run test:a11y
```

### Using the Standalone Script

For quick testing during development:

```bash
# Make sure the app is running first
npm run dev

# In another terminal, run:
node tests/accessibility/run-a11y-tests.js
```

### Using Jest

For CI/CD pipelines or running as part of the test suite:

```bash
# Make sure the app is running first
npm run dev

# In another terminal, run:
npm test -- tests/accessibility/a11y.test.js
```

## Automated Accessibility Testing

Accessibility tests are integrated in our development workflow in two ways:

### 1. Git Hooks (Pre-commit)

When you modify any EJS template files, the pre-commit Git hook will automatically run accessibility tests **if the application is running**. This ensures accessibility issues are caught early.

To make this work:
1. Start the application with `npm run dev`
2. Make changes to EJS files
3. Commit your changes

If the application is not running, you'll receive a warning but the commit will proceed.

### 2. GitHub Actions (CI/CD)

Accessibility tests run automatically as part of our CI/CD pipeline for every pull request and push to the main branch. The tests:

1. Start the application in a test environment
2. Run accessibility checks on all key pages
3. Generate detailed reports and screenshots
4. Upload the reports as artifacts in the workflow

#### Viewing CI/CD Accessibility Reports

To view the accessibility reports from a GitHub Actions run:

1. Go to the Actions tab in the GitHub repository
2. Select the workflow run you want to examine
3. Scroll down to the "Artifacts" section
4. Download the "accessibility-reports" artifact
5. Extract the ZIP file to view the reports and screenshots

## Test Output

The accessibility tests generate two types of output:

1. **Reports** - Markdown files in `tests/accessibility/reports/` with detailed information about any accessibility violations
2. **Screenshots** - PNG images in `tests/accessibility/screenshots/` showing the state of each page during testing

## Understanding the Reports

Each report contains:

- **Summary** - Overview of test results including total violations
- **Violations** - Detailed list of accessibility issues found, including:
  - Issue type and impact level
  - Description of the problem
  - Link to help documentation
  - Example HTML nodes with issues
  - Suggestions for fixing the problem

## Example Report

Here's an excerpt from an example report:

```markdown
# Accessibility Test Report

## Summary

- URL: http://localhost:3000/
- Timestamp: 2023-05-07T15:30:45.123Z
- Total violations: 2
- Passing checks: 120
- Incomplete checks: 0
- Inapplicable checks: 50

## Violations

### 1. color-contrast: serious impact

- Description: Elements must have sufficient color contrast
- Help: Elements must have sufficient color contrast
- Help URL: https://dequeuniversity.com/rules/axe/4.4/color-contrast
- Affected nodes: 1

#### Example Nodes:

##### Node 1
```html
<small class="text-muted">Try searching for cities like London, New York, or Tokyo</small>
```

Failure Summary:
```
Element has insufficient color contrast of 3.37 (foreground color: #6c757d, background color: #ffffff, font size: 12.0pt, font weight: normal). Expected contrast ratio of 4.5:1
```
```

## Fixing Accessibility Issues

When you find accessibility issues:

1. Read the violation description carefully
2. Check the help URL for detailed guidance
3. Look at the specific HTML nodes that are failing
4. Make the necessary changes to fix the issue
5. Run the tests again to verify the fix

Common fixes include:
- Increasing color contrast
- Adding alternative text to images
- Ensuring proper heading structure
- Fixing form labels
- Adding ARIA attributes where appropriate

## Continuous Improvement

Accessibility should be an ongoing concern:

1. Run these tests regularly during development
2. Address accessibility issues promptly during code review
3. Test with real assistive technologies (screen readers, etc.)
4. Consider manual testing to supplement automated tests

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [Deque University](https://dequeuniversity.com/) 