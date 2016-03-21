'use strict';

angular.module('defyingGravityApp')

  .factory("AuthService", function ($rootScope, $q, $firebaseAuth, FirebaseService) {
    var firebaseRef = FirebaseService.getFirebaseRef(),
      authObj = $firebaseAuth(firebaseRef),
      userData;

    authObj.$onAuth(function(data) {
      userData = data ? constructUserData(data) : null;
      $rootScope.$broadcast('userChanged');
    });

    return {
      getUserData: getUserData,
      getUserId: getUserId,
      login: login,
      logout: logout,
      isLoggedIn: isLoggedIn
    };

    function constructUserData(data) {
      return  {
        id: data.uid,
        login: data[data.provider].displayName,
        profileImgUrl: data[data.provider].profileImageURL,
        email: data[data.provider].email
      };
    }

    function getUserData() {
      return userData;
    }

    function getUserId() {
      return userData.id;
    }

    function login(provider) {
      var deferred = $q.defer();
      authObj.$authWithOAuthPopup(provider).then(function(data) {
        deferred.resolve(constructUserData(data));
      }).catch(function(error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }

    function logout() {
      authObj.$unauth();
    }

    function isLoggedIn() {
      return !!firebaseRef.getAuth();
    }

  });
