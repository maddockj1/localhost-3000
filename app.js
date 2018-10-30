var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let knex = require(`./knex`);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var eventsRouter = require('./routes/events')
var platformsRouter = require('./routes/platforms')
var platformsEventsRouter = require('./routes/platforms_events')
var userEvents = require(`./routes/user_events`)
var eventUsers = require(`./routes/event_users`)
var app = express();


//passport required things for oAuth
const passport = require('passport');
const cookieSession = require('cookie-session')
const twitchStrategy = require('passport-twitch').Strategy;



//auth secrects/ids and function when it happens.
passport.use(new twitchStrategy({
  clientID: 'qocfwoezpv67e55q622vcwzi17esta',
  clientSecret: 'tstttnp86ibb70ks4vw1ewxj1nmzdp',
  callbackURL: "/auth/twitch/callback",
  scope: "user_read"
}, function (accessToken, refreshToken, profile, done) {
  // need to figure out how to asssess the profile.id to create a user
  knex('users')
    .where('username', profile.username)
    .then((rows) => {
      if (rows[0]) {
        done(null, rows[0])
      } else {
        let obj = {
          username: profile.username,
          twitchId: profile.id,
          email: profile.email
        }
        usersRouter.create(obj)
        done(null, obj)
      }
    })
}));

// // set up session cookies
// app.use(cookieSession({
//   maxAge: 24 * 60 * 60 * 1000,
//   keys: [process.env.COOKIE_SECRET]
// }))
app.use(passport.initialize())
// app.use(passport.session())

app.get("/auth/twitch", passport.authenticate("twitch"));
app.get("/auth/twitch/callback", passport.authenticate("twitch", {
  failureRedirect: "/"
}), function (req, res) {
  // Successful authentication, redirect home.
  console.log(req.user);
  res.redirect("/");
})

// this wires up passort's session code to your session
passport.serializeUser(function (user, done) {
  done(null, user.twitchId)
})

passport.deserializeUser(function (id, done) {
  knex('users')
    .where('id', id)
    .then((rows) => {
      console.log(rows);
      done(null, rows[0])
    })
})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter.router);
app.use('/events', eventsRouter);
app.use('/platforms', platformsRouter);
app.use('/platforms_events', platformsEventsRouter)
app.use('/user_events', userEvents)
app.use(`/event_users`, eventUsers)

//Error handling below
app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({
    error: err
  })
})

app.use((req, res, next) => {
  res.status(404).json({
    error: {
      message: 'Not found'
    }
  })
})

module.exports = app;