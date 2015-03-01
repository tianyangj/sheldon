'use strict';

angular.module('GameFly')

.controller('productController', function($scope, $stateParams, productService) {
  console.log('productController', $stateParams);
  if ($stateParams.product) {
  	$scope.product = $stateParams.product;
  }

  productService.get($stateParams.productId).then(function(data) {
  	console.log('productController.productService', data)
  	$scope.hero = data.hero;
  	$scope.product = data.product;
  	$scope.recommendations = data.recommendations;
  });

  productService.getMedia($stateParams.productId, 'image').then(function(data) {
  	$scope.images = data;
  });

  productService.getMedia($stateParams.productId, 'video').then(function(data) {
  	$scope.videos = data;
  });
});
