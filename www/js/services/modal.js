'use strict';

angular.module('GameFly')

.factory('modalService', function($ionicModal) {

  var modals = {};

  var show = function(name, scope) {
    if (modals[name]) {
      modals[name].show();
    } else {
      var templateUrl = 'templates/modals/' + name + '.html';
      $ionicModal.fromTemplateUrl(templateUrl, {
        scope: scope
      }).then(function(modal) {
        modals[name] = modal;
        modals[name].show();
      });
    }
  };

  var hide = function(name) {
    modals[name].hide();
  };

  var remove = function(name) {
    modals[name].remove();
    modals[name] = null;
  };

  return {
    show: show,
    hide: hide,
    remove: remove
  };
});