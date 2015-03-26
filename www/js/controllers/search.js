'use strict';

angular.module('GameFly')

.controller('searchController', function($scope, $timeout, productService) {

  var timeout;

  $scope.data = {};

  $scope.onFocus = function() {
    console.log('focused...')
    $scope.isFocused = true;
  };

  $scope.onBlur = function() {
    console.log('blured...')
    $scope.isFocused = false;
  };

  $scope.search = function() {
    console.log('searching...', $scope.data)
    if ($scope.data.query === '') {
      $timeout.cancel(timeout);
      $scope.items = [];
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
      });
    }, 300);
  };
});