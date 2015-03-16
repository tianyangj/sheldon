'use strict';

angular.module('GameFly')

.constant('genreConstants', {
	games: [
		{ name:'actionadventure', value: 'Action Adventure' },
		{ name:'arcadepuzzle', value: 'Arcade/Puzzle' },
		{ name:'familyparty', value: 'Family/Party' },
		{ name:'fighting', value: 'Fighting' },
		{ name:'musicdance', value: 'Music/Dance' },
		{ name:'racing', value: 'Racing' },
		{ name:'rpg', value: 'RPG' },
		{ name:'shooter', value: 'Shooter' },
		{ name:'sports', value: 'Sports' },
		{ name:'strategysim', value: 'Strategy/Sim' }
	],
	movies: [
		{ name:'actionadventure', value: 'Action Adventure' },
		{ name:'anime', value: 'Anime' },
		{ name:'comedy', value: 'Comedy' },
		{ name:'drama', value: 'Drama' },
		{ name:'family', value: 'Family' },
		{ name:'foreign', value: 'Foreign' },
		{ name:'horror', value: 'Horror' },
		{ name:'musicvideo', value: 'Music Video' },
		{ name:'scififantasy', value: 'Sci-Fi & Fantasy' }
	]
});