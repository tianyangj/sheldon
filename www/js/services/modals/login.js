'use strict';

angular.module('GameFly')

.factory('loginModal', function($ionicModal) {

  var loginModal;

  var show = function() {
    if (loginModal) {
      loginModal.show();
    } else {
      $ionicModal.fromTemplateUrl('templates/login.html').then(function(modal) {
        loginModal = modal;
        loginModal.show();
      });
    }
  };

  var hide = function() {
    loginModal.hide();
  };

  return {
    show: show,
    hide: hide
  };
});
