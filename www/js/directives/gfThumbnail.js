'use strict';

angular.module('GameFly')

.directive('gfThumbnail', function() {

	return {
		restrict: 'E',
		templateUrl: 'templates/partials/thumbnail.html',
		replace: true,
		scope: {
			product: '='
		}
	};
});