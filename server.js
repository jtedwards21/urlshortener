var express = require('express')
var app = express()
var databaseUrl = "mongodb://localhost:27017/urldb";
var mongojs = require("mongojs");
var db = mongojs("urldb", ["urls"]);


app.get('/new/:long', function (req, res) {
  //Get the last short url from the db
  var cursor = db.urldb.find().sort({short: -1});
  console.log(cursor);
  var short = 4

  //Insert the short and long urls into the db
  db.urls.insert({longurl: req.params.long, short: short});

  //display the information in JSON format
  res.send(JSON.stringify({long: req.params.long, short: short}));
　　
});

app.get('/:short', function (req, res) {
  //Get the corresponding long url from the db
  var cursor = db.urldb.find({short: req.params.short});
  console.log(cursor);
  var long = "http://baidu.com";

  //Redirect to the long url
  res.redirect(long);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
