var Slideshow = {


  render : function(slide){
    Display.putPage();
    Display.putTitle(slide.title);
    Display.putDate(slide.publishedDate);
    Display.putContent(slide.content);
    Display.removePage();
  },

  init: function(){
    var _this = this;
    _this.slides = [];
    WordpressService.fetch(function(feeds){
      feeds.forEach(function(feed){
        var slide = new Slide(feed);
        _this.slides.push(slide);
      });
      _this.sortSlides();
      _this.start();
    });
  },

  start: function(){
    var slides = this.slides;
    var index = 0;
    var _this = this;
    setInterval(function(){
      _this.render(slides[index]);
      index = (index + 1) % slides.length;
    }, 5000);
  },

  sortSlides: function(){
    this.slides = this.slides.sort(function(first,second){
      var firstDate = new Date(first.publishedDate);
      var secondDate = new Date(second.publishedDate);
      return secondDate - firstDate;
    });
  }
};