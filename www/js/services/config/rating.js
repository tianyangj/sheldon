'use strict';

angular.module('GameFly')

.constant('ratingConstants', {
	games: [
		{ name:'ec', value: 'EC (Early Childhood)' },
		{ name:'e', value: 'E (Everyone)' },
		{ name:'e10', value: 'E10+ (Everyone 10+)' },
		{ name:'t', value: 'T (Teen)' },
		{ name:'m', value: 'M (Mature)' },
		{ name:'ao', value: 'AO (Adults Only)' }
	],
	movies: [
		{ name:'g', value: 'G' },
		{ name:'pg', value: 'PG' },
		{ name:'pg13', value: 'PG-13' },
		{ name:'r', value: 'R' },
		{ name:'nr', value: 'Not Rated' }
	]
});