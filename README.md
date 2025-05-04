# Weather Application

A modern, secure Node.js/Express application for retrieving and displaying weather information using the OpenWeatherMap API.

## Features

- **Weather Lookup**: Search for current weather conditions by city name
- **Modern Architecture**: Modular codebase with separation of concerns
- **Security**: Input validation, rate limiting, and HTTP security headers
- **Error Handling**: Comprehensive error handling with custom error classes
- **Development Tools**: ESLint, Prettier, and Jest for testing

## Technology Stack

- **Backend**: Node.js, Express.js
- **View Engine**: EJS
- **API**: OpenWeatherMap API
- **Testing**: Jest, Supertest
- **Code Quality**: ESLint, Prettier
- **Security**: Helmet, Express-validator, Express-rate-limit

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
