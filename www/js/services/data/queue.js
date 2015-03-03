'use strict';

angular.module('GameFly')

.factory('queueService', function($http) {

  var get = function() {
    return $http({
      method: 'GET',
      url: '//api.gamefly.com/api/rentalqueue/get'
    }).then(function(response) {
      return response.data;
    });
  };

  var modify = function(productIds) {
    return $http({
      method: 'POST',
      url: '//api.gamefly.com/api/rentalqueue/modify',
      data: productIds
    });
  };

  var add = function(productId) {
    return $http({
      method: 'POST',
      url: '//api.gamefly.com/api/rentalqueue/add',
      data: {
        productId: productId
      }
    });
  };

  return {
    get: get,
    modify: modify,
    add: add
  };
});
