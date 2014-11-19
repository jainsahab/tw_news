var Slideshow = {

  init: function(){
    var _this = this;
    _this.slides = [];
    WordpressService.fetch(function(feeds){
      feeds.forEach(function(feed){
        var slide = Slide.init(feed);
        _this.slides.push(slide);
      });
      _this.sortSlides();
      _this.start();
    });
  },

  start: function(){
    this.slides.forEach(function(slide){
      console.log(slide.publishedDate);
    });

    console.log(this.slides);
  },

  sortSlides: function(){
    this.slides = this.slides.sort(function(first,second){
      var firstDate = new Date(first.publishedDate);
      var secondDate = new Date(second.publishedDate);
      return secondDate - firstDate;
    });
  }
};