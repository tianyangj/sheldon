'use strict';

angular.module('GameFly')

.controller('systemController', function($scope, $state, $ionicHistory, modalService, platformConstants) {

	$scope.close = function() {
		modalService.remove('system');
	};

	$scope.updateSystem = function(system) {
		modalService.remove('system');
		$ionicHistory.nextViewOptions({
			disableAnimate: true,
			disableBack: true
		});
		$state.go('app.' + $scope.vertical, {
			platform: system.name
		});
	};

	switch ($scope.vertical) {
		case 'games':
			$scope.systems = platformConstants.games;
			break;
		case 'movies':
			$scope.systems = platformConstants.movies;
			break;
		case 'store':
			$scope.systems = platformConstants.stores;
			break;
	}
});