'use strict';

angular.module('GameFly')

.factory('navigationService', function() {
  return {
  	get: function() {
  		return [
        {
          name: 'Games',
          platforms: [
            {
              name: 'Xbox One', url: '#/games/xboxone'
            },
            {
              name: 'Xbox 360', url: '#/games/xbox360' 
            },
            {
              name: 'PlayStation 4', url: '#/games/ps4'
            },
            {
              name: 'PlayStation 3', url: '#/games/ps3'
            },
            {
              name: 'Wii U', url: '#/games/wiiu'
            }
          ]
        },
        {
          name: 'Movies',
          platforms: [
            {
              name: 'DVD', url: '#/movies/dvd'
            },
            {
              name: 'Blu-ray', url: '#/movies/bluray'
            }
          ]
        },
        {
          name: 'Store',
          platforms: [
            {
              name: 'Xbox One', url: '#/store/xboxone'
            },
            {
              name: 'Xbox 360', url: '#/store/xbox360'
            },
            {
              name: 'PlayStation 4', url: '#/store/ps4'
            },
            {
              name: 'PlayStation 3', url: '#/store/ps3'
            },
            {
              name: 'Wii U', url: '#/store/wiiu'
            },
            {
              name: 'DVD', url: '#/store/dvd'
            },
            {
              name: 'Blu-ray', url: '#/store/bluray'
            }
          ]
        }
      ];
  	}
  };
});
