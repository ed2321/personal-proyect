const metrics = require('@condor-labs/metrics');
const { hostname } = require('os');
const { APPLICATION_NAME } = require('../constants');

const { STATSD_HOST, STATSD_PORT, STATSD_JOB, STATSD_INSTANCE } = process.env;

const connect = () => {
  const settings = {
    host: STATSD_HOST,
    port: STATSD_PORT,
    globalTags: {
      instance: STATSD_INSTANCE || hostname(),
      job: STATSD_JOB || APPLICATION_NAME,
    },
  };

  metrics.connect(settings);
};

module.exports = connect;
