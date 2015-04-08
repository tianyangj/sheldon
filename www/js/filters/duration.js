'use strict';

angular.module('GameFly')

.filter('gfDuration', function(platformConfig) {

	return function(input) {
		if (input) {
			var dot = input.indexOf('.');
			if (dot < 0) {
				return input;
			}
			return input.substr(0, dot);
		}
		return 'N/A';
	};
});