'use strict';

angular.module('GameFly')

.filter('gfProtocol', function() {
	return function(input) {
		if (_.startsWith(input, '//')) {
			return 'https:' + input;
		}
		return input;
	}
});