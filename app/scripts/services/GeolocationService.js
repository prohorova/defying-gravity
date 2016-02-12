'use strict';

angular.module('defyingGravityApp')

  .factory("GeolocationService", ["$q", "$rootScope", function ($q, $rootScope) {
    return {
      getCurrentGeolocation: getCurrentGeolocation
    };

    function getCurrentGeolocation() {
      var deferred = $q.defer(),
        geolocation;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (currentGeolocation) {
          $rootScope.$apply(function () {
            geolocation = {
              lat: currentGeolocation.coords.latitude,
              lng: currentGeolocation.coords.longitude
            };
            deferred.resolve(geolocation);
          });
        }, function () {
          deferred.reject();
        });
      } else {
        deferred.reject();
      }
      return deferred.promise;
    }
  }]);
