'use strict';

angular.module('GameFly')

.directive('gfButtonBuy', function() {

	return {
		restrict: 'E',
		templateUrl: 'templates/partials/button-buy.html',
		scope: {
			offers: '='
		},
		controller: function($scope, $state) {
			$scope.onPurchase = function() {
				console.log('todo: ', $scope.purchaseAction);
			};
			$scope.$watch('offers', function(newVal, oldVal) {
				if (newVal !== oldVal) {
					var newOffer = _(newVal).find(function(offer) {
						return offer.offerActionType === 'Purchase' && !offer.skuIsUsed;
					});
					var usedOffer = _(newVal).find(function(offer) {
						return offer.offerActionType === 'Purchase' && offer.skuIsUsed;
					});
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