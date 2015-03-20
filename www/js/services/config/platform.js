'use strict';

angular.module('GameFly')

.constant('platformConstants', {
	games: [
		{ name: 'xboxone', id: 1215, value: 'Xbox One' },
		{ name: 'xbox360', id: 1070, value: 'Xbox 360' },
		{ name: 'ps4', id: 1225, value: 'PS4' },
		{ name: 'ps3', id: 1080, value: 'PS3' },
		{ name: 'psvita', id: 1205, value: 'PS Vita' },
		{ name: 'wiiu', id: 1210, value: 'Wii U' },
		{ name: 'wii', id: 1085, value: 'Wii' },
		{ name: '3ds', id: 1090, value: '3DS' },
		{ name: 'ds', id: 1060, value: 'DS' },
		{ name: 'xbox', id: 1010, value: 'Xbox' },
		{ name: 'ps2', id: 1005, value: 'PS2' },
		{ name: 'gamecube', id: 1015, value: 'GameCube' },
		{ name: 'gameboyadvance', id: 1050, value: 'Game Boy Advance' },
		{ name: 'pspgame', id: 1065, value: 'PSP Games' },
		{ name: 'pspmovie', id: 1075, value: 'PSP Movies' }
	],
	movies: [
		{ name: 'bluray', id: 1235, value: 'Blu-ray' },
		{ name: 'dvd', id: 1230, value: 'DVD' }
	],
	stores: [
		{ name: 'xboxone', id: 1215, value: 'Xbox One' },
		{ name: 'xbox360', id: 1070, value: 'Xbox 360' },
		{ name: 'ps4', id: 1225, value: 'PS4' },
		{ name: 'ps3', id: 1080, value: 'PS3' },
		{ name: 'psvita', id: 1205, value: 'PS Vita' },
		{ name: 'wiiu', id: 1210, value: 'Wii U' },
		{ name: 'wii', id: 1085, value: 'Wii' },
		{ name: '3ds', id: 1090, value: '3DS' },
		{ name: 'ds', id: 1060, value: 'DS' },
		{ name: 'bluray', id: 1235, value: 'Blu-ray' },
		{ name: 'dvd', id: 1230, value: 'DVD' }
	]
})

.factory('platformConfig', function(platformConstants) {

	return {
		get: function(vertical, name, id) {
			switch(vertical) {
				case 'games':
					return _(platformConstants.games).find(function(platform) {
						if (name) return platform.name === name;
						if (id) return platform.id === id;
					});
				case 'movies':
					return _(platformConstants.movies).find(function(platform) {
						if (name) return platform.name === name;
						if (id) return platform.id === id;
					});
				case 'store':
					return _(platformConstants.stores).find(function(platform) {
						if (name) return platform.name === name;
						if (id) return platform.id === id;
					});
			}
		}
	};
});
