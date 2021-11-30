const express = require('express');
const liveness = require('../controllers/livenessController');

const api = express.Router();

api.get('/', liveness.getStatus);


module.exports = api;
