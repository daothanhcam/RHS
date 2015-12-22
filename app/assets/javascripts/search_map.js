// //= require jquery

// $(document).on("click", "#search_map", function(){
//   $.fancybox({
//     "type" : "iframe",
//     "href" : "http://" + location.host + "/maps/",
//     "overlayShow" : true,
//     "centerOnScroll" : true,
//     "speedIn" : 100,
//     "speedOut" : 50,
//     "width" : "80%",
//     "height" : "80%"
//   });
// });

// var map;
// var markers = [];
// var pinIcon = "/assets/pin.png";
// var m;
// var poly;
// var polyOptions = {
//   strokeColor: "#000000",
//   strokeOpacity: 1.0,
//   strokeWeight: 3
// }

// var myLatlng = new google.maps.LatLng(21.017030, 105.783902);
// var addresses;

// var option = {
//   zoom: 13,
//   center: myLatlng,
//   mapTypeControl: true,
//   mapTypeId: google.maps.MapTypeId.ROADMAP
// }

// function initialize() {
//   var searchButton = document.querySelector("#searchButton");
//   var clearMarkers = document.querySelector("#clearMarkers");

//   map = new google.maps.Map(document.getElementById("map-canvas"), option);

//   poly = new google.maps.Polyline(polyOptions);
//   poly.setMap(map);

//   google.maps.event.addListener(map, "click", function(event){
//     var path = poly.getPath();
//     path.push(event.latLng);
//     markers.push(new google.maps.Marker({
//       position: event.latLng,
//       title: "#" + path.getLength(),
//       icon: pinIcon,
//       map: map
//     }));
//   });

//   searchButton.addEventListener("click", function(event){
//     var path = poly.getPath();
//     if (path.getLength() < 3) {
//       alert("Please select at least 3 points");
//       return;
//     }
//     path.push(markers[0].getPosition());
//     searchButton.setAttribute("disable", "disable");
//     doSearch();
//   });

//   clearMarkers.addEventListener("click", function(event) {
//     for(var i = 0; i < markers.length; i++)
//       markers[i].setMap(null);

//     poly.setMap(null);
//   });
// }

// function doSearch() {
//   addresses = $("#searchButton").data("addresses");
//   var totalFound = 0;
//   var blueIcon = "/assets/blueIcon.png";


//   for(var i = 0; i < addresses.length; i++) {
//     var point = new google.maps.LatLng(addresses[i].lat, addresses[i].lng);
//     if (google.maps.geometry.poly.containsLocation(point, poly)) {
//       m = new google.maps.Marker({
//         position: point,
//         icon: blueIcon,
//         map: map
//       });
//       totalFound++;
//     }
//   }
//   alert("Found " + totalFound + " results.111");
// }