/**
 * Express app configuration
 * Sets up middleware, view engine, and static files
 */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const { rateLimitMiddleware } = require('../middleware');

/**
 * Configure Express application
 * @param {express.Application} app - Express application instance
 * @returns {express.Application} Configured Express application
 */
function configureApp(app) {
  // Apply security headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
          imgSrc: ["'self'", 'data:', 'openweathermap.org'], // Allow OpenWeatherMap images
          fontSrc: ["'self'", 'fonts.gstatic.com'],
          connectSrc: ["'self'", 'api.openweathermap.org'],
        },
      },
    })
  );

  // Apply global rate limiter
  app.use(rateLimitMiddleware.globalLimiter);

  // Configure middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static('public'));

  // Configure view engine
  app.set('view engine', 'ejs');
  app.set('views', path.join(process.cwd(), 'views'));

  return app;
}

module.exports = { configureApp };
