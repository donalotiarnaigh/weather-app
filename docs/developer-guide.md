# Developer Onboarding Guide

## Welcome to the Weather App Project!

This guide is designed to help new developers quickly set up their development environment and understand the codebase structure, workflows, and best practices.

## 1. Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Git
- A code editor (VS Code recommended)
- An OpenWeatherMap API key

### First-time Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd weather-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the project root with the following content:

```
OPENWEATHER_API_KEY=your_api_key_here
PORT=3000
NODE_ENV=development
```

4. **Run the development server**

```bash
npm run dev
```

5. **Verify the installation**

Open your browser and navigate to [http://localhost:3000](http://localhost:3000). You should see the Weather App home page.

## 2. Project Architecture

### Overview

The Weather App follows a modular architecture with clear separation of concerns:

```
weather-app/
├── app.js                 # Application entry point
├── config/                # Configuration settings
├── middleware/            # Express middleware
├── routes/                # Route handlers
├── services/              # Business logic and API services
├── utils/                 # Utility functions and helpers
├── views/                 # EJS templates
├── public/                # Static files
└── tests/                 # Test files
```

### Key Components

1. **app.js**: The application entry point that initializes Express and loads the necessary middleware.

2. **config/**: Configuration settings, environment variables, and app setup.
   - `index.js`: Main configuration exports
   - `app.js`: Express application configuration

3. **middleware/**: Express middleware functions.
   - `errorHandler.js`: Global error handling
   - `rateLimitMiddleware.js`: Rate limiting configuration
   - `validationMiddleware.js`: Request validation

4. **routes/**: HTTP route handlers.
   - `index.js`: Route registry
   - `weather.js`: Weather-related routes

5. **services/**: Business logic and external API interactions.
   - `weatherService.js`: OpenWeatherMap API integration

6. **utils/**: Helper functions and utilities.
   - `errors.js`: Custom error classes
   - `httpUtils.js`: HTTP request utilities
   - `responseUtils.js`: Response helpers

7. **views/**: EJS templates for rendering HTML.
   - `home.ejs`: Weather search form
   - `weather.ejs`: Weather results display
   - `error.ejs`: Error page
   - `partials/`: Reusable template parts

## 3. Development Workflow

### Branch Strategy

We follow a feature branch workflow:

1. Create a branch for your feature or fix: `git checkout -b feature/your-feature-name`
2. Make your changes and commit them with descriptive messages
3. Push your branch to the remote repository: `git push origin feature/your-feature-name`
4. Create a pull request for code review

### Commit Message Format

Write clear, concise commit messages using the following format:

```
<type>: <description>

[optional body]
```

Types include:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style/formatting changes
- `refactor`: Code refactoring
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks

### Code Style and Linting

The project uses ESLint and Prettier for code quality and formatting:

- Run `npm run lint` to check for linting issues
- Run `npm run lint:fix` to automatically fix linting issues
- Run `npm run format` to format code with Prettier

Git hooks will automatically check code style before commits.

## 4. Testing

### Testing Approach

The project maintains a comprehensive test suite with unit and integration tests.

### Running Tests

- Run all tests: `npm test`
- Run tests in watch mode: `npm run test:watch`
- Generate coverage report: `npm run test:coverage`

### Writing Tests

When adding new features, include appropriate tests:

- Unit tests for utilities, services, and middleware
- Integration tests for routes and API endpoints

Example test file structure:

```javascript
describe('Module or Function Name', () => {
  beforeEach(() => {
    // Setup code
  });

  it('should do something specific', () => {
    // Test code
    expect(result).toBe(expectedValue);
  });

  // More test cases...
});
```

## 5. Common Development Tasks

### Adding a New Route

1. Create a handler function in the appropriate route file
2. Add validation middleware if needed
3. Register the route in the route file
4. Add tests for the new route

### Modifying the UI

1. Locate the relevant EJS template in `views/`
2. Make changes following the UI guidelines in `docs/ui-components.md`
3. Test the changes across different screen sizes

### Working with the OpenWeatherMap API

1. Use the `weatherService.js` for all API interactions
2. Handle errors appropriately
3. Add new parameters or endpoints as needed

## 6. Troubleshooting

### Common Issues

1. **API Key Issues**
   - Check that your `.env` file has the correct OpenWeatherMap API key
   - Ensure the key has the necessary permissions

2. **Port Conflicts**
   - If port 3000 is already in use, the app will automatically try the next available port
   - Alternatively, set a different port in your `.env` file

3. **Module Not Found Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check for typos in import statements

### Debugging

- Use console.log() for basic debugging
- For more complex issues, use the Node.js debugger:
  1. Run `node --inspect app.js`
  2. Open Chrome and navigate to `chrome://inspect`
  3. Click "Open dedicated DevTools for Node"

## 7. Resources

- [Express.js Documentation](https://expressjs.com/)
- [EJS Documentation](https://ejs.co/)
- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.0/getting-started/introduction/)

## 8. Contributing

See the [CONTRIBUTING.md](../CONTRIBUTING.md) file for details on our code of conduct and the process for submitting pull requests.

## 9. Contacts

If you have questions or need assistance, contact the project maintainers:

- Project Lead: [Name](mailto:email@example.com)
- Backend Developer: [Name](mailto:email@example.com)
- Frontend Developer: [Name](mailto:email@example.com) 