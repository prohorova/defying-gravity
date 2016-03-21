'use strict';

angular.module('defyingGravityApp')

  .factory("ProfileService", function ($rootScope, $q, $firebaseAuth, FirebaseService, AuthService, types) {
    var firebaseRef = FirebaseService.getFirebaseRef(),
      usersRef = firebaseRef.child('users'),
      profile = null;

    return {
      getUserProfile: getUserProfile,
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
      usersRef.child(id + '/profile').set(userProfile, function(error) {
        if (!error) {
          deferred.resolve();
        } else {
          deferred.reject(error);
        }
      });
      return deferred.promise;
    }

    function getUserProfile() {
      var deferred = $q.defer();
      if (profile) {
        deferred.resolve(profile);
      } else {
        getCurrentUserProfile().then(function(profile) {
          deferred.resolve(profile);
        }, function() {
          deferred.reject();
        });
      }
      return deferred.promise;
    }

    function retrieveOrCreateUserProfile(userData) {
      var deferred = $q.defer();
      findUserProfile(userData.id).then(function(data) {
        if (data) {
          deferred.resolve(data);
        } else {
          var newUser = constructUserProfile(userData);
          createUserProfile(userData.id, newUser).then(function() {
            deferred.resolve(newUser);
          }, function(error) {
            deferred.reject(error);
          });
        }
      });
      return deferred.promise;
    }


    function getCurrentUserProfile() {
      var deferred = $q.defer(),
        userData = AuthService.getUserData();
      if (profile) {
        deferred.resolve(user);
      } else if (userData) {
        retrieveOrCreateUserProfile(userData).then(function(data) {
          profile = data;
          deferred.resolve(profile);
        });
      }
      return deferred.promise;
    }

    function findUserProfile(id) {
      var deferred = $q.defer();
      usersRef.child(id + '/profile').once("value", function(snapshot) {
        deferred.resolve(snapshot.val());
      });
      return deferred.promise;
    }

    function updateUserProfile(newProfile) {
      var deferred = $q.defer();
      usersRef.child(AuthService.getUserId() + '/profile').update(newProfile, function(error) {
        if (error) {
          deferred.reject();
        } else {
          profile = newProfile;
          deferred.resolve();
        }
      });
      return deferred.promise;
    }
  });
