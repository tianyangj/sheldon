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
		$scope.cards = angular.copy(data.items.slice(0, 3));
	});

	$scope.cardSwiped = function(index) {
		console.log('cardSwiped', index);
	};

	$scope.cardSwipedLeft = function(index) {
        console.log('Left swipe', index);
    }
 
    $scope.cardSwipedRight = function(index) {
        console.log('Right swipe', index);
    }

	$scope.cardDestroyed = function(index) {
		console.log('cardDestroyed', index);
		
		$scope.cards.splice(index, 1);

		var newCard = $scope.suggestions[Math.floor(Math.random() * $scope.suggestions.length)];
    	$scope.cards.splice(0, 0, angular.extend({}, newCard));
	};
});