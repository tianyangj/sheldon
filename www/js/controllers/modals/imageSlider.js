'use strict';

angular.module('GameFly')

.controller('ImageSliderController', function($scope, $timeout, $ionicSlideBoxDelegate, modalService) {

	$scope.close = function() {
		modalService.remove('imageSlider');
	};

	$scope.onSlideChanged = function(index) {
		$scope.imageIndex = index;
	}

	$scope.$watch('imageIndex', function(index) {
		$timeout(function() {
			$ionicSlideBoxDelegate.slide($scope.imageIndex);
		});
	});
});