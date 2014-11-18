
var sorter = function(first,second){
	var firstDate = new Date(first.publishedDate);
	var secondDate = new Date(second.publishedDate);
	return secondDate - firstDate;
}

var getAllFeedFor = function(category){
	if(category.feeds.length == 0) return [];
	if(category.feeds.length == 1) return category.feeds[0].responseData.feed.entries;
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

var getOnlyNecessaryFields = function(feed){
	var feedCopy = {};
	var necessaryFields = ["title", "link", "publishedDate", "content"];
	necessaryFields.forEach(function(field){
		feedCopy[field] = feed[field];
	})
	return feedCopy;
}

var sortAndDisplayFeeds = function (allFeeds) {
	for (categoryName  in allFeeds){
		var category = allFeeds[categoryName];
		var sortedFeeds = getAllFeedFor(category).map(getOnlyNecessaryFields).sort(sorter);
		display(sortedFeeds.slice(0,10), categoryName)
	}
}

var getHtmlFor = function(feed){
	return '<li>'+
			'<div class="feed">' + 
			feed.title + "<br>" +
			feed.link + "<br>" +
			feed.publishedDate + "<br>" +
			// feed.content +
			 "</div>"+
			 "</li>";
}

var display = function(sortedFeeds, categoryName){
	if ( sortedFeeds.length == 0) return;
	var headingHtml =	'<div class="feed-container">' + 
							'<div class = "heading">' + 
								categoryName + 
							'</div>' + 
							'<div id="'+categoryName+'" class="feed-scroller">' +
								'<ul></ul>' +
							'</div>' + 
						'</div>';
	$("#container").append(headingHtml)

	categoryName = categoryName.replace(/ /g, "\\ ");
	sortedFeeds.forEach(function (feed) {
		$("#"+categoryName+" ul").append(getHtmlFor(feed));
	});

	$("#"+categoryName).vTicker({showItems : 1});

};