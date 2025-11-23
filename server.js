var express = require('express');
var createError = require('http-errors');
var logger = require('morgan');
var cors = require('cors');

var db = require('./config/db');

var indexRouter = require('./app/routers/index');
var userRouter = require('./app/routers/users');
var contactRouter = require('./app/routers/contacts');
var projectRouter = require('./app/routers/projects');
var serviceRouter = require('./app/routers/services');

var app = express();

db();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(logger('dev'));
app.use('/', indexRouter);
app.use('/api/users', userRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/projects', projectRouter);
app.use('/api/services', serviceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error json
  res.status(err.status || 500);
  res.json(
    {
      success: false,
      message: err.message
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));

console.log('Server running at http://localhost:3000/');

module.exports = app;