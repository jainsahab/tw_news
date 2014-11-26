var SLIDE_SWAP_INTERVAL = 32000;
var Slideshow = {


  render : function(slide){
    Display.putPage();
    Display.putTitle(slide.title);
    Display.putDate(slide.publishedDate);
    Display.putContent(slide.content);
    Display.removePage();
  },

  newestFeed : function(){
    return this.slides.reduce(function(previousFeed, currentFeed){
      return new Date(previousFeed.publishedDate) > new Date(currentFeed.publishedDate) ? previousFeed : currentFeed;
    })
  },

  keepFetchingNewFeeds : function(){
    var _this = this;
    setInterval(function(){
      var callBack = function(newFeeds){
        if(newFeeds.length == 0) return;
        _this.sortSlides(newFeeds);
        newFeeds.reverse().forEach(function(feed){ _this.slides.unshift(new Slide(feed)) });
      };
      var newestFeedsDate = new Date(_this.newestFeed().publishedDate).getTime();
      WordpressService.fetchNewFeeds(callBack, {date : newestFeedsDate});
    }, 15000);
  },

  init: function(){
    var _this = this;
    _this.slides = [];
    WordpressService.fetch(function(feeds){
      feeds.forEach(function(feed){
        var slide = new Slide(feed);
        _this.slides.push(slide);
      });
      _this.sortSlides(_this.slides);
      _this.start();
    });
    this.keepFetchingNewFeeds();
  },

  start: function(){
    var slides = this.slides;
    var index = 0;
    var _this = this;
    var startRendering = function(){
      _this.render(slides[index]);
      index = (index + 1) % slides.length;
    }
    startRendering();
    setInterval(startRendering, SLIDE_SWAP_INTERVAL);
  },

  sortSlides: function(slides){
    slides.sort(function(first,second){
      var firstDate = new Date(first.publishedDate);
      var secondDate = new Date(second.publishedDate);
      return secondDate - firstDate;
    });
  }
};