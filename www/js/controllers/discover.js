'use strict';

angular.module('GameFly')

.controller('DiscoverController', function($scope, merchandisingService) {

	console.log($scope);

	merchandisingService.get('games').then(function(merchandising) {
		merchandising.featureds.forEach(function(item) {
			item.product.detailImage = item.product.detailImage.replace('190w', '480w');
		})
		$scope.merchandising = merchandising;
	});

});