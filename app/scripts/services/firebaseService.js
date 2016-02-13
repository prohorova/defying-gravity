'use strict';

angular.module('defyingGravityApp')

  .factory("FirebaseService", function (firebaseUrl) {
    var firebaseRef = new Firebase(firebaseUrl);
    return {
      getFirebaseRef: getFirebaseRef
    };

    function getFirebaseRef() {
      return firebaseRef;
    }
  });
