'use strict';

angular.module('GameFly')

.constant('appConstants', {
	apiHost: 'http://127.0.0.1:3000/api'
	//apiHost: 'https://api.gamefly.com/api'
})

.factory('appConfig', function(appConstants) {

	var getApiUrl = function(path) {
		return appConstants.apiHost + path;
	};

	return {
		getApiUrl: getApiUrl
	};
});
