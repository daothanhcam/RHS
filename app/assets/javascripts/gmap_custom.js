//= require jquery

var markers = [];
var overlays = [];
var infowindows =[];
var tmpMarkers = [];
var map, geolocate, geo_marker = null;
function initialize() {
  var myLatlng = new google.maps.LatLng(21.017030, 105.783902);
  var image = "/assets/pin.png";
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
    drawingControl: false,
    drawingControlOptions: {
      position: google.maps.ControlPosition.BOTTOM_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.CIRCLE,
        google.maps.drawing.OverlayType.POLYGON,
      ]
    },
    circleOptions: {
      strokeWeight: 0,
      fillOpacity: 0.2,
      zIndex: 1
    },
    polygonOptions: {
      strokeWeight: 0,
      fillOpacity: 0.2,
      zIndex: 1
    }
  });
  drawingManager.setMap(map);


  // Clear filter button on click
  $(".circle-draw-btn").click(function(){
    event.preventDefault();
    drawingManager.setOptions({drawingMode: google.maps.drawing.OverlayType.CIRCLE});
  });
  $(".square-draw-btn").click(function(){
    event.preventDefault();
    drawingManager.setOptions({drawingMode: google.maps.drawing.OverlayType.POLYGON});
  });
  // Clear filter button on click
  $(".clear-filter-btn").click(function(){
    event.preventDefault();
    clearOverlayMarker();
  });

  // Event when overlay draw complete
  google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
    overlays.push(event.overlay);
    drawingManager.setOptions({drawingMode: null});
    $.ajax({
      type: "GET",
      url: "/addresses",
      data: {addresses_to_map: true},
      success: function(result) {
        var j = 0;
        for(var i=0; i<result.length; i++) {
          var point = new google.maps.LatLng(result[i].lat,result[i].lng);
          if ((event.type == google.maps.drawing.OverlayType.POLYGON && google.maps.geometry.poly.containsLocation(point,event.overlay)) ||  (event.type == google.maps.drawing.OverlayType.CIRCLE && google.maps.geometry.spherical.computeDistanceBetween(point, event.overlay.center) <= event.overlay.radius)) {
            tmpMarkers[j] = new google.maps.Marker({
              position: point,
              animation: google.maps.Animation.DROP,
              map: map
            });
            var markerContent = 
                                '<div class="container">' +
                                  '<div class="row">' +
                                    '<p>' + result[i].title + '</p>' +
                                  '</div>' +

                                  '<div class="row">' +
                                    '<p>' + result[i].description + '</p>' +
                                  '</div>' +

                                  '<div class="row">' +
                                    '<span>Price: </span>' +
                                    '<span>' + result[i].price + '</span>' +
                                    '<span>VND</span>' +
                                  '</div>' +

                                  '<div class="row">' +
                                    '<span>Area: </span>' +
                                    '<span>' + result[i].square + '</span>' +
                                    '<span>M2</span>' +
                                  '</div>' +
                                '</div>';                                
            infowindows[j] = new google.maps.InfoWindow({
              maxWidth: 300
            });
            bindInfoWindow(tmpMarkers[j], map, infowindows[j], markerContent);
            j++;
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

function clearOverlayMarker(){
  event.preventDefault();
  while(overlays[0]){
    overlays.pop().setMap(null);
  }
  while(tmpMarkers[0]){
    tmpMarkers.pop().setMap(null);
  }
}

function bindInfoWindow(marker, map, infowindow, markerContent) {
  marker.addListener('click', function() {
    infowindow.setContent(markerContent);
    infowindow.open(map, this);
  });
} 