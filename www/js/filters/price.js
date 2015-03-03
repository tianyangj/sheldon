'use strict';

angular.module('GameFly')

.filter('gfPrice', function($filter) {

	return function(input) {
		if (angular.isObject(input)) {
			if (input.amount) {
				return $filter('currency')(input.amount, input.currency.symbol);
			}
		} 
		return $filter('currency')(input, '$');
	};
});
