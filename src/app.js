'use strict';

require('dotenv').config();
const express = require('express');
const logger = require('@condor-labs/logger');
const apiRestRoutes = require('./routes/routes.js');
const mongoHelper = require('./helpers/mongodb');
const mongodb = require('@condor-labs/mongodb')();
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

// ////
// mongoHelper.connect().then(async () => {
//   const userSchema = new mongodb.mongoose.Schema({
//     user: String,
//     token: String,
//     password: String,
//   });

//   const dbConnection = mongoHelper.clients['engine_v2']; // I got the name of the connection from
//   console.log(dbConnection);
//   dbConnection.model('User', userSchema);
// });

// ///

app.use('', apiRestRoutes);
app.listen(PORT, HOST);
logger.log(`Running ${NODE_ENV} environment on http://${HOST}:${PORT}`);

module.exports = app;
