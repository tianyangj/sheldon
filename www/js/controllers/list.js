'use strict';

angular.module('GameFly')

.controller('listController', function($scope, $stateParams, platformConfig, listService) {

  $scope.vertical = $stateParams.vertical;

  $scope.platform = platformConfig.get($scope.vertical, $stateParams.platform);

  $scope.platformIds = $scope.platform ? [$scope.platform.id] : [];

  $scope.items = [];

  $scope.loadMore = function() {
    listService.get($scope.vertical, $scope.platformIds, $stateParams.category, $scope.skip).then(function(data) {
      console.log('loading...', data);
      $scope.title = data.title;
      $scope.items = $scope.items.concat(data.items);
      $scope.isLast = data.isLastPage;
      $scope.skip = data.lastItemIndex;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };
});