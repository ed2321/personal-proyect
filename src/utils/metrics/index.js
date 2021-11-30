const metricsHandler = require('@condor-labs/metrics');
const metricsMiddleware = require('@condor-labs/metrics/src/middleware/express');
const connect = require('./connection');
const metrics = metricsHandler;
const incrementMetrics = (stat, tags) => metricsHandler.increment(stat, tags);
const requestMiddleware = metricsMiddleware.requestMiddleware(metricsHandler);

module.exports = { connect, metrics, incrementMetrics, requestMiddleware };
