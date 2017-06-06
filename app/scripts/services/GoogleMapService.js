'use strict';

angular.module('defyingGravityApp')

    .factory("GoogleMapService",
    function (defaultGeolocation, mapId, $rootScope, $compile) {
        var map,
            markerCluster,
            pilotMarkerInfoWindow,
            searchCircle,
            bounds;
        return {
            addNewMarker: addNewMarker,
            initMap: initMap,
            setMarkers: setMarkers,
            setSearchArea: setSearchArea,
            removeSearchArea: removeSearchArea
        };

        function addMarker(pilot) {
            var marker = new google.maps.Marker({
                position: pilot.place.coords,
                icon: 'images/map-marker.png'
            });
            marker.addListener('click', function () {
                if (!pilotMarkerInfoWindow) {
                    createPilotMarkerInfoWindow();
                }
                pilotMarkerInfoWindow.setContent(createPilotMarkerInfoWindowContent(pilot));
                pilotMarkerInfoWindow.open(map, marker);
                map.setCenter(marker.getPosition());
            });
            bounds.extend(marker.getPosition());
            markerCluster.addMarker(marker);
        }

        function addNewMarker(pilot) {
            addMarker(pilot);
            map.setCenter(pilot.place.coords);
        }

        function initMap() {
            map = new google.maps.Map(document.getElementById(mapId), {
                center: defaultGeolocation,
                zoom: 6,
                mapTypeControl: false
            });
            markerCluster = new MarkerClusterer(map, [], {
                styles: [{
                    url: 'images/circle.png',
                    width: 32,
                    height: 32,
                    textColor: '#fff'
                }]
            });
        }

        function createPilotMarkerInfoWindow() {
            pilotMarkerInfoWindow = new google.maps.InfoWindow({
                map: map,
                maxWidth: 400
            });
        }

        function createPilotMarkerInfoWindowContent(pilot) {
            var contentString = "<div><p><b>Name: </b>" + pilot.profile.name + "</p>";
            if (pilot.profile.type) {
                contentString += "<p><b>Type: </b>" + pilot.profile.type + "</p>";
            }
            if (pilot.profile.ratings) {
                contentString += "<p><b>Ratings: </b>" + pilot.profile.ratings + "</p>";
            }
            contentString += "<p><b>Location: </b>" + pilot.place.location + "</p>";
            if (pilot.profile.category) {
                contentString += "<p><b>Category: </b>" + pilot.profile.category + "</p>";
            }
            if (pilot.profile.info) {
                contentString += "<p><b>Information: </b>" + pilot.profile.info + "</p>";
            }
            if (pilot.profile.email) {
                contentString += "<p><b>Email: </b><a href='mailto:" + pilot.profile.email + "'>" + pilot.profile.email + "</a></p>";
            }
            if (pilot.profile.phone) {
                contentString += "<p><b>Phone: </b><a href='skype:" + pilot.profile.phone + "?call'>" + pilot.profile.phone + "</a></p>";
            }
            if (pilot.profile.skype) {
                contentString += "<p><b>Skype: </b><a href='skype:" + pilot.profile.skype + "?call'>" + pilot.profile.skype + "</a></p>";
            }
            if (pilot.profile.facebook) {
                contentString += "<p><b>Facebook: </b>" + pilot.profile.facebook + "</p>";
            }
            if (pilot.profile.twitter) {
                contentString += "<p><b>Twitter: </b>" + pilot.profile.twitter + "</p>";
            }
            if (pilot.profile.instagram) {
                contentString += "<p><b>Information: </b>" + pilot.profile.instagram + "</p>";
            }
            if (!pilot.notRealUser) {
                contentString += "<a href='#' id='send-message' ng-click=sendMessage('" + pilot.id + "')>SEND MESSAGE</a>";
            }
            contentString += '</div>';
            return $compile(contentString)($rootScope)[0];
        }

        function fitBounds() {
            map.fitBounds(bounds);
        }

        function setMarkers(pilots) {
            bounds = new google.maps.LatLngBounds();
            removeMarkers();
            if (pilots.length) {
                pilots.forEach(function (pilot) {
                    addMarker(pilot);
                });
                fitBounds();
            }
        }

        function setSearchArea(position, radius) {
            searchCircle = new google.maps.Circle({
                strokeColor: '#4CC9FF',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#4CC9FF',
                fillOpacity: 0.2,
                map: map,
                center: position,
                radius: radius
            });

            map.setCenter(position);
            map.setZoom(8);
        }

        function removeElement(element) {
            if (element) {
                element.setMap(null);
                element = null;
            }
        }

        function removeMarkers() {
            markerCluster.clearMarkers();
        }

        function removeSearchArea() {
            removeElement(searchCircle);
        }


    });

