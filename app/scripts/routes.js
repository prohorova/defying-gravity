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
})

.run(function($rootScope, $state, AuthService) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
    if (toState.requiresLogin && !AuthService.isLoggedIn()) {
      event.preventDefault();
      if (fromState.name) {
        $state.transitionTo(fromState.name);
      } else {
        $state.transitionTo('pilots');
      }
    }
  });

  $rootScope.$on('userChanged', function() {
    if (!AuthService.isLoggedIn() && $state.current.requiresLogin) {
      $state.transitionTo('pilots');
    }
  });
});
