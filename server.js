var express = require('express');
var createError = require('http-errors');
var logger = require('morgan');
var cors = require('cors');
require("dotenv").config();

var db = require('./config/db');

var indexRouter = require('./app/routers/index');
var userRouter = require('./app/routers/users');
var contactRouter = require('./app/routers/contacts');
var projectRouter = require('./app/routers/projects');
var serviceRouter = require('./app/routers/services');
var authRouter = require("./app/routers/auth");

var app = express();

db();

// ✅ FIXED CORS (THIS SOLVES YOUR BLOCKING ISSUE)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://assignment-3-frontend-uq2k.onrender.com" // your deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("CORS blocked: Origin not allowed"), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use('/', indexRouter);
app.use('/api/users', userRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/projects', projectRouter);
app.use('/api/services', serviceRouter);
app.use('/api/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    success: false,
    message: err.message
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);

module.exports = app;
