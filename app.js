var express = require('express');
var service = require('./service.js').service;
var app = express()


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/scripts/:name', function(req, res){
	res.sendFile(__dirname + '/scripts/'+ req.params.name);
});

app.get('/scripts/services/:name', function(req, res){
  res.sendFile(__dirname + '/scripts/services/'+ req.params.name);
});

app.get('/stylesheets/:name', function(req, res){
	res.sendFile(__dirname + '/stylesheets/'+ req.params.name);
});

app.get('/images/:name', function(req, res){
	res.sendFile(__dirname + '/images/'+ req.params.name);
});


app.get('/events', function(req, res){
	var jsonSender = function(jsonData){
		res.json(jsonData);
	}
	if(req.query.date){
		service.loadFeedNewerThan(new Date(+req.query.date), jsonSender);
		return;
	}
	service.loadAllFeeds(jsonSender);
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Event app listening at http://%s:%s', host, port)

})