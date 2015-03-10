'use strict';

angular.module('GameFly')

.controller('signupController', function($scope, dropdownService, accountService) {

  $scope.user = {};
  $scope.address = {};

  dropdownService.getHowYouHear().then(function(data) {
  	$scope.surveyOptions = data;
  });

  dropdownService.getStates().then(function(data) {
  	$scope.states = data;
  });

  $scope.signup = function() {
  	console.log($scope)
  	accountService.createAccount({
  		applicationSourceId: 1,
  		emailAddress: $scope.user.email,
  		password: $scope.user.password,
  		howDidYouHearAboutAnswer: $scope.user.surveyOption.key,
  		signInOnCreation: true
  	}).then(function() {
      console.log('creation success', arguments)
  		accountService.addShippingAddress($scope.address, false).then(function() {
        console.log('address added', arguments);
      }, function() {
        console.log('address failed', arguments);
      });
  	}, function() {
  		console.log('creation failed', arguments)
  	});
  };
});
