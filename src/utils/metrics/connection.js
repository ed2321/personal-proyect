import metrics from '@condor-labs/metrics';
import { hostname } from 'os';
import { APPLICATION_NAME } from '../constants';

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

export default connect;
