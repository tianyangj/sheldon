'use strict';

angular.module('GameFly')

.directive('gfButtonRent', function() {

	return {
		restrict: 'E',
		templateUrl: 'templates/partials/button-rent.html',
		scope: {
			product: '='
		},
		controller: function($scope, $state, $ionicPopup, queueService, cartService) {

			function showConfirmation() {
				$ionicPopup.confirm({
					title: $scope.product.title + ' has been added to your queue.',
					template: 'Do you want to go to your queue?'
				}).then(function(res) {
					if (res) {
						$state.go('app.queue');
					}
					// update rentOffer InQueue status
					$scope.rentOffer.isAlreadyInQueue = true;
				});
			}

			function showCartConfirmation() {
				$ionicPopup.confirm({
					title: $scope.product.title + ' has been added to your cart.',
					template: 'Do you want to go to your cart?'
				}).then(function(res) {
					if (res) {
						$state.go('app.cart');
					}
				});
			}

			function showPlatform() {
				$ionicPopup.show({
					title: $scope.product.platform.name + ' is NOT in your system!',
					template: 'Would you like to add ' + $scope.product.platform.name + ' to your system now?',
					buttons: [{
						text: 'Yes, and this title',
						type: 'button-positive',
						onTap: function() {
							return queueService.add($scope.product.id, true, true);
						}
					}, {
						text: 'No, just this title',
						type: 'button-positive',
						onTap: function() {
							return queueService.add($scope.product.id, true);
						}
					}]
				}).then(function(response) {
					showConfirmation();
				});
			}

			function showError(message) {
				$ionicPopup.alert({
					title: 'Error',
					template: message
				});
			}

			$scope.onRent = function() {
				if ($scope.rentOffer.isAlreadyInQueue) {
					$state.go('app.queue');
				} else if ($scope.rentOffer.isRented) {
					cartService.add($scope.keepOffer.skuId, true).then(function() {
						showCartConfirmation();
					}, function(response) {
						if (response.status === 409) {
							switch (response.data.failureError.id) {
								case 603:
									showError('This title is already in cart.');
									break;
							}
						} else {
							showError(response.data.failureError.message);
						}
					});
				} else {
					queueService.add($scope.product.id).then(function() {
						showConfirmation();
					}, function(response) {
						if (response.status === 409) {
							switch (response.data.failureError.id) {
								case 201:
									showError('This title is already in queue.');
									break;
								case 204:
									showPlatform();
									break;
							}
						} else {
							showError(response.data.failureError.message);
						}
					});
				}
			};

			$scope.$watch('product.offerActions', function(newVal, oldVal) {
				if (newVal || newVal !== oldVal) {
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