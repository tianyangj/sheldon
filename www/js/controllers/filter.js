'use strict';

angular.module('GameFly')

.controller('filterController', function($scope, $stateParams, merchandisingService, productService, genreConstants, platformConstants, ratingConstants) {
  
  console.log($scope, $stateParams)

  $scope.filters = {};

  $scope.updateVertical = function(vertical) {
    $scope.vertical = vertical;
    $scope.platforms = vertical === 'games' ? platformConstants.games : platformConstants.movies;
    $scope.genres = vertical === 'games' ? genreConstants.games : genreConstants.movies;
    $scope.ratings = vertical === 'games' ? ratingConstants.games : ratingConstants.movies;
  };

  $scope.updateVertical($stateParams.vertical);

});
