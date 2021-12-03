const mongodb = require('@condor-labs/mongodb')();
const { clients } = require('../helpers/mongodb');
const { CONNECTION_NAMES } = require('../utils/constants');
const dbConnection = clients[CONNECTION_NAMES.DEFAULT_DB];

const schemaDefinition = {
  username: { type: String },
  email: { type: String },
  password: { type: String },
};

const schema = new mongodb.mongoose.Schema(schemaDefinition, {
  timestamps: {
    createdAt: 'createdDate',
    updatedAt: 'updatedDate',
  },
});
const userModel = dbConnection.model('User', schema);

module.exports = userModel;
