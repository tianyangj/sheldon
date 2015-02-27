'use strict';

angular.module('GameFly', ['ionic'])

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

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'appController'
  })

  .state('app.games', {
    url: '/games',
    views: {
      'menuContent': {
        templateUrl: 'templates/games.html',
        controller: 'gamesController'
      }
    }
  })

  .state('app.movies', {
    url: '/movies',
    views: {
      'menuContent': {
        templateUrl: 'templates/movies.html',
        controller: 'moviesController'
      }
    }
  })

  .state('app.store', {
    url: '/store',
    views: {
      'menuContent': {
        templateUrl: 'templates/store.html'
      }
    }
  });

  $urlRouterProvider.otherwise('/games');
});
