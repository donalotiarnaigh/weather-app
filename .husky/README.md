# Git Hooks Configuration

This directory contains Git hooks configured with [Husky](https://typicode.github.io/husky/) to run automated checks and tests.

## Available Hooks

### pre-commit

The pre-commit hook runs before commits are finalized and includes:
- Linting (ESLint) and formatting (Prettier) checks via lint-staged
- Accessibility tests on EJS files if they've been modified and the app is running

### pre-push

The pre-push hook runs before pushing to a remote repository and includes:
- Running the full test suite with coverage
- Checking that coverage thresholds are met

## Accessibility Testing in pre-commit

When you modify any EJS files, the pre-commit hook will automatically check for accessibility issues **if the application is running**.

To ensure accessibility tests run during pre-commit:
1. Start the application with `npm run dev`
2. Make changes to EJS files
3. Commit your changes

If the application is not running when you try to commit, you'll receive a warning but the commit will proceed.

## Skipping Hooks

In emergency situations, you can bypass git hooks using the `--no-verify` flag:

```bash
git commit --no-verify -m "Emergency commit"
git push --no-verify
```

**Note**: This should be used sparingly and only when absolutely necessary.

## Setup for New Developers

The hooks should be installed automatically when running `npm install` due to the `prepare` script in package.json.

If you need to manually set up the hooks, run:

```bash
npm run prepare
``` 