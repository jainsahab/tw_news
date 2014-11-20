var Slideshow = {
  putPage : function(){
      var slide = document.createElement("div")
      slide.className = "slide-area"
      document.body.appendChild(slide)
      return slide;
  },

  removePage : function(){
    setTimeout(function(){
      $(".slide-area").remove();  
    }, 3000);
    
  },

  putTitle : function(title){
    var divHtml = '<div class="title"><span>' + title + '</span></div>';
    $(".slide-area").append(divHtml);
  },

  putContent : function(content){
    var div = document.createElement("div");
    div.className = "content";
    div.innerHTML = content;
    $(".slide-area").append(div);
  },

  putDate : function(date){
    var divHtml = '<div class="date"><span>' + date + '</span></div>';
    $(".slide-area").append(divHtml);
  },


  render : function(slide){
    this.putPage();
    this.putTitle(slide.title);
    this.putDate(slide.publishedDate);
    this.putContent(slide.content);
    this.removePage();
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
    }, 4000);
  },

  sortSlides: function(){
    this.slides = this.slides.sort(function(first,second){
      var firstDate = new Date(first.publishedDate);
      var secondDate = new Date(second.publishedDate);
      return secondDate - firstDate;
    });
  }
};