'use strict';

angular.module('GameFly')

.controller('cartController', function($scope, cartService) {

  function databind(data) {
    console.log('cartController.databind', data)
    $scope.primary = data.primary;
    $scope.secondary = data.secondary;
    $scope.bulletins = data.bulletins;
    $scope.priceInfo = data.priceInfo;
  }

  cartService.get().then(databind);

  $scope.deletePrimary = function(item) {
    cartService.update(item.id, 0).then(databind);
  };

  $scope.deleteSecondary = function(item) {
    cartService.update(item.id, 0).then(databind);
  };

  $scope.moveSecondary = function(item) {
    cartService.move(item.id, 1).then(databind);
  };

  $scope.movePrimary = function(item) {
    cartService.move(item.id, 0).then(databind);
  };
});
