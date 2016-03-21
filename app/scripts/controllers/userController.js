'use strict';

angular.module('defyingGravityApp')
  .controller('UserController', function($scope, AuthService, Notification, LoginService) {

    $scope.openLoginModal = openLoginModal;
    $scope.logout = logout;
    $scope.isLoggedIn = isLoggedIn;

    function openLoginModal() {
      LoginService.openLoginWindow();
    }

    function logout() {
      AuthService.logout();
      Notification.success('You have logged out');
    }

    function isLoggedIn() {
      return AuthService.isLoggedIn();
    }

    $scope.$on('userChanged', function() {
      $scope.userData = AuthService.getUserData();
    });

  });
