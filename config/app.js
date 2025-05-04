/**
 * Express app configuration
 * Sets up middleware, view engine, and static files
 */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

/**
 * Configure Express application
 * @param {express.Application} app - Express application instance
 * @returns {express.Application} Configured Express application
 */
function configureApp(app) {
  // Configure middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static("public"));
  
  // Configure view engine
  app.set("view engine", "ejs");
  app.set("views", path.join(process.cwd(), "views"));
  
  return app;
}

module.exports = { configureApp }; 