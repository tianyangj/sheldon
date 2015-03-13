'use strict';

angular.module('GameFly')

.directive('gfPrice', function() {

	return {
		restrict: 'E',
		templateUrl: 'templates/partials/price.html',
		scope: {
			listPrice: '=',
			purchasePrice: '='
		}
	};
});