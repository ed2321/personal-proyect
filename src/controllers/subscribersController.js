const subscribersModel = require('../models/subscribers');

async function saveSubscriber(req, res, next) {
  console.log(req, res, next);
  const t = await subscribersModel.create({
    email: req.body.email,
    name: req.body.name,
  });
  return res.status(200).send('holaa');
}

module.exports = { saveSubscriber };
