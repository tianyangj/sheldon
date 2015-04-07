'use strict';

angular.module('GameFly')

.factory('productService', function($http, appConfig) {

  var get = function(productId) {
    return $http({
      method: 'GET',
      url: appConfig.getApiUrl('/product/get/' + productId)
    }).then(function(response) {
      var viewModel = {
        product: response.data.product,
        recommendations: response.data.recommendedProducts
      };
      if (response.data.merchandisingInfo) {
        viewModel.hero = {
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
        };
      }
      return viewModel;
    });
  };

  var getMedia = function(productId, mediaType) {
    return $http({
      method: 'GET',
      url: appConfig.getApiUrl('/product/getmedia'),
      params: {
        pageIndex: 1,
        pageSize: 10,
        productId: productId,
        type: mediaType
      }
    }).then(function(response) {
      return response.data;
    });
  };

  var query = function(params) {
    return $http({
      method: 'GET',
      url: appConfig.getApiUrl('/productquery/findpage'),
      params: params
    }).then(function(response) {
      return response.data.products;
    });
  };

  return {
    get: get,
    getMedia: getMedia,
    query: query
  };
});