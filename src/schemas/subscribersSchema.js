const joi = require('joi');

const subscriberSchema = {
  body: joi.object().keys({
    name: joi.string().required(),
    email: joi.string().email().required(),
  }),
};

module.exports = subscriberSchema;
