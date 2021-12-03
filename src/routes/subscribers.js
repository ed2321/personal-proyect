const express = require('express');
const subscribers = require('../controllers/subscribersController');

const api = express.Router();

api.get('/', subscribers);
api.get('/:id', subscribers);
api.post('/', subscribers.saveSubscriber);
api.put('/:id', subscribers);
api.delete('/:id', subscribers);

module.exports = api;
