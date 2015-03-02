'use strict';

angular.module('GameFly')

.controller('loginController', function($scope, accountService, loginModal) {

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
});
