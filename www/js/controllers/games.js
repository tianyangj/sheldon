'use strict';

angular.module('GameFly')

.controller('gamesController', function($scope, $stateParams, merchandisingService) {
  console.log('gamesController', $stateParams);
  merchandisingService.get().then(function(merchandising) {
    console.log('data.success', merchandising);
    $scope.merchandising = merchandising;
  });
});
