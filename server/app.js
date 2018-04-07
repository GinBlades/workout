const createError = require('http-errors');
const express = require('express');
const cors = require("cors");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const session = require("express-session");

const jwt = require("jsonwebtoken");
const secrets = require("./secrets.js");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const workoutsRouter = require('./routes/workouts');
const loginRouter = require("./routes/login");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: secrets.sessionSecret
}));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// Authentication middleware
app.use((req, res, next) => {
  if (req.url.startsWith("/login") || req.url === "/") {
    return next();
  }

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    const token = req.headers.authorization.substring("Bearer ".length);
    const decoded = jwt.verify(token, secrets.jwtSecret);
    if (secrets.mockEmails.includes(decoded.email)) {
      return next();
    } else {
      return res.json({error: "Invalid JWT"});
    }
  }
  res.json({error: "Unauthorized"});
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/workouts', workoutsRouter);
app.use("/login", loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
