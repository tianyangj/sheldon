'use strict';

angular.module('GameFly', ['ionic', 'angular-carousel'])

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
          config.headers['X-XSRF-TOKEN'] = token;
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

  .state('app.list', {
    url: '/{vertical}/{platform}/{category}',
    params: {
      vertical: { value: null, squash: true },
      platform: { value: null, squash: true },
      category: { value: null, squash: true },
      data: { value: null }
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/list.html',
        controller: 'listController'
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
        controller: 'queueController'
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

  .state('app.signup', {
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: 'templates/signup.html',
        controller: 'signupController'
      }
    }
  });

  $urlRouterProvider.otherwise('/games');
});
