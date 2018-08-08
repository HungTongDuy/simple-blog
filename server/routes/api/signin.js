const router = require('express').Router();
const passport = require('passport');

router.post('/', passport.authenticate('local.signin'), (req, res) => {
    console.log('signin success', req.user);
    res.send(req.user)
});

module.exports = router;