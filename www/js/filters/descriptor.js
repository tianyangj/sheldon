'use strict';

angular.module('GameFly')

.filter('gfDescriptor', function() {

	function descriptor(arr) {
		if (arr.length === 1) {
			return arr[0];
		}
		if (arr.length === 2) {
			return arr[0] + ' and ' + arr[1];
		}
		return arr.shift() + ', ' + descriptor(arr);
	}

	return function(input) {
		if (angular.isArray(input) && input.length) {
			return descriptor(angular.copy(input));
		}
		return 'N/A';
	};
});