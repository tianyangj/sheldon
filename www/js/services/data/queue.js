'use strict';

angular.module('GameFly')

.factory('queueService', function($http, appConfig) {

  var get = function() {
    return $http({
      method: 'GET',
      url: appConfig.getApiUrl('/rentalqueue/get')
    }).then(function(response) {
      return response.data;
    });
  };

  var modify = function(productIds) {
    return $http({
      method: 'POST',
      url: appConfig.getApiUrl('/rentalqueue/modify'),
      data: productIds
    });
  };

  var add = function(productId) {
    return $http({
      method: 'POST',
      url: appConfig.getApiUrl('/rentalqueue/add'),
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
