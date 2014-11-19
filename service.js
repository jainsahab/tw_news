var fs = require('fs');

var gfeed = require('google-feed-api');

var service = {};
var MAX_ITEMS = 50;
var config = JSON.parse(fs.readFileSync('config.json'));

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