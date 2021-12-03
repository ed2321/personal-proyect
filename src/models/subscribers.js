const mongodb = require('@condor-labs/mongodb')();
const { clients } = require('../helpers/mongodb');
const { CONNECTION_NAMES } = require('../utils/constants');
const dbConnection = clients[CONNECTION_NAMES.DEFAULT_DB];

const schemaDefinition = {
  name: { type: String },
  email: { type: String },
};

const Subscriberschema = new mongodb.mongoose.Schema(schemaDefinition, {
  timestamps: {
    createdAt: 'createdDate',
    updatedAt: 'updatedDate',
  },
});
const subscriberModel = dbConnection.model('Subscribers', Subscriberschema);

module.exports = subscriberModel;
