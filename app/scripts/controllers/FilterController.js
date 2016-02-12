angular.module('defyingGravityApp')
  .controller('FilterController', ["$scope", "types", "aircraftCategories", "PilotService",
    function($scope, types, aircraftCategories, PilotService) {

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
          $scope.setPilots(PilotService.filterPilots($scope.type, $scope.category));
        }
      });

      $scope.$watch('category', function(newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.setPilots(PilotService.filterPilots($scope.type, $scope.category));
        }
      });
    }]);
