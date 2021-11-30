const { MONGO_DB_SETTINGS } = require ('../../utils/constants');
const mongo = require('@condor-labs/mongodb')(MONGO_DB_SETTINGS);
//implementar joi para parametros obligatorios

const mongoDBHelper = {
  clients: {},
  isConnected: (connectionName) => {
    return mongo._isConnected(connectionName);
  },
  connect: async () => {
    for (const item of MONGO_DB_SETTINGS) {
      const client = await mongo.getClient(item.connectionName);
      mongoDBHelper.clients[item.connectionName] = client;
    }
  },
};

module.exports = mongoDBHelper;
