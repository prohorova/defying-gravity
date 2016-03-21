'use strict';

angular.module('defyingGravityApp')
  .controller('PilotsController',
    function($scope, GoogleMapService, PilotsService) {
      $scope.pilots = [];
      $scope.users = {};
      $scope.onePanelAtATime = true;
      $scope.isFirstPanelOpen = false;
      $scope.showPilotsList = false;
      $scope.isAddPanelOpen = false;
      $scope.pilotsLoaded = false;

      $scope.groupByUsers = groupByUsers;
      $scope.getAllPilots = getAllPilots;
      $scope.getPilotsCountMessage = getPilotsCountMessage;
      $scope.isPilotsListDisabled = isPilotsListDisabled;
      $scope.toggleList = toggleList;
      $scope.setPilots = setPilots;

      activate();

      function activate() {
        GoogleMapService.initMap();
        PilotsService.loadPilots().then(function(pilots) {
          setPilots(pilots);
          groupByUsers();
          $scope.pilotsLoaded = true;
        });
      }

      function groupByUsers() {
        var users = {};
        _.forEach($scope.pilots, function(pilot) {
            if (users[pilot.id]) {
              users[pilot.id].places.push(pilot.place);
            } else {
              users[pilot.id] = {profile: pilot.profile, places: [pilot.place],
                  notRealUser: pilot.notRealUser};
            }
        });
        $scope.users = users;
      }

      function getAllPilots() {
        PilotsService.getPilots().then(function(data) {
          setPilots(data);
        });
      }

      function getPilotsCountMessage() {
        return $scope.pilots.length === 1 ? $scope.pilots.length + ' result found' : $scope.pilots.length + ' results found';
      }

      function isPilotsListDisabled() {
        return $scope.pilots.length === 0;
      }

      function toggleList() {
        $scope.showPilotsList = !$scope.showPilotsList;
      }

      function setPilots(data) {
        $scope.pilots = data;
        GoogleMapService.setMarkers($scope.pilots);
      }

    });
