var Slide = function(feed){
    this.title = feed.title;
    this.content = feed.content;
    this.publishedDate = new Date(feed.publishedDate);


    this.isRecentlyCreated = function(){
    	var currentDate = new Date();
    	var timeDiff = Math.abs(currentDate.getTime() - this.publishedDate.getTime());
    	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

       	return diffDays <= 2 && true || false;
  	}

    return this;
}
