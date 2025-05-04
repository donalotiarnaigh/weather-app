# Weather Application

A modern, secure Node.js/Express application for retrieving and displaying weather information using the OpenWeatherMap API.

## Features

- **Weather Lookup**: Search for current weather conditions by city name
- **Modern Architecture**: Modular codebase with separation of concerns
- **Security**: Input validation, rate limiting, and HTTP security headers
- **Error Handling**: Comprehensive error handling with custom error classes
- **Responsive UI**: Bootstrap 5-based interface optimized for all devices
- **Accessibility**: ARIA labels, proper contrast, and keyboard navigation
- **Development Tools**: ESLint, Prettier, and Jest for testing
- **Automated Testing**: Comprehensive test suite with 95%+ code coverage
- **CI/CD**: Git hooks and GitHub Actions for continuous integration

## Technology Stack

- **Backend**: Node.js, Express.js
- **View Engine**: EJS
- **CSS Framework**: Bootstrap 5.3+
- **Icons**: Bootstrap Icons
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

   - If port 3000 is in use, the application will automatically use the next available port
   - Check the console output for the actual port being used

## Usage

### Basic Weather Lookup

1. Enter a city name in the search form on the home page
2. Click the "Search" button
3. View the current weather details for that city

### Direct Weather Access

You can also access weather information directly via URL:
```
http://localhost:3000/weather/CityName
```

### Error Handling

- If the city is not found, an error message will be displayed
- Rate limits protect against excessive requests (30 per 15 minutes)
- Detailed error information helps diagnose issues

## Documentation

Comprehensive documentation is available in the `docs` directory:

- [API Documentation](docs/api.md) - Information about endpoints and responses
- [UI Components](docs/ui-components.md) - Design system and UI component usage
- [Developer Guide](docs/developer-guide.md) - Onboarding guide for developers
- [Code Organization Assessment](docs/assessment/code-organization-assessment.md) - Analysis of code structure
- [Code Improvements](docs/assessment/code-improvements.md) - Summary of recent code improvements

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
├── app.js              # Application entry point
├── config/             # Configuration files
├── middleware/         # Express middleware
├── routes/             # Route handlers
├── services/           # Business logic and API services
├── utils/              # Utility functions and helpers
├── views/              # EJS templates
│   ├── css/            # CSS files including variables
│   └── images/         # Images and icons
├── docs/               # Documentation
├── tests/              # Test files
│   ├── unit/           # Unit tests
│   └── integration/    # Integration tests
├── .github/workflows/  # GitHub Actions workflows
└── .husky/             # Git hooks
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENWEATHER_API_KEY` | API key for OpenWeatherMap | (Required) |
| `PORT` | Port for the Express server | 3000 |
| `NODE_ENV` | Environment (development/production) | development |
| `RATE_LIMIT_GLOBAL` | Global rate limit (requests per 15 min) | 100 |
| `RATE_LIMIT_WEATHER_API` | Weather API rate limit (requests per 15 min) | 30 |

## Recent Enhancements (Phase 2)

- **UI Modernization**
  - Updated to Bootstrap 5.3+ from Bootstrap 3.3.7
  - Implemented responsive card-based design
  - Added CSS variables for consistent styling
  - Improved accessibility features
  - Added favicon and branding elements
  
- **Code Quality Improvements**
  - Reduced code duplication in route handlers
  - Implemented consistent error handling
  - Enhanced HTTP utilities with timeout handling
  - Improved documentation with JSDoc comments

- **Reliability Enhancements**
  - Added automatic port failover for server startup
  - Enhanced error handling and user feedback
  
## License

ISC

## Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather data API
- Original application created during a coding bootcamp, modernized with current best practices
