'use strict';

angular.module('GameFly')

.controller('moviesController', function($scope, $stateParams, merchandisingService, productService, platformConfig) {
  
  $scope.platform = platformConfig.get('movies', $stateParams.platform);

  $scope.platformIds = $scope.platform ? [$scope.platform.id] : [];

  merchandisingService.get('movies', $scope.platformIds).then(function(merchandising) {
    $scope.merchandising = merchandising;
  });

  productService.query({
  	mostpopular: true,
    platforms: $scope.platformIds,
  	productType: 'Movie',
  	'sort.direction': 'desc',
  	'sort.field': 'mostpopular'
  }).then(function(data) {
  	$scope.mostpopular = data;
  });

  productService.query({
  	newreleases: true,
    platforms: $scope.platformIds,
  	productType: 'Movie',
  	'sort.direction': 'desc',
  	'sort.field': 'releasedate'
  }).then(function(data) {
  	$scope.newreleases = data;
  });

  productService.query({
  	comingsoon: true,
    platforms: $scope.platformIds,
  	productType: 'Movie',
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
  	productType: 'Movie',
  	'sort.direction': 'desc',
  	'sort.field': 'usedbestselling'
  }).then(function(data) {
  	$scope.usedbestsellers = data;
  });

});
