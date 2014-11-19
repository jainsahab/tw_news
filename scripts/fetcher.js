var getEventsUrl = "http://" + window.location.host + "/events";

var downLoadJsonFrom = function(url, success){
	$.ajax({url : url, success : success})
}

downLoadJsonFrom(getEventsUrl, sortAndDisplayFeeds)

setInterval(function(){
	window.location.reload();
}, 20000);