'use strict';

require('dotenv').config();
const express = require('express');
const logger = require('@condor-labs/logger');
const apiRestRoutes = require('./routes/routes.js');
const { NODE_ENV, HOST, PORT } = process.env;
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  next();
});

app.use(async (error, req, res, next) => {
  logger.error(
    JSON.stringify({
      method: req.method,
      url: req.url,
      error: {
        message: error.message,
        stack: error.stack,
      },
      params: req.params,
      headers: req.headers,
      querys: req.query,
    })
  );
  try {
    return res.status(500).send({ errors: [{ message: error.message }] });
  } catch (error) {
    return next(error);
  }
});

app.use('', apiRestRoutes);
app.listen(PORT, HOST);
logger.log(`Running ${NODE_ENV} environment on http://${HOST}:${PORT}`);

module.exports = app;
