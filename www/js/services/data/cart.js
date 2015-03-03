'use strict';

angular.module('GameFly')

.factory('cartService', function($http) {

  function normalize(data) {
    var primary = _(data.cart.cartGroups).find(function(group) {
      return group.itemGroupType === 0;
    });
    var secondary = _(data.cart.cartGroups).find(function(group) {
      return group.itemGroupType === 1;
    });
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
      url: '//api.gamefly.com/api/cart/get'
    }).then(function(response) {
      return normalize(response.data);
    });
  };

  var update = function(lineItemId, quantity) {
    return $http({
      method: 'POST',
      url: '//api.gamefly.com/api/cart/update',
      data: {
        changeQuantityItems: [
          {
            lineItemId: lineItemId,
            quantity: quantity
          }
        ]
      }
    }).then(function(response) {
      return normalize(response.data);
    });
  };

  var move = function(lineItemId, toGroup) {
    return $http({
      method: 'POST',
      url: '//api.gamefly.com/api/cart/update',
      data: {
        moveItems: [
          {
            lineItemId: lineItemId,
            groupToMoveTo: toGroup
          }
        ]
      }
    }).then(function(response) {
      return normalize(response.data);
    });
  };

  return {
    get: get,
    update: update,
    move: move
  };
});
