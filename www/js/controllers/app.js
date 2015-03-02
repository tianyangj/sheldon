'use strict';

angular.module('GameFly')

.controller('appController', function($scope, navigationService, accountService, loginModal) {
  
  $scope.showLoginModal = function() {
    loginModal.show();
  };

  $scope.logout = function() {
    accountService.logout();
  };

  $scope.verticals = navigationService.get();

  $scope.toggleVertical = function(vertical) {
    if ($scope.isVerticalShown(vertical)) {
      $scope.shownVertical = null;
    } else {
      $scope.shownVertical = vertical;
    }
  };
  
  $scope.isVerticalShown = function(vertical) {
    return $scope.shownVertical === vertical;
  };

});
