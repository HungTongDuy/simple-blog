const express = require('express');
const router = express.Router();
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

router.use('/api', require('./api'));

module.exports = router;