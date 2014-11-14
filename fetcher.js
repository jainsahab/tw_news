var feeds = {};	
var googleFeedApiUrl = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q=";


var fetchCategories = function(categories){
	for (var categoryName in categories){
		var category = categories[categoryName];
		feeds[categoryName] = {feeds : []};

		category.forEach(function(feedDetail){
			function getFeedFor(categoryName){
				downLoadJsonFrom(googleFeedApiUrl + feedDetail.url, "jsonp", function(feed){ 
					feeds[categoryName].feeds.push(feed); 
				});
			}
			getFeedFor(categoryName)
		});

	}
};

var downLoadJsonFrom = function(url, dataType, success){
	$.ajax({url : url, dataType: dataType, success : success})
}



var gistUrl = "https://gist.githubusercontent.com/jainsahab/aab127d9cc1a0ec7e90e/raw/a84640ca9c70ac73c61ea206a54e9e8843a07f0f/feeds-details"
downLoadJsonFrom(gistUrl, "json", fetchCategories)