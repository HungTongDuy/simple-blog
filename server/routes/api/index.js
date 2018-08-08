const router = require('express').Router();
const passport = require('passport');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

router.use('/articles', require('./articles'));
router.use('/user', require('./user'));
router.use('/signin', require('./signin'));



module.exports = router;