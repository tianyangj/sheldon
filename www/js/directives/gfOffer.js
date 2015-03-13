'use strict';

angular.module('GameFly')

.directive('gfOffer', function() {

	return {
		restrict: 'E',
		templateUrl: 'templates/partials/offer.html',
		scope: {
			offers: '='
		},
		controller: function($scope) {
			$scope.$watch('offers', function(newVal, oldVal) {
				if (newVal !== oldVal) {
					$scope.rentOffer = _(newVal).find(function(offer) {
						return offer.offerActionType === 'Rent';
					});
					$scope.newOffer = _(newVal).find(function(offer) {
						return offer.offerActionType === 'Purchase' && !offer.skuIsUsed;
					});
					$scope.usedOffer = _(newVal).find(function(offer) {
						return offer.offerActionType === 'Purchase' && offer.skuIsUsed;
					});
					$scope.keepOffer = _(newVal).find(function(offer) {
						return offer.offerActionType === 'Keep';
					});
				}
			});
		}
	};
});