'use strict';

angular.module('GameFly')

.controller('productController', function($scope, $stateParams, $state, $ionicPopup, productService, queueService) {
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

  $scope.rent = function(product) {
    queueService.add(product.id).then(function(){
      $ionicPopup.confirm({
        title: product.title + ' has been added to your queue.',
        template: 'Do you want to go to your queue?'
      }).then(function(res) {
        if (res) {
          $state.go('app.queue');
        }
      });
    }, function(response) {
      $ionicPopup.alert({
        title: 'Error',
        template: response.data.failureError.message
      });
    });
  };
});
