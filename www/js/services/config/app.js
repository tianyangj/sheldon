'use strict';

angular.module('GameFly')

.constant('appConstants', {
	apiHost: '127.0.0.1:3000/api'
})

.factory('appConfig', function(appConstants) {

	var getApiUrl = function(path) {
		return '//' + appConstants.apiHost + path;
	};

	return {
		getApiUrl: getApiUrl
	};
});
