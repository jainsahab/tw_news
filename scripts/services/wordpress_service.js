var WordpressService = {
	fetch: function(successCallback){
		var getEventsUrl = "http://" + window.location.host + "/events";
		$.ajax({url : getEventsUrl, success : successCallback});
	},
	fetchNewFeeds: function(successCallback, dataParams){
    	var getEventsUrl = "http://" + window.location.host + "/events";
    	$.ajax({url : getEventsUrl, data : dataParams, success : successCallback});
	}
};