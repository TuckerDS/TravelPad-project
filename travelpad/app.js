/*jshint esversion: 6*/

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//Routes
const index = require('./routes/index');
const users = require('./routes/users');
const travels = require('./routes/travels');
const app = express();
//layouts
const expressLayouts = require('express-ejs-layouts');

//Mongoose setup
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/travelpad');

//configure layouts
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');


const User       = require("./models/user");

// Requiring Facebook and google account authentication
const FbStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
//Passport
const session       = require("express-session");
const bcrypt        = require("bcrypt");
const passport      = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Express session
app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));
//Passport Methods
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({ "_id": id }, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});
app.use(flash());
passport.use(new LocalStrategy({
  passReqToCallback: true
}, (req, username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));
//Initialization
app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require("./routes/auth-routes");
app.use('/', authRoutes);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use('/', index);
app.use('/users', users);
app.use('/travels', travels);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

passport.use(new FbStrategy({
  clientID: "218306958671094",
  clientSecret: "3fc438cf012ba88d6bb58f33dc23f5fc",
  callbackURL: "http://localhost:3000/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ username: profile._json.name }, (err, user) => {
  if (err) { return done(err); }
  if (user === null){
    var newUser = new User({
      username: profile._json.name,
      facebookID: profile._json.id
    });
    newUser.save((err) => {
      if (err) {return done(err);}
      return done(null, newUser);
    });
  } else {
   done(null, user);
   }
  });
}));

passport.serializeUser((user, next) => {
  next(null, user);
});
passport.deserializeUser((user, next) => {
  next(null, user);
});
passport.use(new GoogleStrategy({
  clientID: "668988001147-79dk03fcgu8roq05sd14o9cdgc5h1tnf.apps.googleusercontent.com",
  clientSecret: "wX3HmAMbnufq3B1uekSPRDbR",
  callbackURL: "http://localhost:3000/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
     console.log("hola");
  User.findOne({ googleID: profile.id }, (err, user) => {
    if (user === null){
      var newUser = new User({
        username: profile.emails[0].value,
        googleID: profile.id
      });
      newUser.save((err) => {
        if (err) { return done(err);}
        return done(null, newUser);
      });
    } else {
       done(null, user);
    }
  });
}));

module.exports = app;
