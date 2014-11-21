var Display = {


	moveHandWithElement : function(handId, element, start, destination){
		element.css({left: start.left+"px", top: start.top+"px"})
				.animate({ left : destination.left+"px", top : destination.top+"px"}, {duration : 2000});

		$("#"+handId).show().css({left: start.left+"px", top: start.top+"px"})
				.animate({ left : destination.left+"px", top : destination.top+"px"}, {duration : 2000});

		$("#"+handId).show().animate({ top : $(window).height()+"px"}, {duration : 1000, complete : function(){ this.remove(); }});
		
				
	},

	putPage : function(){
	    $('body').append("<img id='left' src='/images/left.png'></img>");
	    $('body').append("<img id='right' src='/images/right.png'></img>");
	  	var slide = document.createElement("div")
		slide.className = "slide-area"
		document.body.appendChild(slide)
		var slide_ara_width = $(".slide-area").outerWidth()
		var slide_ara_height = $(".slide-area").outerHeight()
		var window_height = $(window).height()
		var window_width = $(window).width()

		var start = {left : -slide_ara_width, top : window_height};
		var destination = {
			left : (window_width/2 - slide_ara_width/2), 
			top : (window_height/2 - slide_ara_height/2)
		};
		this.moveHandWithElement('left', $(".slide-area"), start, destination);
		return slide;
  	},

	removePage : function(){
		setTimeout(function(){
		  $(".slide-area").remove();  
		}, 9000);
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

