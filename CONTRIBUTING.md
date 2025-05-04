# Contributing Guidelines

Thank you for your interest in contributing to the Weather Application! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

- Be respectful and inclusive in your communication
- Provide constructive feedback
- Focus on what is best for the community and project

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature or bugfix
4. Install dependencies with `npm install`
5. Make your changes
6. Run tests to ensure they pass: `npm test`
7. Run linting to ensure code quality: `npm run lint`
8. Push your changes and submit a pull request

## Development Workflow

### Branching Strategy

- `main` - Main production branch
- `feature/xyz` - For new features
- `bugfix/xyz` - For bug fixes
- `refactor/xyz` - For code refactoring

### Commit Messages

Write clear and meaningful commit messages following these guidelines:

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests when appropriate

Example:
```
Add rate limiting to weather API endpoints

- Implement rate limiting with express-rate-limit
- Add configuration options for different environments
- Add user feedback for rate limit errors

Fixes #123
```

### Code Style

This project uses ESLint and Prettier to enforce code style:

- Run `npm run lint` to check your code
- Run `npm run lint:fix` to automatically fix issues
- Run `npm run format` to format your code with Prettier

The configuration files (.eslintrc.json and .prettierrc.json) define the specific rules for this project.

### Testing

All code changes should be accompanied by tests:

- Unit tests for individual components
- Integration tests for API endpoints and middleware
- Run tests with `npm test`
- Check test coverage with `npm run test:coverage`

## Pull Request Process

1. Ensure your code follows the style guidelines
2. Update the README.md with details of changes if appropriate
3. Include tests for your changes
4. Update documentation if necessary
5. The PR should work for all current features without regression

## Security Considerations

- Never commit API keys or sensitive data
- Use environment variables for configuration
- Validate all user inputs
- Apply appropriate rate limiting to prevent abuse
- Follow security best practices for Node.js applications

## Documentation

- Update JSDoc comments for all functions and classes
- Document API endpoints and their parameters
- Keep the README.md up to date with any changes

## License

By contributing to this project, you agree that your contributions will be licensed under the project's ISC license. 