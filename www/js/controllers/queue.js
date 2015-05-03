'use strict';

angular.module('GameFly')

  .controller('QueueController', function ($scope, queueService) {

  queueService.get().then(function (data) {
    $scope.itemsOut = data.itemsOut;
    $scope.itemsQueued = data.itemsQueued;
  });

  $scope.edit = {
    text: 'Edit',
    showDelete: false,
    showReorder: false
  };

  $scope.onEdit = function () {
    $scope.edit.text = $scope.edit.showDelete ? 'Edit' : 'Done';
    $scope.edit.showDelete = !$scope.edit.showDelete;
    $scope.edit.showReorder = !$scope.edit.showReorder;
  };

  $scope.delete = function (item) {
    $scope.itemsQueued.splice($scope.itemsQueued.indexOf(item), 1);
    queueService.modify($scope.itemsQueued.map(function (item) {
      return item.id;
    }));
  };

  $scope.reorder = function (item, from, to) {
    $scope.itemsQueued.splice(from, 1);
    $scope.itemsQueued.splice(to, 0, item);
    queueService.modify($scope.itemsQueued.map(function (item) {
      return item.id;
    }));
  };
});
