'use strict';

angular.module('defyingGravityApp')
    .factory('PlacesService',
    function($q, AuthService, FirebaseService) {
        var firebaseRef = FirebaseService.getFirebaseRef();
        return {
            getInboxMessages: getInboxMessages,
            getOutboxMessages: getOutboxMessages
        };


        function getInboxMessages() {
            getInboxMessagesRef().on('value', function(snapshot) {

            });
        }

        function getInboxMessagesRef() {
            return firebaseRef.child(AuthService.getUserId()).child('messages');

        }


    });
