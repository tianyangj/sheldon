'use strict';

angular.module('GameFly')

.directive('gfOffer', function() {

	return {
		restrict: 'E',
		templateUrl: 'templates/partials/offer1.html',
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
			$scope.onPurchase = function() {
				console.log('todo: ', $scope.purchaseAction);
			};
			$scope.$watch('offers', function(newVal, oldVal) {
				if (newVal !== oldVal) {
					var rentOffer = _(newVal).find(function(offer) {
						return offer.offerActionType === 'Rent';
					});
					var newOffer = _(newVal).find(function(offer) {
						return offer.offerActionType === 'Purchase' && !offer.skuIsUsed;
					});
					var usedOffer = _(newVal).find(function(offer) {
						return offer.offerActionType === 'Purchase' && offer.skuIsUsed;
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
					// normalize newOffer and usedOffer
					if (newOffer && usedOffer) {
						$scope.purchaseAction = 'Buy';
						$scope.newOffer = newOffer;
						$scope.usedOffer = usedOffer;
					} else if (newOffer && !usedOffer) {
						if (newOffer.isPreorderOffer) {
							$scope.purchaseAction = 'Pre-Order';
							$scope.newOffer = newOffer;
						} else {
							$scope.purchaseAction = 'Buy New';
							$scope.newOffer = newOffer;
						}
					} else if (usedOffer && !newOffer) {
						$scope.purchaseAction = 'Buy Used';
						$scope.usedOffer = usedOffer;
					}
				}
			});
		}
	};
});