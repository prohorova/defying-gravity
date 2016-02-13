'use strict';

angular.module('defyingGravityApp')
  .controller('UserController', function($scope, $modal, $timeout, AuthService) {

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
      $scope.userData = null;
    }

    function isLoggedIn() {
      return AuthService.isLoggedIn();
    }

    $scope.$on('userDataChanged', function() {
      $scope.userData = AuthService.getUserData();
    });

  });
