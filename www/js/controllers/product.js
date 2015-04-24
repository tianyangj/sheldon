'use strict';

angular.module('GameFly')

.controller('productController', function($scope, $stateParams, productService, modalService) {
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

  productService.getReview({
    productId: $stateParams.productId,
    sortOrder: 'MostHelpful'
  }).then(function(data){
    $scope.reviews = data;
  });

  $scope.onTabSelected = function(tab) {
    switch(tab) {
      case 'reviews':
        $scope.isReviews = true;
        $scope.isDetails = $scope.isRelated = false;
        break;
      case 'related':
        $scope.isRelated = true;
        $scope.isDetails = $scope.isReviews = false;
        break;
      default:
        $scope.isDetails = true;
        $scope.isReviews = $scope.isRelated = false;
    }
  };

  $scope.openImageSlider = function() {
    modalService.show('imageSlider', $scope);
  };

});
