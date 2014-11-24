var fs = require('fs');

var request = require('request');
var parser = require('xml2json');

var service = {};
var MAX_ITEMS = 50;
var config = JSON.parse(fs.readFileSync('config.json'));

var standardStructure = function(allFeeds){
	allFeeds.forEach(function(feed){
		feed['publishedDate'] = feed['publishedDate'] ? feed['publishedDate'] : feed['pubDate'];
		feed['content'] = feed['content'] ? feed['content'] : feed['content:encoded'];
	})
	return allFeeds;
}

service.loadAllFeeds = function(callBack){
	var allFeeds = [];
	var count = 0;

	config.feedUrls.forEach(function(url, index, arr){
		request(url, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    var items = parser.toJson(body, {sanitize: false, object : true}).rss.channel.item;
		    allFeeds = allFeeds.concat(items);
		    if(arr.length == ++count) callBack(standardStructure(allFeeds));	
		  }
		})
	});
}

service.loadFeedNewerThan = function(date, jsonSender){
	var filterNewFeeds = function(feeds){
		var newFeeds = feeds.filter(function(feed){
			var feedDate = new Date(feed.publishedDate);
			if(feedDate > date)
				return feed;
		})
		jsonSender(newFeeds);
	}
	service.loadAllFeeds(filterNewFeeds);
}


exports.service = service;