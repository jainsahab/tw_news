var WordpressService = {
  fetch: function(successCallback){
    var getEventsUrl = "http://" + window.location.host + "/events";
    $.ajax({url : getEventsUrl, success : successCallback});
  }
};