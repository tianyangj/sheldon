'use strict';

angular.module('GameFly')

.filter('gfPlatform', function(platformConfig) {

	return function(input) {
		if (angular.isNumber(input)) {
			return platformConfig.get('store', null, input).value;
		}
		return 'N/A';
	};
});