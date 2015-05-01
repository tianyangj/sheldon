'use strict';

angular.module('GameFly')

.filter('gfAvailability', function($filter) {
	return function(input) {
		switch (input.availability) {
			case 'Now':
				return 'Available Now';
			case 'Future':
				if (input.releaseDate) {
					return 'Coming ' + $filter('date')(input.releaseDate, 'shortDate');
				}
				return 'Coming Soon';
			default:
				return input.availability + ' Availability';
		}
	};
});