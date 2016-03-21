'use strict';

angular.module('defyingGravityApp')
  .controller('SearchController',
    function($scope, PilotsService, GoogleMapService) {

      $scope.searchParams = {
        searchAddress: undefined,
        searchAddressDetails: undefined,
        searchAddressOptions: {},
        searchAreaRadius: undefined,
        keyword: ""
      };

      $scope.areasOfSearch = [{
        name: 'within 10 km',
        valueInMeters: 10000
      }, {
        name: 'within 100 km',
        valueInMeters: 100000
      }, {
        name: 'within 200 km',
        valueInMeters: 200000
      }];

      $scope.searchParams.searchAreaRadius = $scope.areasOfSearch[1].valueInMeters;

      $scope.isSearchButtonDisabled = isSearchButtonDisabled;
      $scope.searchForCurrentPosition = searchForCurrentPosition;
      $scope.reset = reset;
      $scope.searchPilots = searchPilots;

      function isSearchButtonDisabled() {
        return !$scope.searchParams.searchAddressDetails;
      }

      function searchForCurrentPosition() {
        GeolocationService.getCurrentGeolocation().then(function(position) {
          searchPilotsByPosition(position, $scope.searchParams.searchAreaRadius);
        })
      }

      function searchPilots() {
        var searchAddressDetails = $scope.searchParams.searchAddressDetails;
        var position = {
          lat: searchAddressDetails.geometry.location.lat(),
          lng: searchAddressDetails.geometry.location.lng()
        };
        searchPilotsByPosition(position, $scope.searchParams.searchAreaRadius);
      }

      function searchPilotsByPosition(position, radius) {
        GoogleMapService.removeSearchArea();
        $scope.setPilots(PilotsService.findPilotsInArea(position, radius));
        GoogleMapService.setSearchArea(position, radius);
      }

      function reset() {
        $scope.searchParams.searchAddress = undefined;
        $scope.searchParams.searchAddressDetails = undefined;
        $scope.searchAreaRadius = $scope.areasOfSearch[1].valueInMeters;
        GoogleMapService.removeSearchArea();
        $scope.getAllPilots();
      }
    });
