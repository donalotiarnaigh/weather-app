# Accessibility Testing Guide

This document provides guidelines for running and maintaining the accessibility tests for the Weather App project.

## Overview

The Weather App uses automated accessibility testing to ensure compliance with WCAG standards. These tests use:

- [axe-core](https://github.com/dequelabs/axe-core) - The industry-standard accessibility testing library
- [Puppeteer](https://pptr.dev/) - A headless Chrome browser for automated testing
- [Jest](https://jestjs.io/) - The testing framework for running the tests

## Running Accessibility Tests

### Basic Usage

To run the accessibility tests, use one of the following commands:

```bash
# Run accessibility tests with a dedicated script
npm run test:a11y

# Run with experimental VM modules support (for Node.js 14+)
npm run test:a11y:ci
```

### Node.js Version Compatibility

Due to Puppeteer using dynamic imports, some Node.js versions require the `--experimental-vm-modules` flag. The `test:a11y:ci` command includes this flag.

### Interpreting Test Results

After running the tests, reports will be generated in:

- `tests/accessibility/reports/` - Contains detailed Markdown reports of tests
- `tests/accessibility/screenshots/` - Contains screenshots of each page at test time

These reports provide:
- Summary of violations found
- Details about each violation
- HTML snippets of problematic elements
- Recommendations for fixing issues

## Test Configuration

The accessibility tests configuration is located in `tests/accessibility/config.js`. Key settings include:

- `baseUrl` - The base URL for accessibility testing (defaults to http://localhost:3000)
- `pages` - The pages to test (home, weather results, error)
- `timeout` - Test timeout in milliseconds
- `axeConfig` - Configuration options for axe-core

You can adjust the WCAG level and other settings in the `axeConfig` section.

## Troubleshooting

### Common Issues

1. **Test timeouts**: If tests time out, try increasing the `timeout` value in the config file.

2. **Dynamic import errors**: If you see errors like `A dynamic import callback was invoked without --experimental-vm-modules`, use the `npm run test:a11y:ci` command which includes the necessary flag.

3. **Screenshots not captured**: Ensure the `screenshots` directory exists and is writable.

### Git Pre-push Hooks

The pre-push Git hook has been configured to exclude accessibility tests by default to prevent issues with dynamic imports. You can still run these tests manually before committing your changes.

## Extending the Tests

### Adding New Pages to Test

To add a new page to test:

1. Add the page path to the `pages` object in `tests/accessibility/config.js`
2. Create a new test case in `tests/accessibility/a11y.test.js`

### Customizing Test Criteria

You can adjust which WCAG guidelines to test against by modifying the `axeConfig` object in the configuration file. The default is set to WCAG 2.1 AA level.

## Best Practices

1. **Run tests regularly** during development to catch accessibility issues early
2. **Review the generated reports** to understand specific violations
3. **Fix issues progressively** starting with the most severe impact violations
4. **Commit your fixes** but not the generated reports (they're in .gitignore)
5. **Update tests** when adding new UI components or pages 