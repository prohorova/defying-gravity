'use strict';

angular.module('defyingGravityApp')

  .factory("GoogleMapService",
    function (defaultGeolocation, mapId) {
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
        if (pilot.email) {
          contentString += "<p><b>Email: </b><a href='mailto:"+ pilot.email + "'>" + pilot.email + "</a></p>";
        }
        if (pilot.phone) {
          contentString += "<p><b>Phone: </b><a href='skype:" + pilot.phone + "?call'>" + pilot.phone + "</a></p>";
        }
        if (pilot.skype) {
          contentString += "<p><b>Skype: </b><a href='skype:" + pilot.skype + "?call'>" + pilot.skype + "</a></p>";
        }
        if (pilot.facebook) {
          contentString += "<p><b>Facebook: </b>" + pilot.facebook + "</p>";
        }
        if (pilot.twitter) {
          contentString += "<p><b>Twitter: </b>" + pilot.twitter + "</p>";
        }
        if (pilot.instagram) {
          contentString += "<p><b>Information: </b>" + pilot.instagram + "</p>";
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

