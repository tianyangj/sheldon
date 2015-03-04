'use strict';

angular.module('GameFly')

.controller('signupController', function($scope, dropdownService) {

  dropdownService.getHowYouHear().then(function(data) {
  	$scope.surveyOptions = data;
  });

  dropdownService.getStates().then(function(data) {
  	$scope.states = data;
  });

  $scope.signup = function() {
  	console.log($scope)
  };
});
