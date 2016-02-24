'use strict';

angular.module('defyingGravityApp')
  .controller('PilotsController',
    function($scope, GoogleMapService, PilotService) {
      $scope.pilots = [];

      $scope.onePanelAtATime = true;
      $scope.isFirstPanelOpen = false;
      $scope.showPilotsList = false;
      $scope.isAddPanelOpen = false;
      $scope.pilotsLoaded = false;

      $scope.getAllPilots = getAllPilots;
      $scope.getPilotsCountMessage = getPilotsCountMessage;
      $scope.isPilotsListDisabled = isPilotsListDisabled;
      $scope.toggleList = toggleList;
      $scope.setPilots = setPilots;

      activate();

      function activate() {
        GoogleMapService.initMap();
        PilotService.loadPilots().then(function(pilots) {
          setPilots(pilots);
          $scope.pilotsLoaded = true;
        });
      }

      function getAllPilots() {
        PilotService.getPilots().then(function(data) {
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
