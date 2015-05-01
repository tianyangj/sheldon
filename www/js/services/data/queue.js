'use strict';

angular.module('GameFly')

  .factory('queueService', function ($http, appConfig) {

  var get = function () {
    return $http({
      method: 'GET',
      url: appConfig.getApiUrl('/rentalqueue/get')
    }).then(function (response) {
      var itemsOut = response.data.itemsOut.map(function (item) {
        return angular.extend({
          dateSent: item.dateSent,
          isBonusGame: item.isBonusGame,
          isFastReturn: item.sentDueToFastReturn,
          keepOffer: _.find(item.product.offerActions, function (offer) {
            return offer.offerActionType === 'Keep';
          })
        }, item.product);
      });
      var itemsQueued = response.data.itemsQueued.map(function (item) {
        item.rentOffer = _.find(item.offerActions, function (offer) {
          return offer.offerActionType === 'Rent';
        });
        return item;
      });
      return {
        itemsOut: itemsOut,
        itemsQueued: itemsQueued
      };
    });
  };

  var modify = function (productIds) {
    return $http({
      method: 'POST',
      url: appConfig.getApiUrl('/rentalqueue/modify'),
      data: productIds
    });
  };

  var add = function (productId, bypassPlatform, addPlatform) {
    return $http({
      method: 'POST',
      url: appConfig.getApiUrl('/rentalqueue/add'),
      data: {
        productId: productId,
        addPreferredPlatform: addPlatform,
        bypassPlatformValidation: bypassPlatform
      }
    });
  };

  return {
    get: get,
    modify: modify,
    add: add
  };
});
