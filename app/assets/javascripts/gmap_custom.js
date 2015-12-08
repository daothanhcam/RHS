var map, geolocate, geo_marker = null;
// var directionsService = new google.maps.DirectionsService();
// var infowindow = new google.maps.InfoWindow({size: new google.maps.Size(150, 50)});

function initialize() {
  var myLatlng = new google.maps.LatLng(21.017030, 105.783902);
  var lat = document.getElementById("form-lat");
  var lng = document.getElementById("form-lng");
  var image = "/assets/pin.png";
  var markers = [];
  var option = {
    zoom: 13,
    center: myLatlng,
    mapTypeControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: false
  }

  // directionsDisplay = new google.maps.DirectionsRenderer();
  // directionsDisplay.setMap(map)

  map = new google.maps.Map(document.getElementById("map-canvas"), option);

  // var position = new google.maps.LatLng(lat.value, lng.value);

  // marker = new google.maps.Marker({position: position, map: map});
  // marker.setMap(map);


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

//   google.maps.event.addListener(map, "click", function() {
//     infowindow.close();
//   });

//   google.maps.event.addListener(map, "click", function(event) {
//     if (marker) {
//       marker.setMap(null);
//       marker = null;
//     }

//     myLatLng = event.latLng;

//     marker = new google.maps.Marker({
//       position: myLatLng,
//       map: map,
//       icon: image,
//       title:"Property Location"
//     });

//     lat.value = event.latLng.lat();
//     lng.value = event.latLng.lng();
//   });

//   if(lat.value === "" || lng.value === "") {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var pos = new google.maps.LatLng(position.coords.latitude,
//                                        position.coords.longitude);

//       var infowindow = new google.maps.InfoWindow({
//         map: map,
//         position: pos,
//         content: 'Your location!'
//       });

//       map.setCenter(pos);
//     }, function() {
//       handleNoGeolocation(true);
//     });
//   } else {
//     marker = new google.maps.Marker({position: position, map: map});
//     marker.setMap(map);
//     map.setCenter(position);
//     map.setZoom(14);
//   }
// }

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

// function calcRoute(target_lat, target_lng) {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var lat = position.coords.latitude;
//       var lng = position.coords.longitude;
//       var start = new google.maps.LatLng(lat, lng);
//       var end = new google.maps.LatLng(target_lat, target_lng);
//       var selectedMode = document.getElementById("travel-mode").value;
//       var request = {
//         origin:start,
//         destination:end,
//         travelMode: google.maps.TravelMode[selectedMode]
//       };
//       directionsService.route(request, function(result, status) {
//         if (status === google.maps.DirectionsStatus.OK) {
//           directionsDisplay.setDirections(result);
//           var dis = result.routes[0].legs[0].distance.value;
//           document.getElementById("distance").innerHTML = dis/1000;
//         }
//       });
//       document.getElementById("mode").style.visibility = "visible";
//     });
//   } else {
//     console.log("No Gelocation Support!");
//   }
// }

// $(document).on("click", ".icon-map", function(){
//   var address_id = $(this).data("address-id");
//   $.fancybox({
//     "type" : "iframe",
//     "href" : "http://" + location.host + "/maps/" + address_id,
//     "overlayShow" : true,
//     "centerOnScroll" : true,
//     "speedIn" : 100,
//     "speedOut" : 50,
//     "width" : "80%",
//     "height" : "80%"
//   });
// });
