function initialize() {

  var markers = [];

  var  mapOptions = {
	  center: new google.maps.LatLng(-30.03, -51.21),
	  zoom: 14,
    scrollwheel: false,
	  };

  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = 'img/pin.png'
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });

  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });

  var opiniaoLatLong = new google.maps.LatLng(-30.041778, -51.220882);
  var pinguimLatLong = new google.maps.LatLng(-30.037958, -51.222263);
  var image = 'img/pin.png';

  var markerOpiniao = new google.maps.Marker({
        position: opiniaoLatLong,
        map: map,
        icon: image
    });

  var pinguimOpiniao = new google.maps.Marker({
        position: pinguimLatLong,
        map: map,
        icon: image
    });

}

google.maps.event.addDomListener(window, 'load', initialize);
