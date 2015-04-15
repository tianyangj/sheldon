'use strict';

angular.module('GameFly')

.directive('gfHeroProduct', function($filter) {

	return {
		restrict: 'E',
		templateUrl: 'templates/partials/hero-product.html',
		replace: true,
		scope: {
			hero: '=',
			product: '='
		},
		link: function(scope, el) {
			scope.$watch('hero', function(hero, oldVal) {
				if (hero && hero !== oldVal) {
					var viewport = _.last(hero.viewports);
					var asset = viewport.image || viewport.video;
					if (asset) {
						var background = angular.element(el[0].querySelector('.hero-background'));
						background.css({
							'background-image': 'url(' + $filter('gfProtocol')(asset.rendered.url) + ')'
						});
						scope.asset = asset;
					}
				}
			});
		}
	};
});