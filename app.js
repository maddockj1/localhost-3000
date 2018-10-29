var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var eventsRouter = require('./routes/events')
var platformsRouter = require('./routes/platforms')
var platformsEventsRouter = require('./routes/platforms_events')
var userEvents = require(`./routes/user_events`)
var eventUsers = require(`./routes/event_users`)
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use('/platforms', platformsRouter);
app.use('/platforms_events', platformsEventsRouter)
app.use('/user_events', userEvents)
app.use(`/event_users`, eventUsers)

module.exports = app;