'use strict';

angular.module('GameFly')

.factory('merchandisingService', function($http) {

  var get = function(platforms) {
    return $http({
      method: 'GET',
      url: '//api.gamefly.com/api/merchandising/getdisplays',
      params: {
        ids: 'games'
      }
    }).then(function(response) {
      var heroes = _(response.data.groups)
        .find(function(group) {
          return group.name === 'HeroItems';
        })
        .items
        .map(function(item) {
          return {
            product: response.data.products[item.product.productVariantId],
            viewports: _(item.product.design.viewportGroups).map(function(viewport) {
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
        });
      var featureds = _(response.data.groups)
        .find(function(group) {
          return group.name === 'FeaturedProducts';
        })
        .items
        .map(function(item) {
          return {
            product: response.data.products[item.product.productVariantId]
          };
        });
      return {
        heroes: heroes,
        featureds: featureds
      };
    });
  };

  return {
    get: get
  };
});
