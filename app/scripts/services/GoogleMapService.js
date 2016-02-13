'use strict';

angular.module('defyingGravityApp')

  .factory("GoogleMapService",
    function (defaultGeolocation, mapId) {
      var map,
        markerCluster,
        pilotMarkerInfoWindow,
        searchMarker,
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
          position: pilot.coords
        });
        marker.addListener('click', function () {
          if (!pilotMarkerInfoWindow) {
            createPilotMarkerInfoWindow();
          }
          pilotMarkerInfoWindow.setContent(createPilotMarkerInfoWindowContent(pilot));
          pilotMarkerInfoWindow.setPosition(marker.getPosition());
          pilotMarkerInfoWindow.open(map, marker);
          map.setCenter(marker.getPosition());
        });
        bounds.extend(marker.getPosition());
        markerCluster.addMarker(marker);
      }

      function addNewMarker(pilot) {
        addMarker(pilot);
        map.setCenter(pilot.coords);
      }

      function initMap() {
        map = new google.maps.Map(document.getElementById(mapId), {
          center: defaultGeolocation,
          zoom: 6,
          mapTypeControl: false
        });
        markerCluster = new MarkerClusterer(map);
      }

      function createPilotMarkerInfoWindow() {
        pilotMarkerInfoWindow = new google.maps.InfoWindow({
          map: map,
          maxWidth: 400
        });
      }

      function createPilotMarkerInfoWindowContent(pilot) {
        var contentString = "<p><b>Name: </b>" + pilot.name + "</p>";
        if (pilot.type) {
          contentString += "<p><b>Type: </b>" + pilot.type + "</p>";
        }
        if (pilot.ratings) {
          contentString += "<p><b>Ratings: </b>" + pilot.ratings + "</p>";
        }
        if (pilot.location) {
          contentString += "<p><b>Location: </b>" + pilot.location + "</p>";
        }
        if (pilot.category) {
          contentString += "<p><b>Category: </b>" + pilot.category + "</p>";
        }
        if (pilot.info) {
          contentString += "<p><b>Information: </b>" + pilot.info + "</p>";
        }
        if (pilot.contacts && pilot.contacts.length) {
          pilot.contacts.forEach(function (contact) {
            contentString += "<p><b>" + contact.type + ": </b>" + contact.value + "</p>";
          });
        }
        return contentString;
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
        searchMarker = new google.maps.Marker({
          position: position,
          icon: 'assets/img/icon5.png',
          map: map
        });
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
        removeElement(searchMarker);
        removeElement(searchCircle);
      }
    });

