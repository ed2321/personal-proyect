const mongodb = require('@condor-labs/mongodb')();
import { clients } from '../helpers/mongodb';
import { CONNECTION_NAMES } from '../utils/constants';
const dbConnection = clients[CONNECTION_NAMES.DEFAULT_DB];

const schemaDefinition = {
  username: { type: String },
  email: { type: String },
  password: { type: String },
};

let schema = new mongodb.mongoose.Schema(schemaDefinition, {
  timestamps: {
    createdAt: 'createdDate',
    updatedAt: 'updatedDate',
  },
});
let userModel = dbConnection.model('User', schema);

module.exports = userModel;
