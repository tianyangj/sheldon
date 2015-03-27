'use strict';

angular.module('GameFly')

.controller('searchController', function($scope, $timeout, productService) {

  var timeout;

  $scope.data = {};

  $scope.clear = function() {
    $scope.data.query = '';
    $scope.items = [];
    $scope.totalItems = 0;
  };

  $scope.search = function() {
    if ($scope.data.query === '') {
      $timeout.cancel(timeout);
      $scope.items = [];
      $scope.totalItems = 0;
      return;
    }
    if (timeout) {
      $timeout.cancel(timeout);
    }
    timeout = $timeout(function() {
      timeout = null;
      productService.query({
        'search.keywords': $scope.data.query,
        'search.titleonly': true,
        'sort.direction': 'desc',
        'sort.field': 'mostpopular'
      }).then(function(data) {
        $scope.items = data.items;
        $scope.totalItems = data.totalItems;
      });
    }, 300);
  };
});