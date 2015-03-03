'use strict';

angular.module('GameFly')

.controller('queueController', function($scope, queueService) {

  queueService.get().then(function(data) {
		$scope.itemsOut = data.itemsOut;
		$scope.itemsQueued = data.itemsQueued;
  });

  $scope.isDelete = false;
  $scope.isReorder = false;

  $scope.enableDelete = function() {
  	$scope.isDelete = !$scope.isDelete;
  	$scope.isReorder = false;
  };

  $scope.enableReorder = function() {
  	$scope.isReorder = !$scope.isReorder;
  	$scope.isDelete = false;
  };

  $scope.delete = function(item) {
  	$scope.itemsQueued.splice($scope.itemsQueued.indexOf(item), 1);
  	queueService.modify($scope.itemsQueued.map(function(item) {
  		return item.id;
  	}));
  };

  $scope.reorder = function(item, from, to) {
  	$scope.itemsQueued.splice(from, 1);
  	$scope.itemsQueued.splice(to, 0, item);
  	queueService.modify($scope.itemsQueued.map(function(item) {
  		return item.id;
  	}));
  };
});
