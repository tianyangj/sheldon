'use strict';

angular.module('GameFly')

.filter('gfAvailability', function() {
	return function(input) {
		switch (input) {
			case 'Now':
				return 'Available Now';
			case 'Future':
				return 'Coming Soon';
			default:
				return input + ' Availability';
		}
	};
});