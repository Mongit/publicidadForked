var express = require('express');
var router = express.Router();

var serverInfo = { server: process.env.SERVER || 'http://localhost:3000' };

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
      title: "Empresas Uruapan",
      serverInfo: serverInfo
  });
});

module.exports = router;
