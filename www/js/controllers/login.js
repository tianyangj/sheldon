'use strict';

angular.module('GameFly')

.controller('loginController', function($scope, $state, $ionicHistory, accountService, loginModal) {

  $scope.loginData = {};

  $scope.close = function() {
    loginModal.hide();
  };

  $scope.login = function() {
    accountService.login($scope.loginData.email, $scope.loginData.password).then(function() {
      loginModal.hide();
    }, function(response) {
      $scope.error = response.data.failureError;
    });
  };

  $scope.signup = function() {
    loginModal.hide();
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    $state.go('app.signup');
  }
});
