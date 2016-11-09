var express = require('express')
var app = express()
var databaseUrl = "mongodb://localhost:27017/urldb";
var mongojs = require("mongojs");
var db = mongojs("urldb", ["urls"]);


app.get('/new/:long', function (req, res) {
  //Get the last short url from the db
　　var short
  db.urls.find(function (err, docs){
	
	var largest = docs.reduce(function(a,b){
	  if(b.short > a.short){
		return b;		
	  } else {
	  return a;
	  }
	});
	console.log(largest);
　　　　　　　　short = largest.short　+ 1;

	//Insert the short and long urls into the db
  	db.urls.insert({longurl: req.params.long, short: short});

  	//display the information in JSON format
  	res.send(JSON.stringify({long: req.params.long, short: short}));
  });
});

app.get('/sh/:short', function (req, res) {
  //Get the corresponding long url from the db
  db.urls.findOne({short: parseInt(req.params.short)}, function(err, docs) {
	console.log(docs);
        var long = "http://baidu.com";

  	//Redirect to the long url
	res.redirect(long);
  });
  
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
