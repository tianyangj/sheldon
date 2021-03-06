'use strict';

angular.module('GameFly')

.factory('cartService', function($http, $rootScope, appConfig) {

  function normalize(data) {
    var primary = _(data.cart.cartGroups).find(function(group) {
      return group.itemGroupType === 0;
    });
    var secondary = _(data.cart.cartGroups).find(function(group) {
      return group.itemGroupType === 1;
    });
    // update rootScope cart count
    $rootScope.cartItemsCount = primary.lineItems.length;
    return {
      primary: primary,
      secondary: secondary,
      bulletins: data.bulletins,
      priceInfo: data.priceInfo
    };
  }

  var get = function() {
    return $http({
      method: 'GET',
      url: appConfig.getApiUrl('/cart/get')
    }).then(function(response) {
      return normalize(response.data);
    });
  };

  var update = function(lineItemId, quantity) {
    return $http({
      method: 'POST',
      url: appConfig.getApiUrl('/cart/update'),
      data: {
        changeQuantityItems: [{
          lineItemId: lineItemId,
          quantity: quantity
        }]
      }
    }).then(function(response) {
      return normalize(response.data);
    });
  };

  var move = function(lineItemId, toGroup) {
    return $http({
      method: 'POST',
      url: appConfig.getApiUrl('/cart/update'),
      data: {
        moveItems: [{
          lineItemId: lineItemId,
          groupToMoveTo: toGroup
        }]
      }
    }).then(function(response) {
      return normalize(response.data);
    });
  };

  var add = function(skuId, isKeep) {
    return $http({
      method: 'POST',
      url: appConfig.getApiUrl('/cart/add'),
      data: {
        skuId: skuId,
        isForKeep: isKeep
      }
    }).then(function(response) {
      return normalize(response.data.cartResult);
    });
  };

  return {
    get: get,
    update: update,
    move: move,
    add: add
  };
});