'use strict';

(function() {
    angular.module('defyingGravityApp')

        .service('PilotsService',
            function($http, $q, $firebaseArray, FirebaseService, GoogleMapService) {
            var firebaseRef = FirebaseService.getFirebaseRef(),
                usersRef = firebaseRef.child('users'),
                pilots = [];
              return {
                getPilots: getPilots,
                loadPilots: loadPilots,
                findPilotsInArea: findPilotsInArea,
                filterPilots: filterPilots
              };

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
                pilots = [];
                usersRef.on('value', function(snapshot) {
                  var users = snapshot.val();
                  _.forEach(users, function(user, id) {
                    _.forEach(user.places, function(place) {
                      pilots.push({id: id, profile: user.profile, place: place, notRealUser: user.notRealUser});
                    });
                  });
                  deferred.resolve(pilots);
                });
                return deferred.promise;
              }

              function findPilotsInArea(coords, radius) {
                var foundPilots = [];
                pilots.forEach(function(pilot) {
                  if (getDistance(coords, pilot.place.coords) <= radius) {
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
                  if ((!type || pilot.profile.type == type) &&
                    (!category || pilot.profile.category == category)) {
                    filteredPilots.push(pilot);
                  }
                });
                return filteredPilots;
              }
        });


})();
