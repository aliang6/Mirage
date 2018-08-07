var express = require('express');
var router = express.Router();

require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  var json = {
    sent: true,
  };
  console.log(json);
  res.send(json);
});

router.post('/', function(req, res, next) {
  var json = {
    app_id: process.env.FB_APP_ID,
  };
  console.log(json);
  res.send(json);
});

module.exports = router;
