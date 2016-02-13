'use strict';

angular.module('defyingGravityApp')
  .value('firebaseUrl', 'https://pilot-app-test.firebaseio.com/')

  .value("defaultGeolocation", {lat: 36.2490413, lng: -113.7048059})

  .value('providers', {
    'TWITTER': 'twitter',
    'FACEBOOK': 'facebook',
    'GOOGLE': 'google'
  })

  .value('mapId', 'map')

  .value('types', {
    'PERSONAL': 'personal',
    'BUSINESS': 'business'
  })

  .value('aircraftCategories', ['airplane - single-engine land', 'airplane - multi-engine land',
    'airplane - single-engine sea', 'airplane - multi-engine sea', 'rotorcraft - helicopter',
    'rotorcraft - gyroplane', 'glider', 'lighter than air - airship', 'lighter than air - balloon',
    'powered lift', 'powered parachute land', 'powered parachute sea', 'weight-shift-control Land',
    'weight-shift-control sea', 'other']);
