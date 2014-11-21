var Display = {
  putPage : function(){
  	var slide = document.createElement("div")
	slide.className = "slide-area"
	document.body.appendChild(slide)
	return slide;
  },

  removePage : function(){
    setTimeout(function(){
      $(".slide-area").remove();  
    }, 4000);
    
  },

  putTitle : function(title){
    var divHtml = '<div class="title"><span>' + title + '</span></div>';
    $(".slide-area").append(divHtml);
  },

  putContent : function(content){
    var divHtml = '<div class="content">' + myParser(myParser(content)) + '</div>';
    $(".slide-area").append(divHtml);
  },

  putDate : function(date){
    var divHtml = '<div class="date"><span>' + date + '</span></div>';
    $(".slide-area").append(divHtml);
  }
};
var sorter = function(first,second){
	var firstDate = new Date(first.publishedDate);
	var secondDate = new Date(second.publishedDate);
	return secondDate - firstDate;
}


var getOnlyNecessaryFields = function(feed){
	var feedCopy = {};
	var necessaryFields = ["title", "link", "publishedDate", "content"];
	necessaryFields.forEach(function(field){
		feedCopy[field] = feed[field];
	})
	return feedCopy;
}


var myParser = function(aString){
	var div = document.createElement("div");
	div.innerHTML = aString;
	return div.innerText
};

var getHtmlFor = function(feed){
	return '<div class="slide">' + 
			'<div class="title"><span>' + feed.title + '</span></div>' +
			'<div class="date"><span>' + feed.publishedDate + '</span></div>' +
			'<div class="content">' + myParser(myParser(feed.content)) + '</div>' +
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


var display = function(sortedFeeds){
	if ( sortedFeeds.length == 0) return;

	sortedFeeds.forEach(function (feed) {
		$("#presentation").append(getHtmlFor(feed));
	});

	startMove();

};

var sortAndDisplayFeeds = function (allFeeds) {
	var sortedFeeds = allFeeds.map(getOnlyNecessaryFields).sort(sorter);
	display(sortedFeeds)
}

