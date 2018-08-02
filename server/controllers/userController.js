const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const User = mongoose.model('User');
const UsersPasswords = mongoose.model('UsersPasswords');
const passwordHash = require('password-hash');

module.exports = {
    addUser: (req, res, next) => {
        if (req.body.hasOwnProperty('provider_id')) {
            console.log('provider_id');
            User.find({ provider_id : req.body.provider_id })
            .exec((err, user)=> {
                console.log('user-----', user);
                if (err) {
                    res.send(err);
                } else if (user.length == 0) {
                    console.log('!!!user');
                    new User(req.body).save((err, newUser) => {
                        if (err)
                            return res.send(err)
                        else if (!newUser)
                            return res.send(400)
                        else {
                            console.log('newUser');
                            return res.send(newUser)
                        }
                    });
                } else {
                    console.log('user-409');
                    res.status(200).send(user[0]);
                }
                //next()      
            })
        } else {
            console.log('none provider_id');
            if(req.body.hasOwnProperty('password')) {
                req.body.password = passwordHash.generate(req.body.password);
            }
            new User(req.body).save((err, newUser) => {
                if (err)
                    res.send(err)
                else if (!newUser)
                    res.send(400)
                else
                    res.send(newUser)
            });
        }
    },
    getUser: (req, res, next) => {
        User.findById(req.params.id).then
        /*populate('following').exec*/((err, user)=> {
            console.log('id', req.params.id);
            if (err)
                res.send(err)
            else if (!user)
                res.send(404)
            else {
                res.send(user);
                //res.send(user);
            }
            next()            
        })
    },
    getAllUser: (req, res, next) => {
        User.find({})
        .exec((err, users) => {
            if (err)
                res.send(err)
            else if (!users)
                res.send(404)
            else
                res.send(users)
            next() 
        })
    },
    /**
     * user_to_follow_id, user_id
     */
    followUser: (req, res, next) => {
        User.findById(req.body.id).then((user) => {
            return user.follow(req.body.user_id).then(() => {
                return res.json({msg: "followed"})
            })
        }).catch(next)
    },
    getUserProfile: (req, res, next) => {
        User.findById(req.params.id).then
        ((_user) => {
            return User.find({'following': req.params.id}).then((_users)=>{
                _users.forEach((user_)=>{
                    _user.addFollower(user_)
                })
                return Article.find({'author': req.params.id}).then((_articles)=> {
                    return res.json({ user: _user, articles: _articles })
                })
            })
        }).catch((err)=>console.log(err))
    },
    addUserPassword: (req, res, next) => {
        req.body.password = passwordHash.generate(req.body.password);
        new UsersPasswords(req.body).save((err, newUserPassword) => {
            if(err)
                res.send(err)
            else if (!newUserPassword)
                res.send(400)
            else 
                res.send(newUserPassword)
            next()
        });
    },
    getUserPassword: (req, res, next) => {
        UsersPasswords.find({user : req.params.id})//.then
        .populate('user').exec((err, user)=> {
            if (err)
                res.send(err)
            else if (!user)
                res.send(404)
            else 
                res.send(user)
            next()            
        })
    },
    signIn: (req, res, next) => {
        User.find({ email : req.body.email })
        .exec((err, user)=> {
            if (err) {
                res.send(err);
            } else {
                if(user.length > 0) {
                    if(!passwordHash.verify(req.body.password, user[0].password)) {
                        console.log('Incorrect email and password');
                        res.send(false);
                    } else {
                        console.log('done!!!');
                        res.send(true)
                    }
                } else {
                    res.send(false);
                }
            }
            next();
        })
    }
}