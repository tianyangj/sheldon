'use strict';

angular.module('GameFly')

.factory('accountService', function($http, $rootScope, appConfig) {

  var getCurrent = function() {
    return $http({
      method: 'GET',
      url: appConfig.getApiUrl('/account/getcurrent')
    }).then(function(response) {
      $rootScope.account = response.data.account;
      $rootScope.cartItemsCount = response.data.itemsInCartCount;
      return response.data;
    });
  };

  var login = function(email, password) {
    return $http({
      method: 'POST',
      url: appConfig.getApiUrl('/account/login'),
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
      url: appConfig.getApiUrl('/account/logout')
    }).then(function(response) {
      $rootScope.account = null;
      $rootScope.cartItemsCount = 0;
      return response.data;
    });
  };

  var createAccount = function(account) {
    return $http({
      method: 'POST',
      url: appConfig.getApiUrl('/accountRegistration/createAccount'),
      data: account
    });
  };

  var addShippingAddress = function(address) {
    return $http({
      method: 'POST',
      url: appConfig.getApiUrl('/accountRegistration/addPrimaryShippingAddress'),
      data: {
        address: address,
        useAddressAsIs: false
      }
    });
  }

  return {
    login: login,
    logout: logout,
    getCurrent: getCurrent,
    createAccount: createAccount,
    addShippingAddress: addShippingAddress
  };
});
