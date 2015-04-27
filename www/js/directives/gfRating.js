'use strict';

angular.module('GameFly')

.directive('gfRating', function() {

	return {
		restrict: 'E',
		template: '<div ng-if="::rate">' +
			'<rating ng-model="rate" max="max" readonly="readonly"></rating> <span ng-if="::count">({{count}})</span>' +
			'</div>',
		scope: {
			rate: '=',
			max: '=',
			count: '=',
			readonly: '='
		}
	};
});