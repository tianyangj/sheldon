'use strict';

angular.module('GameFly')

.directive('gfRating', function() {

	return {
		restrict: 'E',
		template: '<rating ng-model="rate" max="max"></rating> <span>({{count}})</span>',
		scope: {
			rate: '=',
			max: '=',
			count: '='
		}
	};
});