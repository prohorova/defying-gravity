'use strict';

angular.module('defyingGravityApp')
  .controller('LoginController', function($scope, providers, Notification, AuthService) {
    $scope.providers = providers;

    $scope.login = login;

    function login(provider) {
      AuthService.login(provider).then(function() {
        Notification.success('You have logged in successfully');
        $scope.$close();
      }, function() {
        Notification.error('Login failed');
      });
    }
  });
