var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

require('dotenv').config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



var access_token = '';

// Send login app id
app.post('/login', function(req, res, next) {
  var json = {
    app_id: process.env.FB_APP_ID,
  };
  console.log(json);
  res.send(json);
});

// Save access token
app.post('/token', function(req, res, next) {
  access_token = req.body.access_token;
  console.log(access_token);
});


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
  console.log('error');
});

const port = process.env.PORT || 4000;
app.listen(port);