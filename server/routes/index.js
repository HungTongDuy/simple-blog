const express = require('express');
const router = express.Router();
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

router.use('/api', function(req, res, next) {
	console.log('x-access-token');
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, 'superSecret', function(err, decoded) {			
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;	
				next();
				//require('./api');
			}
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
		
	}
	
});

router.use('/api', require('./api'));

router.use('/authenticate', function(req, res) {
	console.log('authenticate');
	// find the user
	// User.findOne({
	// 	name: req.body.name
	// }, function(err, user) {

		// if (err) throw err;

		// if (!user) {
		// 	res.json({ success: false, message: 'Authentication failed. User not found.' });
		// } else if (user) {

			// check if password matches
			// if (user.password != req.body.password) {
			// 	res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			// } else {

				// if user is found and password is right
				// create a token
				var load = {
					admin: 'user.admin',
					name: 'HungTong'
				}
				var token = jwt.sign(load, 'superSecret', {
					expiresIn: 3600 //expiresIn: 86400 // expires in 24 hours
				});

				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			//}		

		//}

	//});
});

module.exports = router;