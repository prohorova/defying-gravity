angular.module('defyingGravityApp')
  .controller('AddPilotController', ["$scope", "$rootScope", "GoogleMapService", "PilotService", "types", "aircraftCategories", 'Notification',
    function($scope, $rootScope, GoogleMapService, PilotService, types, aircraftCategories, Notification) {

      $scope.types = types;
      $scope.aircraftCategories = aircraftCategories;
      $scope.contactInfoTypes = ['Phone', 'Email', 'Skype', 'Facebook', 'Twitter', 'Instagram'];
      $scope.pilotContactInfos = [{}, {}];

      $scope.isAddressSetOnMap = isAddressSetOnMap;
      $scope.isSaveButtonDisabled = isSaveButtonDisabled;
      $scope.reset = resetPilotData;
      $scope.save = save;

      activate();

      function activate() {
        resetPilotData();
      }

      function getCoordinates () {
        return {
          lat: $scope.pilotAddressDetails.geometry.location.lat(),
          lng: $scope.pilotAddressDetails.geometry.location.lng()
        };
      }

      function isAddressSetOnMap() {
        return !!GoogleMapService.getNewPilotMarker();
      }

      function isSaveButtonDisabled(form) {
        return form.name.$invalid || !$scope.pilotAddressDetails || form.contactType.$invalid ||
          form.contact.$invalid;
      }

      function resetPilotData() {
        $scope.pilotData = {
          type: types.PERSONAL,
          name: '',
          ratings: '',
          location: '',
          category: '',
          information: ''
        };
        $scope.pilotAddress = "";
        $scope.pilotAddressDetails = {};
        $scope.pilotContactInfos = [{}, {}];
      }

      function save() {
        PilotService.addPilot(angular.extend({}, $scope.pilotData, {
          contacts: $scope.pilotContactInfos,
          location: $scope.pilotAddressDetails.formatted_address,
          coords: getCoordinates()
        }));
        resetPilotData();
        Notification.success('New address added to map');
      }
    }]);
