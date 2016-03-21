'use strict';

angular
  .module('defyingGravityApp').config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('pilots', {
      url: '/',
      templateUrl: 'views/pilots.html',
      controller: 'PilotsController'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'views/profile.html',
      requiresLogin: true
    })
    .state('messages', {
      url: '/messages',
      templateUrl: 'views/messages.html',
      requiresLogin: true
    })
})

.run(function($rootScope, $state, AuthService, LoginService) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
    if (toState.requiresLogin && !AuthService.isLoggedIn()) {
        console.log('not logged in');
        event.preventDefault();
        LoginService.loginAsynch().then(function() {
            $state.transitionTo(toState.name, toParams);
        });
    }
  });

  $rootScope.$on('userChanged', function() {
    if (!AuthService.isLoggedIn() && $state.current.requiresLogin) {
      $state.transitionTo('pilots');
    }
  });

  $rootScope.sendMessage = function(userId) {
      $state.transitionTo('messages', {userId: userId});
  }
});
