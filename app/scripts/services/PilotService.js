'use strict';

(function() {
    angular.module('defyingGravityApp')

        .service('PilotService', ["$http", "$q", "$firebaseArray", "firebaseUrl", "GoogleMapService",
            function($http, $q, $firebaseArray, firebaseUrl, GoogleMapService) {
            var firebaseRef = new Firebase(firebaseUrl),
                pilotsRef = firebaseRef.child('pilots'),
                pilots = $firebaseArray(pilotsRef);
            return {
                addPilot: addPilot,
                getPilots: getPilots,
                findPilotsByKeyword: findPilotsByKeyword,
                findPilotsInArea: findPilotsInArea,
                filterPilots: filterPilots
            };

            function addPilot(pilot) {
                pilots.$add(pilot);
                GoogleMapService.addNewMarker(pilot);
            }

            function getPilots() {
                var deferred = $q.defer();
                pilots.$loaded().then(function() {
                  console.log(pilots);
                    deferred.resolve(pilots);
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
                pilots.forEach(function(pilot) {
                    if ((!type || pilot.type == type) && (!category || pilot.category == category)) {
                        filteredPilots.push(pilot);
                    }
                });
                return filteredPilots;
            }
        }]);
})();
