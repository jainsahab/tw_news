var _   = require('underscore');
var _db = require('underscore-db');
_.mixin(_db);

var service = {};
var db;

var loadDB = function(){
	db = _.load();
}

var saveEvent = function(event){
	_.insert(db.events, event);
	_.save(db);
}

service.postEvent = function(event){
	loadDB();
	event.publishedDate = new Date();
	saveEvent(event);
}


exports.service = service;