import metricsHandler from '@condor-labs/metrics';
import metricsMiddleware from '@condor-labs/metrics/src/middleware/express';

export { default as connect } from './connection';
export const metrics = metricsHandler;
export const incrementMetrics = (stat, tags) => metricsHandler.increment(stat, tags);
export const requestMiddleware = metricsMiddleware.requestMiddleware(metricsHandler);
export const errorMiddleware = metricsMiddleware.errorMiddleware(metricsHandler);
