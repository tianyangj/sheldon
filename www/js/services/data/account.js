'use strict';

angular.module('GameFly')

.factory('accountService', function($http, $rootScope) {

  var getCurrent = function() {
    return $http({
      method: 'GET',
      url: 'https://api.gamefly.com/api/account/getcurrent'
    }).then(function(response) {
      $rootScope.account = response.data.account;
      $rootScope.cartItemsCount = response.data.itemsInCartCount;
      return response.data;
    });
  };

  var login = function(email, password) {
    return $http({
      method: 'POST',
      url: 'https://api.gamefly.com/api/account/login',
      data: {
        email: email,
        password: password
      }
    }).then(function(response) {
      $rootScope.account = response.data.account;
      $rootScope.cartItemsCount = response.data.itemsInCartCount;
      return response.data;
    });
  };

  var logout = function() {
    return $http({
      method: 'POST',
      url: 'https://api.gamefly.com/api/account/logout'
    }).then(function(response) {
      $rootScope.account = null;
      $rootScope.cartItemsCount = 0;
      return response.data;
    });
  };

  return {
    login: login,
    logout: logout,
    getCurrent: getCurrent
  };
});
