const router = require('express').Router();
const passport = require('passport');

router.use('/articles', require('./articles'));
router.use('/user/', require('./user'));

//router.post('/signin', passport.authenticate('local.signin', { successMessage: 'success', failureMessage: 'fail' }));
//router.post('/signin', passport.authenticate('local.signin', { successRedirect: '/', failureRedirect: '/signin' }));


module.exports = router;