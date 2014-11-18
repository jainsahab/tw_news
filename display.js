
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

var getHtmlFor = function(feed){
	return '<div class="slide">' + 
			'<div class="title"><span>' + feed.title + '</span></div>' +
			'<div class="date"><span>' + feed.publishedDate + '</span></div>' +
			'<div class="content">' + feed.content + '</div>' +
			'<div class="link">' + feed.link + '</div>' +			
			 "</div>";
}

var startMove = function(){
	var fathom = new Fathom('#presentation');
	setInterval(function(){
		var result = fathom.nextSlide();
		if(result.length == 0) fathom.scrollToSlide(fathom.$firstSlide);
	}, 5000);
}


var display = function(sortedFeeds, isLastCategory){
	if ( sortedFeeds.length == 0) return;

	sortedFeeds.forEach(function (feed) {
		$("#presentation").append(getHtmlFor(feed));
	});

	if(isLastCategory) startMove();

};

var sortAndDisplayFeeds = function (allFeeds) {
	Object.keys(allFeeds).forEach(function(categoryName, index, arr){
		var category = allFeeds[categoryName];
		var sortedFeeds = getAllFeedFor(category).map(getOnlyNecessaryFields).sort(sorter);
		display(sortedFeeds.slice(0,10), index == arr.length-1)
	})
}

