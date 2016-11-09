var express = require('express')
var app = express()
var databaseUrl = "mongodb://localhost:27017/urldb";
var mongojs = require("mongojs");
var db = mongojs("urldb", ["urls"]);


app.get('/new/:long', function (req, res) {
  //Get the last short url from the db
　　var short
  var cursor = db.urls.find(function (err, docs){
	docs.sort({short: -1});　// This is not actually sorting because it's an array function, not mongo
　　　　　　　　short = docs[0].short　+ 1;
	//Insert the short and long urls into the db
  	db.urls.insert({longurl: req.params.long, short: short});

  	//display the information in JSON format
  	res.send(JSON.stringify({long: req.params.long, short: short}));
  });
});

app.get('/:short', function (req, res) {
　　console.log('short');
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
