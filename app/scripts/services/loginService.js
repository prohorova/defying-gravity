'use strict';

angular.module('defyingGravityApp')

  .factory("LoginService", function ($q, $modal, $rootScope, AuthService) {
        var loginWindow;

        return {
          openLoginWindow: openLoginWindow,
          loginAsynch: loginAsynch
        };

        function openLoginWindow() {
            initLoginWindow();
        }

        function loginAsynch() {
            var deferred = $q.defer();
            initLoginWindow();
            loginWindow.result.then(function() {
                if (AuthService.isLoggedIn()) {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            });
            return deferred.promise;
        }

        function initLoginWindow() {
            loginWindow = $modal.open({
                size: 'sm',
                templateUrl: 'views/login-modal.html',
                controller: 'LoginController'
            });
        }


  });
