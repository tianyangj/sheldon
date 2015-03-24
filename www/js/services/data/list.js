'use strict';

angular.module('GameFly')

.factory('listService', function($http, $q, merchandisingService, productService) {

  var getQueryParams = function(productType, platformIds, skip, limit) {
    return {
      itemOffset: skip || 0,
      pageSize: limit || 10,
      platforms: platformIds || [],
      productType: productType
    };
  };

  var getProductType = function(vertical) {
    switch (vertical) {
      case 'movies':
        return 'Movie';
      case 'games':
        return 'ConsoleGame';
    }
  };

  var getFeatured = function(vertical, platformIds) {
    return merchandisingService.get(vertical, platformIds).then(function(data) {
      return {
        title: 'Featured',
        isLastPage: true,
        items: data.featureds.map(function(item) {
          return item.product;
        })
      };
    });
  }

  var getMostPopular = function(productType, platformIds, skip, limit) {
    var params = getQueryParams(productType, platformIds, skip, limit);
    return productService.query(_.merge(params, {
      mostpopular: true,
      'sort.direction': 'desc',
      'sort.field': 'mostpopular'
    })).then(function(data) {
      data.title = 'Most Popular';
      return data;
    });
  };

  var getNewReleases = function(productType, platformIds, skip, limit) {
    var params = getQueryParams(productType, platformIds, skip, limit);
    return productService.query(_.merge(params, {
      newreleases: true,
      'sort.direction': 'desc',
      'sort.field': 'releasedate'
    })).then(function(data) {
      data.title = 'New Releases';
      return data;
    });
  };

  var getComingSoon = function(productType, platformIds, skip, limit) {
    var params = getQueryParams(productType, platformIds, skip, limit);
    return productService.query(_.merge(params, {
      comingsoon: true,
      'sort.direction': 'asc',
      'sort.field': 'releasedate'
    })).then(function(data) {
      data.title = 'Coming Soon';
      return data;
    });
  };

  var getUsedBestsellers = function(productType, platformIds, skip, limit) {
    var params = getQueryParams(productType, platformIds, skip, limit);
    return productService.query(_.merge(params, {
      bestselling: true,
      newOnly: false,
      usedOnly: true,
      'sort.direction': 'desc',
      'sort.field': 'usedbestselling'
    })).then(function(data) {
      data.title = 'Used Bestsellers';
      return data;
    });
  };

  var getNewBestsellers = function(productType, platformIds, skip, limit) {
    var params = getQueryParams(productType, platformIds, skip, limit);
    return productService.query(_.merge(params, {
      bestselling: true,
      newOnly: true,
      usedOnly: false,
      'sort.direction': 'desc',
      'sort.field': 'newbestselling'
    })).then(function(data) {
      data.title = 'New Bestsellers';
      return data;
    });
  };

  var getPreorders = function(productType, platformIds, skip, limit) {
    var params = getQueryParams(productType, platformIds, skip, limit);
    return productService.query(_.merge(params, {
      preorders: true,
      'sort.direction': 'asc',
      'sort.field': 'releasedate'
    })).then(function(data) {
      data.title = 'Pre-Orders';
      return data;
    });
  };

  var getFreeShippings = function(productType, platformIds, skip, limit) {
    var params = getQueryParams(productType, platformIds, skip, limit);
    return productService.query(_.merge(params, {
      freeshippingonly: true,
      purchaseOnly: true
    })).then(function(data) {
      data.title = 'Free Shipping';
      return data;
    });
  }

  var get = function(vertical, platformIds, category, skip, limit) {
    var productType = getProductType(vertical);
    switch (category) {
      case 'featured':
        return getFeatured(vertical, platformIds);
      case 'mostpopular':
        return getMostPopular(productType, platformIds, skip, limit);
      case 'newreleases':
        return getNewReleases(productType, platformIds, skip, limit);
      case 'comingsoon':
        return getComingSoon(productType, platformIds, skip, limit);
      case 'usedbestsellers':
        return getUsedBestsellers(productType, platformIds, skip, limit);
      case 'newbestsellers':
        return getNewBestsellers(productType, platformIds, skip, limit);
      case 'preorders':
        return getPreorders(productType, platformIds, skip, limit);
      case 'freeshippings':
        return getFreeShippings(productType, platformIds, skip, limit);
    }
  };

  return {
    get: get
  };
});