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
    views: {
      'menuContent': {
        templateUrl: 'templates/games.html',
        controller: 'gamesController'
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

  .state('app.movies', {
    url: '/movies/:platform',
    views: {
      'menuContent': {
        templateUrl: 'templates/movies.html',
        controller: 'moviesController'
      }
    }
  })

  .state('app.store', {
    url: '/store/:platform',
    views: {
      'menuContent': {
        templateUrl: 'templates/store.html'
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
  });

  $urlRouterProvider.otherwise('/games/');
});
