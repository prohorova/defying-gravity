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
      controller: 'ProfileController'
    })
});
