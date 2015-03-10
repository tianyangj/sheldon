'use strict';

angular.module('GameFly')

.factory('navigationService', function($state, platformConstants) {

  var getGames = function() {
    return platformConstants.games.map(function(platform) {
      return {
        id: platform.id,
        name: platform.name,
        value: platform.value,
        url: $state.href('app.games', { platform: platform.name })
      };
    });
  };

  var getMovies = function() {
    return platformConstants.movies.map(function(platform) {
      return {
        id: platform.id,
        name: platform.name,
        value: platform.value,
        url: $state.href('app.movies', { platform: platform.name })
      };
    });
  };

  var getStores = function() {
    return platformConstants.stores.map(function(platform) {
      return {
        id: platform.id,
        name: platform.name,
        value: platform.value,
        url: $state.href('app.store', { platform: platform.name })
      };
    });
  };

  var get = function() {
    return [
      { name: 'Games', platforms: getGames() },
      { name: 'Movies', platforms: getMovies() },
      { name: 'Store', platforms: getStores() }
    ];
  };

  return {
  	get: get
  };
});
