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
		// feed['content'] = feed['content'] ? feed['content'] : feed['content:encoded'];
	})
	return allFeeds;
}

service.loadAllFeeds = function(jsonSender){
	var allFeeds = [];
	var count = 0;

	config.feedUrls.forEach(function(url, index, arr){
		request(url, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    var items = JSON.parse(parser.toJson(body), {sanitize: true}).rss.channel.item;
		    allFeeds = allFeeds.concat(items);
		    if(arr.length == ++count) jsonSender(standardStructure(allFeeds));	
		  }
		})
	});
}


exports.service = service;