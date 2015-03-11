'use strict';

angular.module('GameFly')

.controller('gamesController', function($scope, $stateParams, merchandisingService, productService, platformConfig) {
  
  $scope.platform = platformConfig.get('games', $stateParams.platform);

  $scope.platformIds = $scope.platform ? [$scope.platform.id] : [];

  merchandisingService.get('games', $scope.platformIds).then(function(merchandising) {
    $scope.merchandising = merchandising;
  });

  productService.query({
  	mostpopular: true,
    platforms: $scope.platformIds,
  	productType: 'ConsoleGame',
  	'sort.direction': 'desc',
  	'sort.field': 'mostpopular'
  }).then(function(data) {
  	$scope.mostpopular = data;
  });

  productService.query({
  	newreleases: true,
    platforms: $scope.platformIds,
  	productType: 'ConsoleGame',
  	'sort.direction': 'desc',
  	'sort.field': 'releasedate'
  }).then(function(data) {
  	$scope.newreleases = data;
  });

  productService.query({
  	comingsoon: true,
    platforms: $scope.platformIds,
  	productType: 'ConsoleGame',
  	'sort.direction': 'asc',
  	'sort.field': 'releasedate'
  }).then(function(data) {
  	$scope.comingsoon = data;
  });

  productService.query({
  	bestselling: true,
  	newOnly: false,
  	usedOnly: true,
    platforms: $scope.platformIds,
  	productType: 'ConsoleGame',
  	'sort.direction': 'desc',
  	'sort.field': 'usedbestselling'
  }).then(function(data) {
  	$scope.usedbestsellers = data;
  });

  productService.query({
  	bestselling: true,
  	newOnly: true,
  	usedOnly: false,
    platforms: $scope.platformIds,
  	productType: 'ConsoleGame',
  	'sort.direction': 'desc',
  	'sort.field': 'newbestselling'
  }).then(function(data) {
  	$scope.newbestsellers = data;
  });
});
