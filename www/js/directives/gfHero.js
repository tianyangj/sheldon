'use strict';

angular.module('GameFly')

.directive('gfHero', function() {

	return {
		restrict: 'E',
		templateUrl: 'templates/partials/hero.html',
		replace: true,
		scope: {
			heroes: '='
		}
	};
});