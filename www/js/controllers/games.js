'use strict';

angular.module('GameFly')

.controller('gamesController', function($scope, $stateParams, merchandisingService, productService, platformConfig) {
  console.log('gamesController', $stateParams, platformConfig.get('games', $stateParams.platform));
  merchandisingService.get().then(function(merchandising) {
    console.log('data.success', merchandising);
    $scope.merchandising = merchandising;
  });

  productService.query({
  	mostpopular: true,
  	productType: 'ConsoleGame',
  	'sort.direction': 'desc',
  	'sort.field': 'mostpopular'
  }).then(function(data) {
  	$scope.mostpopular = data;
  });

  productService.query({
  	newreleases: true,
  	productType: 'ConsoleGame',
  	'sort.direction': 'desc',
  	'sort.field': 'releasedate'
  }).then(function(data) {
  	$scope.newreleases = data;
  });

  productService.query({
  	comingsoon: true,
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
  	productType: 'ConsoleGame',
  	'sort.direction': 'desc',
  	'sort.field': 'newbestselling'
  }).then(function(data) {
  	$scope.newbestsellers = data;
  });
});
