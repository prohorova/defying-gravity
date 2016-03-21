'use strict';

angular.module('defyingGravityApp')
  .controller('FilterController',
    function($scope, types, aircraftCategories, PilotsService) {

      $scope.types = types;
      $scope.aircraftCategories = aircraftCategories;

      $scope.reset = reset;

      function reset() {
        $scope.type = '';
        $scope.category = '';
        $scope.getAllPilots();
      }

      $scope.$watch('type', function(newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.setPilots(PilotsService.filterPilots($scope.type, $scope.category));
        }
      });

      $scope.$watch('category', function(newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.setPilots(PilotsService.filterPilots($scope.type, $scope.category));
        }
      });
    });
