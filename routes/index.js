/**
 * Routes registry
 * Central export point for all routes
 */

const express = require('express');
const weatherRoutes = require('./weather');

/**
 * Register all application routes
 * @param {express.Application} app - Express application instance
 */
function registerRoutes(app) {
  // Register weather routes
  app.use('/', weatherRoutes);
  
  // Error route for 404
  app.use((req, res) => {
    res.status(404).render('error', {
      title: 'Page Not Found',
      message: 'The page you are looking for does not exist.',
      statusCode: 404
    });
  });
}

module.exports = registerRoutes; 