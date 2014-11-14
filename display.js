
var sorter = function(first,second){
	var firstDate = new Date(first.publishedDate);
	var secondDate = new Date(second.publishedDate);
	return secondDate - firstDate;
}

var getAllFeedFor = function(category){
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
		display(sortedFeeds, categoryName)
	}
}

var display = function(sortedFeeds, categoryName){
	
	document.write('<br></br><h4>' + categoryName + '</h4>');				
	sortedFeeds.forEach(function (feed) {
		document.write(JSON.stringify(feed));
		document.write('<br></br>');
	})
};	
sortAndDisplayFeeds(dummyFeeds);
