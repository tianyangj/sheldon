'use strict';

angular.module('GameFly')

.controller('storeController', function($scope, $stateParams, merchandisingService, productService, platformConfig) {
  
  $scope.platform = platformConfig.get('stores', $stateParams.platform);

  $scope.platformIds = $scope.platform ? [$scope.platform.id] : [];

  merchandisingService.get('store', $scope.platformIds).then(function(merchandising) {
    $scope.merchandising = merchandising;
  });

  productService.query({
  	bestselling: true,
  	newOnly: false,
  	usedOnly: true,
    platforms: $scope.platformIds,
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
  	'sort.direction': 'desc',
  	'sort.field': 'newbestselling'
  }).then(function(data) {
  	$scope.newbestsellers = data;
  });

  productService.query({
    preorders: true,
    platforms: $scope.platformIds,
    'sort.direction': 'asc',
    'sort.field': 'releasedate'
  }).then(function(data) {
    $scope.preorders = data;
  });

  productService.query({
    freeshippingonly: true,
    purchaseOnly: true,
    platforms: $scope.platformIds
  }).then(function(data) {
    $scope.freeshippings = data;
  });
});
