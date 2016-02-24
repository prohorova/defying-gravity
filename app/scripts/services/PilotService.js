'use strict';

(function() {
    angular.module('defyingGravityApp')

        .service('PilotService',
            function($http, $q, $firebaseArray, FirebaseService, GoogleMapService, AuthService, UserService) {
            var firebaseRef = FirebaseService.getFirebaseRef(),
                placesRef = firebaseRef.child('places'),
                pilots;
              return {
                addPlace: addPlace,
                deletePlace: deletePlace,
                editPlace: editPlace,
                getCurrentUserPlaces: getCurrentUserPlaces,
                getPilots: getPilots,
                loadPilots: loadPilots,
                findPilotsByKeyword: findPilotsByKeyword,
                findPilotsInArea: findPilotsInArea,
                filterPilots: filterPilots
              };

              function addPlace(place) {
                placesRef.child(AuthService.getUserId()).push(place);
              }

              function deletePlace(id) {
                placesRef.child(AuthService.getUserId()).child(id).remove();
              }

              function editPlace(id, place) {
                placesRef.child(AuthService.getUserId()).child(id).update(place);
              }

              function getUserPlaces(userId) {
                var deferred = $q.defer();
                var userPlacesRef = placesRef.child(userId);
                userPlacesRef.on('value', function(snapshot) {
                  deferred.resolve(snapshot.val());
                });
                return deferred.promise;
              }

              function getCurrentUserPlaces() {
                return getUserPlaces(AuthService.getUserId());
              }

              function getPilots() {
                var deferred = $q.defer();
                if (pilots) {
                  deferred.resolve(pilots);
                } else {
                  loadPilots().then(function() {
                    deferred.resolve(pilots);
                  });
                }
                return deferred.promise;
              }

              function loadPilots() {
                var deferred = $q.defer();
                placesRef.once('value', function(snapshot) {
                  var data = snapshot.val(),
                    requests = [],
                    arr = [];
                  angular.forEach(data, function(places, userId) {
                      var request = UserService.findUserProfile(userId).then(function(profile) {
                        angular.forEach(places, function(place) {
                          arr.push(angular.extend({}, profile, place));
                        });
                      });
                    requests.push(request);
                  });
                  $q.all(requests).then(function() {
                    pilots = arr;
                    deferred.resolve(pilots);
                  }, function() {
                    deferred.reject();
                  });
                });
                return deferred.promise;
              }

              function findPilotsByKeyword(keyword) {
                var foundPilots = [];
                pilots.forEach(function(pilot) {
                  if (pilot.name.indexOf(keyword) > -1 ||
                    pilot.location && pilot.location.indexOf(keyword) > -1 ||
                    pilot.info && pilot.info.indexOf(keyword) > -1) {
                    foundPilots.push(pilot);
                  }
                });
                return foundPilots;
              }

              function findPilotsInArea(coords, radius) {
                var foundPilots = [];
                pilots.forEach(function(pilot) {
                  if (getDistance(coords, pilot.coords) <= radius) {
                    foundPilots.push(pilot);
                  }
                });
                return foundPilots;
              }

              function getPositionObject(coords) {
                return new google.maps.LatLng({
                  lat: coords.lat,
                  lng: coords.lng
                });
              }

              function getDistance(position1, position2) {
                return google.maps.geometry.spherical.computeDistanceBetween(
                  getPositionObject(position1),
                  getPositionObject(position2)
                );
              }

              function filterPilots(type, category) {
                var filteredPilots = [];
                GoogleMapService.removeSearchArea();
                pilots.forEach(function(pilot) {
                  if ((!type || pilot.type == type) && (!category || pilot.category == category)) {
                    filteredPilots.push(pilot);
                  }
                });
                return filteredPilots;
              }
        });


})();
