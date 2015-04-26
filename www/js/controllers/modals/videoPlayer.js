'use strict';

angular.module('GameFly')

.controller('VideoPlayerController', function($scope, $timeout, $ionicSlideBoxDelegate, modalService) {

	$scope.close = function() {
		modalService.remove('videoPlayer');
	};

	$scope.onSlideChanged = function(index) {
		$scope.videoIndex = index;
	}

	$scope.$watch('videoIndex', function(index) {
		$timeout(function() {
			$ionicSlideBoxDelegate.slide($scope.videoIndex);
		});
	});
});