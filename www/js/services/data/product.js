'use strict';

angular.module('GameFly')

.factory('productService', function($http) {

  var get = function(productId) {
    return $http({
      method: 'GET',
      url: '//api.gamefly.com/api/product/get/' + productId
    }).then(function(response) {
      console.log(response.data)
      return {
        hero: {
          viewports: _(response.data.merchandisingInfo.product.design.viewportGroups).map(function(viewport) {
            return {
              size: viewport.viewport,
              video: _.find(viewport.items, function(media) {
                return media.name === 'Video';
              }),
              image: _.find(viewport.items, function(media) {
                return media.name === 'Default';
              })
            };
          }).value()
        },
        product: response.data.product,
        recommendations: response.data.recommendedProducts
      };
    });
  };

  var getMedia = function(productId, type) {
    return $http({
      method: 'GET',
      url: '//api.gamefly.com/api/product/getmedia',
      params: {
        pageIndex: 1,
        pageSize: 10,
        productId: productId,
        type: type
      }
    }).then(function(response) {
      return response.data;
    });
  };

  return {
    get: get,
    getMedia: getMedia
  };
});
