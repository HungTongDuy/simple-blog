const path = require('path');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { DATABASE_LOCAL, CLOUD_NAME, API_KEY, API_SECRET } = require('./config');

const port = process.env.PORT || 8000;

mongoose.promise = global.Promise;

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'LightBlog',
    cookie: {
        maxAge: 60000
    },
    resave: false,
    saveUninitialized: false
}));

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
})

if (!isProduction) {
    app.use(errorHandler());
}

//mongoose.connect(DATABASE_LOCAL, { useNewUrlParser: true });
//mongoose.connect(DATABASE_LOCAL);

mongoose.connect(DATABASE_LOCAL, {
    //useMongoClient: true,
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

mongoose.set('debug', true);

// Add models
require('./models/Article');
require('./models/User');
require('./models/UsersPasswords');
// Add routes
app.use(require('./routes'));

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (!isProduction) {
    app.use((err, req, res) => {
        res.status(err.status || 500);

        res.json({
            errors: {
                message: err.message,
                error: err,
            },
        });
    });
}

app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
        errors: {
            message: err.message,
            error: {},
        },
    });
});

app.all('/*', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin: *');
    res.setHeader('Access-Control-Allow-Credentials: true');
    res.setHeader('Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers: accept, content-type, x-xsrf-token, x-csrf-token, authorization');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

// **************
//  passport
// **************
app.use(session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

const User = mongoose.model('User');
const UsersPasswords = mongoose.model('UsersPasswords');
const passwordHash = require('password-hash');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id).then((user)=> {
        done(null, user);         
    }).catch((err) => {
        console.log(err);
    })
    // db.user.findById(id).then(function (user) {
    //     done(null, user);
    // }).catch(function (err) {
    //     console.log(err);
    // })
});

passport.use('local.signin', new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },
    (email, password, done) => {
        console.log('authen');
        User.find({ email : email })
        .then((user)=> {
            console.log('userInfo-------------------', user);
            if(!passwordHash.verify(password, user.password)) {
                return done(null, false, { message: 'Incorrect email and password' });
            } else {
                return done(null, user);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
))


const server = app.listen(port, () => console.log('Server started on http://localhost:' + port));
