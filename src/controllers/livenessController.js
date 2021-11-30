const { hostname } = require('os');
const { mongodbHelper } = require('../helpers/mongodb');

const getStatus = async (_req, res) => {
  try {
    // console.log(mongodbHelper.isConnected('engine_v2'));
    const mongodbStatus =
      mongodbHelper.isConnected.readyState === 1 ? 'Mongo connection was success' : 'Could not connect to the service';

    return res.send({
      services: {
        'personal-project-api': `Personal api service is still running`,
        mongo: mongodbStatus,
      },
      hostname: hostname(),
    });
  } catch (error) {
    return res.status(503).send({ error: error.message });
  }
};
module.exports = { getStatus };
