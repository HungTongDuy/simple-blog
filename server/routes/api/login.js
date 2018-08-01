const router = require('express').Router();
const passport = require('passport');
// router.get('/', (req, res) => {
//     res.render('login', {
//         'title': 'Log in'
//     })
// })

router.post('/', passport.authenticate('local.login', { successRedirect: '/', failureRedirect: '/login' }));

module.exports = router;