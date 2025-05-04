# GitHub Actions Workflows

This directory contains GitHub Actions workflow configurations for the Weather App. The workflows automate testing, accessibility checks, and other continuous integration tasks.

## Available Workflows

### test.yml

This workflow runs on push to the main branch and on pull requests. It contains two jobs:

1. **Test Job**
   - Runs linting to check code quality
   - Executes the test suite with coverage reporting
   - Uploads coverage reports to Codecov (if configured)

2. **Accessibility Job**
   - Starts the application in a test environment
   - Runs automated accessibility tests against key pages
   - Uploads accessibility reports and screenshots as artifacts

## Accessibility Testing in CI

The accessibility tests check for WCAG 2.1 AA compliance on key pages:
- Home page
- Weather results page
- Error page

### Viewing Accessibility Reports

When the workflow completes, you can access the accessibility reports as follows:

1. Go to the Actions tab in the GitHub repository
2. Select the workflow run you want to examine
3. Scroll down to the "Artifacts" section
4. Download the "accessibility-reports" artifact
5. Extract the ZIP file to view:
   - Markdown reports in the `reports` directory
   - Screenshots in the `screenshots` directory

### Accessibility Test Status

The workflow is configured to continue even if accessibility tests fail. This ensures that PRs can be reviewed and merged, with accessibility issues addressed iteratively.

To see if there were accessibility issues:
1. Check the workflow logs for the "Run accessibility tests" step
2. Look for warnings or error messages

## Adding New Tests or Workflows

When adding new workflows or modifying existing ones:

1. Test locally using [act](https://github.com/nektos/act) if possible
2. Document the purpose and behavior of the workflow
3. Ensure any secrets or environment variables are properly handled
4. Update this README if the workflow behavior changes significantly 