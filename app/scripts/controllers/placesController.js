'use strict';

angular.module('defyingGravityApp')
  .controller('PlacesController',
    function($scope, PlacesService, Notification) {

      $scope.showPlaceEditor = false;
      $scope.placeToEditId = null;

      $scope.editPlace = editPlace;
      $scope.deletePlace = deletePlace;
      $scope.dismiss = dismiss;
      $scope.getButtonCaption = getButtonCaption;
      $scope.isSaveDisabled = isSaveDisabled;
      $scope.isEdited = isEdited;
      $scope.noPlaces = noPlaces;
      $scope.save = save;

      activate();

      function activate() {
        resetAddress();
        updatePlaces();
      }

      function constructAddressObject(address) {
        return {
          location: address.location,
          coords: {
            lat: address.details.geometry.location.lat(),
            lng: address.details.geometry.location.lng()
          }
        }
      }

      function editPlace(id) {
        $scope.placeToEditId = id;
      }

      function deletePlace(id) {
        PlacesService.deletePlace(id);
        updatePlaces();
        Notification.success('Address deleted');
      }

      function dismiss() {
        resetAddress();
        $scope.placeToEditId = null;
      }

      function getButtonCaption() {
        return $scope.placeToEditId ? 'Change' : 'Add';
      }

      function isSaveDisabled() {
        return !$scope.address.details;
      }

      function isEdited(id) {
        return id === $scope.placeToEditId;
      }

      function resetAddress() {
        $scope.address = {
          location: '',
          options: null,
          details: null
        };
      }

      function noPlaces() {
        return !$scope.userPlaces || $scope.userPlaces === 0;
      }

      function save(id, address) {
        if (id) {
          PlacesService.editPlace(id, constructAddressObject(address));
          Notification.success('Place edited');
          $scope.placeToEditId = null;
        } else {
          PlacesService.addPlace(constructAddressObject(address));
          Notification.success('Place added');
        }
        resetAddress();
        updatePlaces();
      }

      function updatePlaces() {
        PlacesService.getCurrentUserPlaces().then(function(userPlaces) {
          $scope.userPlaces = userPlaces;
        });
      }
    });
