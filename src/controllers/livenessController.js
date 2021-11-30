const { hostname } = require('os');
// const mongoHelper = require('../helpers/mongodb');
const logger = require('@condor-labs/logger');
// const { MONGO_DB_SETTINGS } = require('../utils/constants');

const getStatus = async (_req, res) => {
  try {
    // mongoHelper.connect().then(async () => {
    //   const mongo = mongoHelper.clients;
    //   console.log(mongo)
    // });
    return res.send({
      services: {
        'personal-project-api': `Personal api service is still running`,
        mongo: 'mongo',
      },
      hostname: hostname(),
    });
  } catch (error) {
    logger.error(error);
    return res.status(503).send({ error: error.message });
  }
};
module.exports = { getStatus };
