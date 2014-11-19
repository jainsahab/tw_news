var express = require('express');
var bodyParser = require('body-parser');
var service = require('./service.js').service;
var app = express()

app.use(bodyParser());

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

app.get('/scripts/:name', function(req, res){
	res.sendFile(__dirname + '/scripts/'+ req.params.name);
})

app.get('/stylesheets/:name', function(req, res){
	res.sendFile(__dirname + '/stylesheets/'+ req.params.name);
})

app.post('/post-event', function(req, res){
	service.postEvent(req.body);
})


var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Event app listening at http://%s:%s', host, port)

})