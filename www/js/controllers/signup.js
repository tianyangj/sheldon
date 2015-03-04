'use strict';

angular.module('GameFly')

.controller('signupController', function($scope, dropdownService, accountService) {

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
  		emailAddress: user.email,
  		password: user.password,
  		howDidYouHearAboutAnswer: user.surveyOption.key,
  		signInOnCreation: true
  	}).then(function() {
  		console.log('creation success', arguments)
  	}, function() {
  		console.log('creation failed', arguments)
  	});
  };
});
