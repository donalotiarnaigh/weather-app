# Weather App Architecture

## Current Structure Analysis

The current application has a monolithic structure with all functionality in a single `app.js` file:

- Express server setup and configuration
- Route definitions (GET and POST for '/')
- Weather API interaction logic
- Response handling and view rendering

This structure has several limitations:
- Poor separation of concerns
- Limited error handling
- Difficult to test individual components
- Hard to extend with new features

## Proposed Modular Architecture

We'll refactor the application into a modular architecture with clear separation of concerns:

```
weather-app/
├── config/                  # Configuration files
│   ├── index.js            # Main configuration exports
│   └── app.js              # Express app configuration
│
├── routes/                  # Route definitions
│   ├── index.js            # Route registry
│   └── weather.js          # Weather-related routes
│
├── services/                # Business logic and external services
│   ├── index.js            # Service registry
│   └── weatherService.js   # Weather API interactions
│
├── middleware/              # Express middleware
│   ├── index.js            # Middleware registry
│   └── errorHandler.js     # Global error handling
│
├── utils/                   # Utility functions
│   ├── index.js            # Utility registry
│   └── httpUtils.js        # HTTP request helpers
│
├── public/                  # Static assets (existing)
│   └── css/
│       └── styles.css
│
├── views/                   # Templates (existing)
│   ├── home.ejs
│   ├── weather.ejs
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
│
├── app.js                   # Main application entry point (simplified)
├── .env                     # Environment variables (not in repo)
├── .env.example             # Environment variable template
└── package.json             # Project configuration
```

## Component Responsibilities

### Config

- **app.js**: Configure Express application (middleware setup, view engine)
- **index.js**: Export all configuration (env vars, app settings)

### Routes

- **index.js**: Register and export all routes
- **weather.js**: Define routes for weather functionality (/, /weather)

### Services

- **weatherService.js**: Handle weather API interactions, data processing
- **index.js**: Export all services

### Middleware

- **errorHandler.js**: Global error handling middleware
- **index.js**: Export all middleware

### Utils

- **httpUtils.js**: Helper functions for HTTP requests
- **index.js**: Export all utility functions

### Main App (app.js)

The main app.js will be simplified to:
- Load configuration
- Initialize Express app with configs
- Register routes
- Set up error handling
- Start the server

## Data Flow

1. Client makes a request to a route
2. Route handler receives request
3. Route handler calls appropriate service(s)
4. Service makes external API calls if needed
5. Service processes data and returns to route handler
6. Route handler renders view with data
7. Response sent to client

## Error Handling

- Services will use try/catch for error handling
- Routes will pass errors to the error middleware
- Global error middleware will format errors for the client

## Benefits

This architecture provides:
- Clear separation of concerns
- Improved maintainability
- Better testability
- Easier to extend with new features
- Improved error handling
- More secure application structure 