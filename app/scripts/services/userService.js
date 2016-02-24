'use strict';

angular.module('defyingGravityApp')

  .factory("UserService", function ($rootScope, $q, $firebaseAuth, FirebaseService, AuthService, types) {
    var firebaseRef = FirebaseService.getFirebaseRef(),
      userRef = firebaseRef.child('users'),
      userProfile = null;

    return {
      getCurrentUserProfile: getCurrentUserProfile,
      getUserId: getUserId,
      findUserProfile: findUserProfile,
      updateUserProfile: updateUserProfile
    };


    function constructUserProfile(userData) {
      var newProfile = {
        login: userData.login,
        name: userData.login,
        type: types.PERSONAL
      };
      if (userData.email) {
        angular.extend(newProfile, {email: userData.email});
      }
      return newProfile;
    }

    function createUserProfile(id, userProfile) {
      var deferred = $q.defer();
      userRef.child(id).set(userProfile, function(error) {
        if (!error) {
          deferred.resolve();
        } else {
          deferred.reject(error);
        }
      });
      return deferred.promise;
    }

    function retrieveOrCreateUserProfile(userData) {
      var deferred = $q.defer();
      findUserProfile(userData.id).then(function(data) {
        if (data) {
          deferred.resolve(data);
        } else {
          var newUserProfile = constructUserProfile(userData);
          createUserProfile(userData.id, newUserProfile).then(function() {
            deferred.resolve(newUserProfile);
          }, function(error) {
            deferred.reject(error);
          });
        }
      });
      return deferred.promise;
    }

    function getUserProfile(id) {

    }

    function getCurrentUserProfile() {
      var deferred = $q.defer(),
          userData = AuthService.getUserData();
      if (userProfile) {
        deferred.resolve(userProfile);
      } else if (userData) {
        retrieveOrCreateUserProfile(userData).then(function(data) {
          userProfile = data;
          deferred.resolve(userProfile);
        });
      }
      return deferred.promise;
    }

    function getUserId() {
      return userData ? userData.id : null;
    }

    function findUserProfile(id) {
      var deferred = $q.defer();
      userRef.child(id).once("value", function(snapshot) {
        deferred.resolve(snapshot.val());
      });
      return deferred.promise;
    }

    function updateUserProfile(profile) {
      var deferred = $q.defer();
      userRef.child(AuthService.getUserId()).update(profile, function() {
        userProfile = profile;
        deferred.resolve();
      });
      return deferred.promise;
    }
  });
