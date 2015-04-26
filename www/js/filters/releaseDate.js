'use strict';

angular.module('GameFly')

.filter('gfReleaseDate', function($filter) {
	return function(input) {
		var release = new Date(input.date);
		if (release) {
			return (release > new Date() ? 'Coming ' : 'Released ') + $filter('date')(release, 'shortDate');
		} else {
			return '';
		}
	}
});