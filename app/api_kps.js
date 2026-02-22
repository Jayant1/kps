const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const path = require("path");
const os = require("os");

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
    servers: []
  },
  apis: [path.join(__dirname, 'routes', '*.js')] // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI endpoint - dynamische server URL gebaseerd op inkomend request
app.use('/api/docs', swaggerUi.serve, (req, res, next) => {
  const protocol = req.protocol;
  const host = req.get('host');
  const dynamicSpec = Object.assign({}, swaggerSpec, {
    servers: [{ url: `${protocol}://${host}`, description: 'Huidige omgeving' }]
  });
  swaggerUi.setup(dynamicSpec)(req, res, next);
});

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
const hostname = process.env.HOST || "localhost";
const portnumber = process.env.PORT || 3000;
const prod_hostname = os.hostname() + ".gov.sr";

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
    
    https.createServer(sslOptions, app).listen(portnumber, () => {
      console.log(`HTTPS Server is running on https://${prod_hostname}:${portnumber}/`);
      console.log(`API Documentation: https://${prod_hostname}:${portnumber}/api/docs`);
    });
  } catch (err) {
    console.error('SSL certificaat niet gevonden, start HTTP server:', err.message);
    app.listen(portnumber, () => {
      console.log(`HTTP Server is running on http://${prod_hostname}:${portnumber}/`);
    });
  }
} else {
  // HTTP server voor development
  app.listen(portnumber, hostname, () => {
    console.log(`Server is running on http://${hostname}:${portnumber}/, For documentation and testing http://${hostname}:${portnumber}/api/docs`);
  });
}

module.exports = app;
