const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const Messages = require('./models/messages');
const cleverbot = require("cleverbot.io");

const app = express();

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


// Cleverbot.io setup
var session_name = '';

var askCB = (message) => {
  return new Promise ((resolve, reject) => {
    bot.setNick(session_name);
    bot.ask(message, (err, response) => {
      if(err) {
        console.log(err); 
        reject('Response error');
      }
      else{
        resolve(response);
      }
    });
  });
};

var bot = new cleverbot(process.env.CB_USER, process.env.CB_KEY);
bot.create((err, sessionName) => {
  if(err) console.log(err);
  else {
    session_name = sessionName;
    bot.setNick(sessionName);
    askCB('Never going to give you up');
  }
});

console.log(session_name);


// POST - Client has sent a message; send response
app.post('/api/ask', (req, res) => {
  console.log('Message sent');
  const message = req.body.message.text;
  askCB(message).then((response) => {
    console.log(response);
    res.send({ response: response });
    

  }).catch((err) => {
    console.log(err);
    res.send({ response: err });
  });
});

// POST - Return past messages array
app.post('/api/past-messages', (req, res) => {
  console.log('Past messages requested');
  Messages.findOne({ name: 'TestBot' }, (err, response) => {
    if (err) console.log(err);
    else {
      console.log(response);
      console.log(response.messages);
      res.send(response.messages);
    }
  });
});

// POST - Save new messages array
app.post('/api/save-messages', (req, res) => {
  console.log('Saving new messages');
  const messages = req.body.messages;
  console.log(messages);
  Messages.findOneAndUpdate({ name: 'TestBot' }, {"messages": messages}, (err, response) => {
    if (err) console.log(err);
    else {
      console.log(response);
    }
  });
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

  res.status(err.status || 500);
  console.log('error');
});

const port = process.env.PORT || 4000;
app.listen(port);