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
		var removeEvent = function(){
		  var width = $(window).width();
		  var height = $(window).height();

	  		$("#right").show().css({left: width+"px", top: "0px"})
				.animate({ left : width/2+"px", top : height/2+"px"}, {duration : 500,
					complete : function(){
						$(".slide-area").show().animate({ left : "0px", top : height+"px"}, {duration : 500,
							complete : function(){
								this.remove();
							}});
					}});


	  		$("#right").show().animate({ left : "0px", top : height+"px"}, {duration : 500,
	  			complete : function(){
	  				this.remove();
	  			}
	  		});

		};
		setTimeout(removeEvent, 9000);
	},

	putTitle : function(title){
		var divHtml = '<div class="title"><span>' + title + '</span></div>';
		$(".slide-area").append(divHtml);
	},

	putContent : function(content){
		var divHtml = '<div class="content">' + content + '</div>';
		$(".slide-area").append(divHtml);
	},

	putDate : function(date){
		var divHtml = '<div class="date"><span>' + date + '</span></div>';
		$(".slide-area").append(divHtml);
	}
};