const express = require('express');
const { userRoutes, livenessRoutes } = require ('./index.js');


const router = express.Router();

router.use('/users', userRoutes);
router.use('/', livenessRoutes);


module.exports = router;
