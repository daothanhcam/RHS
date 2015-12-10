//= require jquery

var map, geolocate, geo_marker = null;
function initialize() {
  var myLatlng = new google.maps.LatLng(21.017030, 105.783902);
  var image = "/assets/pin.png";
  var markers = [];
  var option = {
    zoom: 13,
    center: myLatlng,
    mapTypeControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: false
  }
  map = new google.maps.Map(document.getElementById("map-canvas"), option);

  // int draw tool
  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.BOTTOM_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.CIRCLE,
        google.maps.drawing.OverlayType.POLYGON,
        google.maps.drawing.OverlayType.RECTANGLE
      ]
    },
    markerOptions: {icon: 'images/beachflag.png'},
    circleOptions: {
      fillOpacity: 0.2,
      editable: true,
      zIndex: 1
    },
    polygonOptions: {
      fillOpacity: 0.2,
      editable: true,
      zIndex: 1
    },
    rectangleOptions: {
      fillOpacity: 0.2,
      editable: true,
      zIndex: 1
    }
  });
  drawingManager.setMap(map);

  // Event when overlay draw complete
  google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
    $.ajax({
      type: "GET",
      url: "/addresses",
      data: {addresses_to_map: true},
      success: function(result) {
        var i;
        for(var i=0; i<result.length; i++) {
          var point = new google.maps.LatLng(result[i].lat,result[i].lng);
          // if (google.maps.geometry.spherical.computeDistanceBetween(point, event.overlay.center) <= event.overlay.radius) {
          if ((event.type == google.maps.drawing.OverlayType.POLYGON && google.maps.geometry.poly.containsLocation(point,event.overlay)) ||  (event.type == google.maps.drawing.OverlayType.CIRCLE && google.maps.geometry.spherical.computeDistanceBetween(point, event.overlay.center) <= event.overlay.radius)) {
            var m = new google.maps.Marker({
              position: point,
              title: 'Location '+i,
              map: map
            });
          }
        }
      },
    });
  });

  // init search box
  var input = document.getElementById("pac-input");
  var searchBox = new google.maps.places.SearchBox((input));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}


//get current location 
function geoLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("No Gelocation Support!");
  }
}

function showPosition(position) {
  geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  if(geo_marker === null) {
    geo_marker = new google.maps.Marker({
      map: map,
      position: geolocate,
      icon: "/assets/geo.png"
    });
  } else {
    geo_marker.setPosition(geolocate);
  }

  map.setCenter(geolocate);
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = "Error: The Geolocation service failed.";
  } else {
    var content = "Error: Your browser doesn\'t support geolocation.";
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}
