var REMOVE_SLIDE_INTERVAL = 31000;
var Display = {


	moveHandWithElement : function(handId, element, start, destination){
		element.css({left: start.left+"px", top: start.top+"px"})
				.animate({ left : destination.left+"px", top : destination.top+"px"}, {duration : 1500});

		$("#"+handId).show().css({left: start.left+"px", top: start.top+"px"})
				.animate({ left : destination.left+"px", top : destination.top+"px"}, {duration : 1500});

		//remove				
		$("#"+handId).show().animate({ top : $(window).height()+"px"}, {duration : 500, complete : function(){ this.remove(); }});
		
				
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
		setTimeout(removeEvent, REMOVE_SLIDE_INTERVAL);
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
		var newDate = new Date(date);
		var month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var divHtml = '<div class="date"><span>' + newDate.getDate() + " " + month_names[newDate.getMonth()] + " " + newDate.getFullYear() + " " + formatAMPM(newDate) +'</span></div>';
		$(".slide-area").append(divHtml);
	}
};

var formatAMPM = function(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}