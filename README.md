# Weather Application

A modern, secure Node.js/Express application for retrieving and displaying weather information using the OpenWeatherMap API.

## Features

- **Weather Lookup**: Search for current weather conditions by city name
- **Modern Architecture**: Modular codebase with separation of concerns
- **Security**: Input validation, rate limiting, and HTTP security headers
- **Error Handling**: Comprehensive error handling with custom error classes
- **Development Tools**: ESLint, Prettier, and Jest for testing
- **Automated Testing**: Comprehensive test suite with 95%+ code coverage
- **CI/CD**: Git hooks and GitHub Actions for continuous integration

## Technology Stack

- **Backend**: Node.js, Express.js
- **View Engine**: EJS
- **API**: OpenWeatherMap API
- **Testing**: Jest, Supertest
- **Code Quality**: ESLint, Prettier, Husky
- **Security**: Helmet, Express-validator, Express-rate-limit
- **CI/CD**: GitHub Actions, Husky, lint-staged

## Getting Started

### Prerequisites

- Node.js (version 14.x or later)
- npm (version 6.x or later)
- OpenWeatherMap API key ([Get one here](https://openweathermap.org/api))

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd weather-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   PORT=3000
   NODE_ENV=development
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

- Enter a city name in the search form and submit to see current weather details
- Access weather directly via URL: `/weather/CityName`

## Development

### Available Scripts

- `npm start` - Run in production mode
- `npm run dev` - Run in development mode with nodemon
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Check code with ESLint
- `npm run lint:fix` - Fix linting issues automatically
- `npm run format` - Format code with Prettier

### Project Structure

```
weather-app/
├── config/             # Configuration files
├── middleware/         # Express middleware
├── routes/             # Route handlers
├── services/           # Business logic and API services
├── utils/              # Utility functions and helpers
├── views/              # EJS templates
├── public/             # Static files
├── tests/              # Test files
│   ├── unit/           # Unit tests
│   └── integration/    # Integration tests
├── .github/workflows/  # GitHub Actions workflows
├── .husky/             # Git hooks
├── app.js              # Application entry point
└── README.md           # Project documentation
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENWEATHER_API_KEY` | API key for OpenWeatherMap | (Required) |
| `PORT` | Port for the Express server | 3000 |
| `NODE_ENV` | Environment (development/production) | development |
| `RATE_LIMIT_GLOBAL` | Global rate limit (requests per 15 min) | 100 |
| `RATE_LIMIT_WEATHER_API` | Weather API rate limit (requests per 15 min) | 30 |

## Testing Infrastructure

### Running Tests

- **Run all tests**: `npm test`
- **Run tests in watch mode**: `npm run test:watch`
- **Run tests with coverage**: `npm run test:coverage`

### Test Coverage

The project maintains high test coverage with the following thresholds:
- Statements: 75% (currently 95.59%)
- Branches: 70% (currently 84.41%)
- Functions: 75% (currently 96.29%)
- Lines: 75% (currently 95.56%)

To view the coverage report:
1. Run `npm run test:coverage`
2. Review the summary in the terminal
3. For a detailed HTML report, open `coverage/lcov-report/index.html` in your browser

### Test Structure

- **Unit Tests**: Located in `tests/unit/` directory, testing individual functions and components
  - Config tests
  - Middleware tests
  - Service tests
  - Utility tests
- **Integration Tests**: Located in `tests/integration/` directory, testing API endpoints and application flow

### Git Hooks

This project uses Husky to enforce code quality at different stages of the Git workflow:

- **Pre-commit Hook**: Runs on `git commit`
  - Executes `lint-staged` to run linting and formatting on staged files
  - Ensures code style consistency before commit
  
- **Pre-push Hook**: Runs on `git push`
  - Executes the full test suite with coverage checks
  - Ensures code meets coverage thresholds before pushing
  - Prevents pushing code that breaks tests or reduces coverage

### Continuous Integration

GitHub Actions is configured to run on each push to main and on pull requests:
1. Sets up Node.js environment
2. Installs dependencies
3. Runs linting checks
4. Executes test suite with coverage
5. Uploads coverage report to Codecov (if configured)

## Security Features

- **Input Validation**: All user inputs are validated
- **Rate Limiting**: Prevents abuse of the API
- **Security Headers**: Helmet.js for HTTP security headers
- **Content Security Policy**: Restricts resource loading

## License

ISC

## Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather data API
- Original application created during a coding bootcamp, modernized with current best practices
