
var sorter = function(first,second){
	var firstDate = new Date(first.publishedDate);
	var secondDate = new Date(second.publishedDate);
	return secondDate - firstDate;
}

var getAllFeedFor = function(category){
	if(category.feeds.length <= 1) return category.feeds;
	return category.feeds.reduce(function(pv, cv){
		return pv.responseData.feed.entries.concat(cv.responseData.feed.entries)
	});
}

var deleteUnnecessaryFields = function(feed){
	var unNecessaryFields = ["author", "contentSnippet", "categories"];
	unNecessaryFields.forEach(function(field){
		delete feed[field];
	})
	return feed;
}

var sortAndDisplayFeeds = function (allFeeds) {
	for (categoryName  in allFeeds){
		var category = allFeeds[categoryName];
		var sortedFeeds = getAllFeedFor(category).map(deleteUnnecessaryFields).sort(sorter);
		display(sortedFeeds.slice(0,10), categoryName)
	}
}

var getHtmlFor = function(feed){
	return '<div class="feed">' + 
			feed.title + "<br>" +
			feed.link + "<br>" +
			feed.publishedDate + "<br>" +
			feed.content +
			 "</div>";
}

var display = function(sortedFeeds, categoryName){
	var headingHtml = '<div id="'+categoryName+'"><div class = "heading">' + categoryName + '</div></div>';
	$("#container").append(headingHtml)

	sortedFeeds.forEach(function (feed) {
		$("#"+categoryName).append(getHtmlFor(feed));
	})
};	

$( document ).ajaxComplete(function() {
	$("#container").empty();
  	sortAndDisplayFeeds(feeds);
});