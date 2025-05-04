# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2025-05-11

### Fixed
- CI pipeline environment configuration for tests
- Added Jest setup file to mock required environment variables
- Updated GitHub Actions workflow to provide environment variables for tests
- Prevented process.exit from stopping test execution

## [1.1.0] - 2025-05-10

### Added
- Comprehensive testing infrastructure with Jest
- Unit tests for all major components:
  - Services (weatherService.test.js)
  - Config (config.test.js)
  - Middleware (errorHandler.test.js, rateLimiter.test.js, validationMiddleware.test.js)
  - Utils (httpUtils.test.js, validateConfig.test.js, errors.test.js)
- Integration tests for API endpoints (app.test.js, routes/weather.test.js)
- Test utilities module with helper functions (testUtils.js)
- Husky for Git hooks:
  - Pre-commit hook for linting and formatting
  - Pre-push hook for full test suite with coverage thresholds
- GitHub Actions workflow for CI/CD
- Code coverage thresholds (75% statements, 70% branches, 75% functions, 75% lines)
- Updated README.md with testing documentation

### Changed
- Improved error handling in middleware
- Enhanced validation for API parameters
- Optimized weather service implementation
- Updated ESLint configuration to recognize Jest globals

### Fixed
- Edge case handling in error middleware
- Rate limiting configuration for special cases
- API error responses for better client handling

## [1.0.0] - 2025-05-05

### Added
- Initial release of modernized weather application
- Modern modular architecture
- Environment variable configuration
- Security features (input validation, rate limiting, HTTP security headers)
- Error handling with custom error classes
- Development tools (ESLint, Prettier)
- Basic test setup with Jest
- Enhanced documentation 