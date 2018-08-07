var express = require('express');
var router = express.Router();

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
    sent: true,
  };
  console.log(json);
  res.send(json);
});

module.exports = router;
