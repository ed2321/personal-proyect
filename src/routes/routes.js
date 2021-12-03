const express = require('express');
const { userRoutes, livenessRoutes, subscribersRoutes } = require('./index.js');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/subscribers', subscribersRoutes);
router.use('/', livenessRoutes);

module.exports = router;
