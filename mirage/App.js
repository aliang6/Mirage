const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const Messages = require('./models/messages');

var app = express();

require('dotenv').config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Setup
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const messages = new Messages(
  {
    name: 'TestBot',
    messages: [{ 
      _id: 1,
      text: 'Hello friend',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://www.ikea.com/PIAimages/0129203_PE283223_S5.JPG',
      },
    }]
  }
);

/* messages.save(function(err, messages) {
  if(err) console.log(err);
}); */

Messages.findOne({ name: 'TestBot' }, function(err, messages) {
  if (err) console.log(err);
  else {
    console.log(messages);
  }
});


/* var access_token = '';

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
}); */

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