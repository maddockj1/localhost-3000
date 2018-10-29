var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


//passport required things for oAuth
const passport = require('passport');
const cookieSession = require('cookie-session')
const twitchStrategy = require('passport-twitch').Strategy;

//auth secrects/ids and function when it happens.
passport.use(new twitchStrategy({
  clientID: 'qocfwoezpv67e55q622vcwzi17esta',
  clientSecret: 'tstttnp86ibb70ks4vw1ewxj1nmzdp',
  callbackURL: "http://localhost:3000/auth/twitch/callback",
  scope: "user_read"
}, function(accessToken, refreshToken, profile, done) {
  // need to figure out how to ass the profile.id to create a user
  User.findOrCreate({
    twitchId: profile.id
  }, function(err, user) {
    return done(err, user);
  });
}));


app.get("/auth/twitch", passport.authenticate("twitch"));

app.get("/auth/twitch/callback", passport.authenticate("twitch", {
  failureRedirect: "/"
}), function(req, res) {
  // Successful authentication, redirect home.
  res.redirect("/");
});
//this wires up passort's session code to your session
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
