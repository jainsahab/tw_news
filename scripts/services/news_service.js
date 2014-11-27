(function($, TWGgnNewsBoardApp) {
    console.log(TWGgnNewsBoardApp);
    var $successCallBack = null,
        $errorCallBack = null,
        $serviceMethodPath = "",
        $serviceInitialized = false,
        $defaultURL = "http://" + window.location.host + "/",
        $serviceURL = "";
    TWGgnNewsBoardApp.newsService = {
        init : function($serviceMethodPath, succesCB, errorCB) {
            if(!$serviceInitialized) {
                $successCallBack = succesCB;
                $errorCallBack = errorCB;
                $serviceMethodPath = serviceMethodPath;
                $serviceURL = $defaultURL + $serviceMethodPath;
                $serviceInitialized = true;
            } else {
                throw new Error("Cannot re-initialize news service. News service already initialized");
            }
        },
        changeServiceMethodPath : function(serviceMethodPath) {
            if($serviceInitialized) {
                $serviceMethodPath = serviceMethodPath;
                $serviceURL = $defaultURL + $serviceMethodPath;
            } else {
                throw new Error("Service not initialized");
            }
        },
        getNewsData : function() {
            if($serviceInitialized) {
                $.ajax({
                    url : $defaultURL,
                    success : $successCallBack
                }).error($errorCallBack);
            } else {
                throw new Error("Service not initialized");
            }
        }
    };
})(jQuery, TWGgnNewsBoardApp);