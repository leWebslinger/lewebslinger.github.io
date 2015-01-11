var directionsService = new google.maps.DirectionsService();
var geocoder;
var map;
var markers = [];
var start;
var end;
var directionsDisplay;
var infowindow;

function calcRoute(start, end, mode) {
   if(mode == 0){
var request = {
  origin: start,
  destination: end,
  travelMode: google.maps.TravelMode.DRIVING
  };
 }
    else if (mode == 1){
     var request = {
  origin: start,
  destination: end,
  travelMode: google.maps.TravelMode.TRANSIT
    };
     }
     else {
        var request = {
  origin: start,
  destination: end,
  travelMode: google.maps.TravelMode.WALKING
    };
    }
  directionsService.route(request, function(response, status) {
  if (status == google.maps.DirectionsStatus.OK) {

     map_panel = document.getElementById('mapCanvas');
     map_panel.style.height = "70%";

     dir_panel = document.getElementById('directions-panel');
     dir_panel.style.height= "30%";
     dir_panel.style.display= "inline-block";

      directionsDisplay.setDirections(response);
      directionsDisplay.setPanel(document.getElementById('panel-content'));
     }
  });
     }

function initialize() {
directionsDisplay = new google.maps.DirectionsRenderer();
geocoder = new google.maps.Geocoder();
var latlng = new google.maps.LatLng(45.070288,7.6786045999999715);
if (screen.width< 765){
var mapOptions = {
zoom: 9,
center: latlng,
mapTypeControl: true,
mapTypeControlOptions: {
    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
    position: google.maps.ControlPosition.RIGHT_BOTTOM
},
panControl: true,
panControlOptions: {
    position: google.maps.ControlPosition.LEFT_TOP
},
zoomControl: true,
zoomControlOptions: {
    style: google.maps.ZoomControlStyle.LARGE,
    position: google.maps.ControlPosition.LEFT_TOP
},
scaleControl: true,
streetViewControl: true,
streetViewControlOptions: {
    position: google.maps.ControlPosition.LEFT_TOP
}
}
}
else if (screen.width> 765){


var mapOptions = {
zoom: 9,
center: latlng,
mapTypeControl: true,
mapTypeControlOptions: {
    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
    position: google.maps.ControlPosition.RIGHT_BOTTOM
},


scaleControl: true,
streetViewControl: true,
streetViewControlOptions: {
    position: google.maps.ControlPosition.LEFT_TOP
}



}
}



map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);
directionsDisplay.setMap(map);
}

function sortFunction(a, b) {
if (a[6] === b[6]) {
    return 0;
}
else {
    return (a[6] < b[6]) ? -1 : 1;
}
}

function addMarker(map,info, location,mode){

if (mode == 0){
var marker = new google.maps.Marker({
position: location,
map: map,
icon: 'http://maps.google.com/mapfiles/ms/micons/blue-dot.png'
})
}

else if (mode == 1){
var marker = new google.maps.Marker({
position: location,
map: map,
})
}

markers.push(marker);



google.maps.event.addListener(marker, 'click' , function() {
     end = marker.position;

   if (typeof infowindow != 'undefined' ) infowindow.close();

     infowindow = new google.maps.InfoWindow({
    content: info

});
    infowindow.open(map,marker);
});
}

function setAllMap(map) {
for (var i = 0; i < markers.length; i++) {
markers[i].setMap(map);
}
}

