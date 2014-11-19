var fs = require('fs');
var _   = require('underscore');
var _db = require('underscore-db');
_.mixin(_db);

var gfeed = require('google-feed-api');

var service = {};
var db;
var MAX_ITEMS = 50;
var config = JSON.parse(fs.readFileSync('config.json'));

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
	var allFeeds = [];
	var count = 0;

	config.feedUrls.forEach(function(url, index, arr){
		var feed = new gfeed.Feed(url);	
		feed.setNumEntries(MAX_ITEMS);
		feed.listItems(function(items){
			allFeeds = allFeeds.concat(items);
			if(arr.length == ++count) jsonSender(allFeeds);	
		});
	});
}


exports.service = service;