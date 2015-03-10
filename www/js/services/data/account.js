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
    }).then(function(response) {
      $rootScope.account = response.data.account;
      $rootScope.cartItemsCount = response.data.itemsInCartCount;
      return response.data;
    });
  };

  var addShippingAddress = function(address, useAsIs) {
    return $http({
      method: 'POST',
      url: appConfig.getApiUrl('/accountRegistration/addPrimaryShippingAddress'),
      data: {
        address: {
          firstName: address.firstname,
          lastName: address.lastname,
          street: address.street,
          city: address.city,
          state: address.state.key,
          postalCode: address.zip,
          phoneNumber: address.phone
        },
        useAddressAsIs: useAsIs
      }
    }).then(function(response) {
      $rootScope.account = response.data.account;
      $rootScope.cartItemsCount = response.data.itemsInCartCount || 0;
      return response.data;
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
