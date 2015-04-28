'use strict';

angular.module('GameFly')

.controller('DiscoverController', function($scope, productService) {

	productService.query({
		mostpopular: true,
		productType: 'ConsoleGame',
		'sort.direction': 'desc',
		'sort.field': 'mostpopular'
	}).then(function(data) {
		$scope.suggestions = data.items;
	});
});