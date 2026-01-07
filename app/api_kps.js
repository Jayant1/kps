const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const path = require("path");

const app = express();

var corsOptions = {
   origin: "*",
   optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Database
const db = require("./model/index.js");
// db.connection.sync();

// Swagger setup
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'KPS subsysteem (Korps Politie Suriname - Afdeling Rijbewijzen)',
      version: '1.0.0',
      description: 'REST API voor beheer van rijbewijzen, rijscholen, examens en overtredingen',
      contact: {
        name: 'KPS Admin',
        email: 'admin@kps.egov.com'
      }
    },
    servers: [
      {
        url: 'https://kps-api.gov.sr:3000',
        description: 'Sandbox omgeving'
      }
    ]
  },
  apis: [path.join(__dirname, 'routes', '*.js')] // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI endpoint
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// OpenAPI spec endpoint voor X-Road
app.get('/api/openapi.json', (req, res) => {
  res.json(swaggerSpec);
});

// Simple test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to KPS API application - Afdeling Rijbewijzen Systeem." });
});

// Import routes
require("./routes/rijbewijzen.route.js")(app);

const env = (process.env.NODE_ENV || "development").trim();
const hostname = process.env.HOST || "0.0.0.0";
const portnumber = process.env.PORT || 3000;

// SSL configuratie
const sslKeyPath = process.env.SSL_KEY || '/etc/ssl/kps/privkey.pem';
const sslCertPath = process.env.SSL_CERT || '/etc/ssl/kps/fullchain.pem';

if (env === "production" || env === "sandbox") {
  // HTTPS server voor productie
  try {
    const sslOptions = {
      key: fs.readFileSync(sslKeyPath),
      cert: fs.readFileSync(sslCertPath)
    };
    
    https.createServer(sslOptions, app).listen(portnumber, hostname, () => {
      console.log(`HTTPS Server is running on https://${hostname}:${portnumber}/`);
      console.log(`API Documentation: https://${hostname}:${portnumber}/api/docs`);
    });
  } catch (err) {
    console.error('SSL certificaat niet gevonden, start HTTP server:', err.message);
    app.listen(portnumber, hostname, () => {
      console.log(`HTTP Server is running on http://${hostname}:${portnumber}/`);
    });
  }
} else {
  // HTTP server voor development
  app.listen(portnumber, hostname, () => {
    console.log(`Server is running on http://${hostname}:${portnumber}/, For documentation and testing http://${hostname}:${portnumber}/api/docs`);
  });
}

module.exports = app;
