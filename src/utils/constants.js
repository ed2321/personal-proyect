const APPLICATION_NAME = 'ec-credentialing-graph-api';

const {
  MONGO_HOST,
  MONGO_PORT,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_REPLICASET,
  MONGO_SSL,
  MONGO_AUTH_SOURCE,
  MONGO_DEFAULT_DATABASE,
} = process.env;

const MONGO_DB_SETTINGS = [
  {
    connectionName: 'engine_v2',
    database: MONGO_DEFAULT_DATABASE,
    host: MONGO_HOST,
    port: MONGO_PORT,
    user: MONGO_USER,
    password: MONGO_PASSWORD,
    replicaSet: MONGO_REPLICASET,
    ssl: !!MONGO_SSL,
    authSource: MONGO_AUTH_SOURCE,
  },
];

const CONNECTION_NAMES = {
  DEFAULT_DB: MONGO_DB_SETTINGS[0].connectionName,
};

const HEALTH_STATUS = {
  PASS: 'pass',
  FAIL: 'fail',
  WARN: 'warn',
};

const COMPONENT_TYPE = {
  SYSTEM: 'system',
  DATASTORE: 'datastore',
  SERVICE: 'service',
};

const UNIT = {
  PERCENT: 'percent',
  MILISECONDS: 'ms',
  CELSIUS: '°C',
};
module.exports = {
  MONGO_DB_SETTINGS,
  HEALTH_STATUS,
  APPLICATION_NAME,
  COMPONENT_TYPE,
  UNIT,
  CONNECTION_NAMES,
};
