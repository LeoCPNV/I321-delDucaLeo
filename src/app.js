// app.js
const express = require('express');
const morgan = require('morgan');
const router = require('./routes/router');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// API routes
app.use('/api/v1', router);

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/docs/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// basic health-check
app.get('/', (req, res) => res.json({ status: 'ok' }));

// error handler (fallback)
app.use(errorHandler);

module.exports = app;
