'use strict';

angular.module('GameFly')

.directive('gfButtonRent', function() {

	return {
		restrict: 'E',
		templateUrl: 'templates/partials/button-rent.html',
		scope: {
			offers: '='
		},
		controller: function($scope, $state) {
			$scope.onRent = function() {
				if ($scope.rentOffer.isAlreadyInQueue) {
					$state.go('app.queue');
				} else if ($scope.rentOffer.isRented) {
					console.log('todo: move to cart', $scope.keepOffer);
				} else {
					console.log('todo: call parent scope.rent', $scope.rentOffer);
				}
			};
			$scope.$watch('offers', function(newVal, oldVal) {
				if (newVal !== oldVal) {
					var rentOffer = _(newVal).find(function(offer) {
						return offer.offerActionType === 'Rent';
					});
					var keepOffer = _(newVal).find(function(offer) {
						return offer.offerActionType === 'Keep';
					});
					// normalize rentOffer and keepOffer
					if (rentOffer && (rentOffer.canRent || rentOffer.canRegisterToRent)) {
						if (keepOffer && rentOffer.isRented) {
							$scope.keepOffer = keepOffer;
						}
						$scope.rentOffer = rentOffer;
					}
				}
			});
		}
	};
});