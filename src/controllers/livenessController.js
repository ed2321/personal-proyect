const { hostname } = require('os');
const mongoHelper = require('../helpers/mongodb');
const logger = require('@condor-labs/logger');

const getStatus = async (_req, res) => {
  try {
    let mongo = 'Mongo database service is not running';
    await mongoHelper.connect().then(async () => {
      mongo =
        Object.keys(mongoHelper.clients).length === 0
          ? 'Mongo database service is not running'
          : 'Mongo database service is running';
    });
    return res.send({
      services: {
        'personal-project-api': `Personal api service is running`,
        'service-mongo': mongo,
      },
      hostname: hostname(),
    });
  } catch (error) {
    logger.error(error);
    return res.status(503).send({ error: error.message });
  }
};
module.exports = { getStatus };
