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

/**
 * Start the server with port fallback
 * @param {number} port - Port to try
 * @param {number} maxRetries - Maximum number of alternate ports to try
 * @param {number} currentRetry - Current retry attempt
 */
function startServer(port, maxRetries = 10, currentRetry = 0) {
  // Ensure port is a number and within valid range
  const portNumber = parseInt(port, 10);

  if (isNaN(portNumber) || portNumber < 1024 || portNumber > 65535) {
    console.error(`Invalid port: ${port}. Using default port 3000.`);
    port = 3000;
  }

  const server = app
    .listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`Environment: ${config.nodeEnv}`);
    })
    .on('error', err => {
      if (err.code === 'EADDRINUSE' && currentRetry < maxRetries) {
        // Try the next port up to a maximum of 10 ports
        const nextPort = port + 1;
        console.warn(`Port ${port} is already in use, trying port ${nextPort}...`);
        server.close();
        startServer(nextPort, maxRetries, currentRetry + 1);
      } else {
        console.error('Server failed to start:', err.message);
        process.exit(1);
      }
    });
}

// Start the server with the configured port
startServer(config.port);

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
