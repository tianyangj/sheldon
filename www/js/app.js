/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/lodash/lodash.d.ts"/>

'use strict';

angular.module('GameFly', ['ionic', 'ionic.contrib.ui.tinderCards', 'ionic.rating', 'angular-carousel'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $sceProvider) {

  $httpProvider.defaults.withCredentials = true;

  $httpProvider.interceptors.push(function() {
    return {
      request: function(config) {
        if (config.method === 'POST') {
          // https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
          var token = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent('XSRF-TOKEN').replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
          config.headers['X-XSRF-TOKEN'] = 'CjF2y_WK_L82kjqR2334FNLxcMivhgnCwj_VAeCiEqEI8kFm6NeVzAK3WQvHZaGDw5nQ7XjKTCyxoXX5TmmmkgxW17iBqk2YddkTSYCEypDaMidOfhpul60VI82B9mM2Y5N6dg2:-I3h-rJ26SS2zxmjc5SIGuN1TIDaIHMmd5DLkAYbd9TmQW4X_GRZFYZ6l2jyk1ZWnLl4Q_Pv6x-dsnir0hDOAmA2HwHXx3QNGchnK7dvgWoKddNQDQUwYhGpkGzPRL9NHMWODQ2';
        }
        return config;
      }
    };
  });

  $sceProvider.enabled(false);
  
  $stateProvider

  .state('app', {
    url: '',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'appController',
    resolve: {
      appModel: function(accountService) {
        return accountService.getCurrent();
      }
    }
  })

  .state('app.games', {
    url: '/games/:platform',
    params: {
      platform: { value: null, squash: true }
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/games.html',
        controller: 'gamesController'
      }
    }
  })

  .state('app.movies', {
    url: '/movies/:platform',
    params: {
      platform: { value: null, squash: true }
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/movies.html',
        controller: 'moviesController'
      }
    }
  })

  .state('app.store', {
    url: '/store/:platform',
    params: {
      platform: { value: null, squash: true }
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/store.html',
        controller: 'storeController'
      }
    }
  })

  .state('app.filter', {
    url: '/filter?vertical&platform',
    views: {
      'menuContent': {
        templateUrl: 'templates/filter.html',
        controller: 'filterController'
      }
    }
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'searchController'
      }
    }
  })

  .state('app.product', {
    url: '/product/:productId',
    params: {
      product: { value: null }
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/product.html',
        controller: 'productController'
      }
    }
  })

  .state('app.queue', {
    url: '/queue',
    views: {
      'menuContent': {
        templateUrl: 'templates/queue.html',
        controller: 'QueueController'
      }
    }
  })

  .state('app.cart', {
    url: '/cart',
    views: {
      'menuContent': {
        templateUrl: 'templates/cart.html',
        controller: 'cartController'
      }
    }
  })

  .state('app.discover', {
    url: '/discover',
    views: {
      'menuContent': {
        templateUrl: 'templates/discover.html',
        controller: 'DiscoverController'
      }
    }
  })

  .state('app.signup', {
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: 'templates/signup.html',
        controller: 'signupController'
      }
    }
  })

  .state('app.list', {
    url: '/{vertical:(?:games|movies|store)}/{platform}/{category}',
    params: {
      data: { value: null }
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/list.html',
        controller: 'listController'
      }
    }
  });

  $urlRouterProvider.otherwise('/games');
});
