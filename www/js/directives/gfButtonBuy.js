'use strict';

angular.module('GameFly')

.directive('gfButtonBuy', function() {

	return {
		restrict: 'E',
		templateUrl: 'templates/partials/button-buy.html',
		scope: {
			product: '='
		},
		controller: function($scope, $state, $ionicPopup, $ionicActionSheet, $filter, cartService) {

			function addCart(skuId) {
				cartService.add(skuId).then(function() {
					$ionicPopup.confirm({
						title: $scope.product.title + ' has been added to your cart.',
						template: 'Do you want to go to your cart?'
					}).then(function(res) {
						if (res) {
							$state.go('app.cart');
						}
						// update purchaseAction to InCart status
						$scope.purchaseAction = 'In-Cart';
					});
				}, function(response) {
					$ionicPopup.alert({
						title: 'Error',
						template: response.data.failureError.message
					});
				});
			}

			function showSelection() {
				$ionicActionSheet.show({
					buttons: [{
						text: 'Buy NEW ' + $filter('gfPrice')($scope.newOffer.purchasePrice)
					}, {
						text: 'Buy USED ' + $filter('gfPrice')($scope.usedOffer.purchasePrice)
					}],
					cancelText: 'Cancel',
					buttonClicked: function(index) {
						if (index === 0) {
							addCart($scope.newOffer.skuId);
						} else if (index === 1) {
							addCart($scope.usedOffer.skuId);
						}
						return true;
					}
				});
			}

			$scope.onPurchase = function() {
				switch ($scope.purchaseAction) {
					case 'In-Cart':
						$state.go('app.cart');
						break;
					case 'Buy':
						showSelection();
						break;
					case 'Buy-Used':
						addCart($scope.usedOffer.skuId);
						break;
					case 'Buy-New':
					case 'Pre-Order':
						addCart($scope.newOffer.skuId);
						break;
				}
			};

			$scope.$watch('product.offerActions', function(newVal, oldVal) {
				if (newVal !== oldVal) {
					var newOffer = _(newVal).find(function(offer) {
						return offer.offerActionType === 'Purchase' && !offer.skuIsUsed;
					});
					var usedOffer = _(newVal).find(function(offer) {
						return offer.offerActionType === 'Purchase' && offer.skuIsUsed;
					});
					// normalize newOffer and usedOffer
					if (newOffer && usedOffer) {
						if (newOffer.isAlreadyInCart && usedOffer.isAlreadyInCart) {
							$scope.purchaseAction = 'In-Cart';
						} else if (newOffer.isAlreadyInCart && !usedOffer.isAlreadyInCart) {
							$scope.purchaseAction = 'Buy-Used';
						} else if (!newOffer.isAlreadyInCart && usedOffer.isAlreadyInCart) {
							$scope.purchaseAction = 'Buy-New';
						} else {
							$scope.purchaseAction = 'Buy';
						}
						$scope.newOffer = newOffer;
						$scope.usedOffer = usedOffer;
					} else if (newOffer && !usedOffer) {
						if (newOffer.isPreorderOffer) {
							$scope.purchaseAction = 'Pre-Order';
						} else {
							$scope.purchaseAction = 'Buy-New';
						}
						$scope.newOffer = newOffer;
					} else if (usedOffer && !newOffer) {
						$scope.purchaseAction = 'Buy-Used';
						$scope.usedOffer = usedOffer;
					}
				}
			});
		}
	};
});