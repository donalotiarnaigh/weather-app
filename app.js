/**
 * Main application entry point
 */

// Load configuration
const config = require('./config');
const { configureApp } = require('./config/app');

// Import dependencies
const express = require('express');
const registerRoutes = require('./routes');
const { errorHandler } = require('./middleware');

// Create Express application
const app = express();

// Configure the application
configureApp(app);

// Register routes
registerRoutes(app);

// Add error handling middleware
app.use(errorHandler);

// Start the server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
  // In a production environment, you might want to:
  // - Log to an error monitoring service
  // - Gracefully shutdown the server
});

// Handle uncaught exceptions
process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
  // In a production environment, you might want to:
  // - Log to an error monitoring service
  // - Gracefully shutdown the server
  process.exit(1); // Exit with error
});
