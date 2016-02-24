'use strict';

angular.module('defyingGravityApp')
  .controller('ProfileController',
    function($scope, types, aircraftCategories, UserService, Notification) {
      var profile;
      $scope.types = types;
      $scope.aircraftCategories = aircraftCategories;

      updateProfile();

      $scope.isSaveDisabled = isSaveDisabled;
      $scope.isResetDisabled = isResetDisabled;
      $scope.reset = reset;
      $scope.save = save;

      function isSaveDisabled(profileForm) {
        return profileForm.$invalid || (angular.equals(profile, $scope.profile));
      }

      function isResetDisabled() {
        return angular.equals(profile, $scope.profile);
      }

      function reset() {
        $scope.profile = angular.copy(profile);
      }

      function save(profile) {
        UserService.updateUserProfile(profile).then(function() {
          Notification.success('Profile successfully updated');
          updateProfile();
        });
      }

      function updateProfile() {
        UserService.getCurrentUserProfile().then(function(data) {
          profile = data;
          $scope.profile = angular.copy(profile);
        });
      }

    });
