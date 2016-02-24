'use strict';

angular.module('defyingGravityApp')
  .controller('UserController', function($scope, $modal, $timeout, AuthService, Notification) {

    $scope.openLoginModal = openLoginModal;
    $scope.logout = logout;
    $scope.isLoggedIn = isLoggedIn;

    function openLoginModal() {
      $modal.open({
        size: 'sm',
        templateUrl: 'views/login-modal.html',
        controller: 'LoginController'
      })
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
