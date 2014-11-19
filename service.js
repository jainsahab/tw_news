var _   = require('underscore');
var _db = require('underscore-db');
_.mixin(_db);

var gfeed = require('google-feed-api');

var service = {};
var db;
var MAX_ITEMS = 50;

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

service.loadAllFeeds = function(jsonSender){
	var feed = new gfeed.Feed('http://www.feedforall.com/sample.xml');
	feed.setNumEntries(MAX_ITEMS);
	feed.listItems(jsonSender);
}


exports.service = service;