$(document).ready(function() {

   	
   	   	


    // Closes the mobile nav
    $('#top-nav a').click(function() {
        if ($('#top-nav').is(':visible') 
        && $('#menu-icon').is(':visible')) {
            $('#top-nav').slideUp();
            $('#menu-icon').toggleClass('rotate');
        }
    });

    // Hides the welcome
    $('#thanks').click(function() {
        $('#welcome').slideUp();
    });

    // Detects window size
    $(window).resize(function() {
        if ($('#menu-icon').is(':visible')) {
            $('#top-nav').hide();
        } else {
            $('#top-nav').show();
        }
    });
    


     
    // use the first element that is "scrollable"
    function scrollableElement(els) {
        for (var i = 0, argLength = arguments.length; i <argLength; i++) {
            var el = arguments[i],
                $scrollElement = $(el);
            if ($scrollElement.scrollTop()> 0) {
                return el;
            } else {
                $scrollElement.scrollTop(1);
                var isScrollable = $scrollElement.scrollTop()> 0;
                $scrollElement.scrollTop(0);
                if (isScrollable) {
                    return el;
                }
            }
        }
        return [];
    }
});






function fnGetDomain(url) {
	return url.match(/:\/\/(.[^/]+)/)[1];
}


   
var directionsService = new google.maps.DirectionsService();
var geocoder;
var map;
var markers = [];
var start;
var end;
var directionsDisplay;
var infowindow;
        

       
    function calcRoute(start , end , mode ) {
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
          
         map_panel = document.getElementById('map-canvas');
         map_panel.style.margin = "0px 20% 0px 0px";
        dir_panel = document.getElementById('directions-panel')
          dir_panel.style.height= "100%"
          dir_panel.style.width= "20%"
          
         directionsDisplay.setDirections(response);
          directionsDisplay.setPanel(document.getElementById('directions-panel'));
         }
      });
         }

    
    
    
    
    
function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(45.070288,7.6786045999999715);
  var mapOptions = {
    zoom: 9,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
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

        
        
        
function codeAddress() {
  var address = document.getElementById('address').value +"Italia";
        setAllMap(null);
    markers = []
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
     start = results[0].geometry.location
     map.setCenter(results[0].geometry.location);
         map.setZoom(14);
        addMarker(map,address,start,0);
        
    var indirizzo = results[0].geometry.location.toString()
    var latitudine = "";
    var longitudine = "";
    var lat=0.1;
    var longit=0.1;
    var i=1;
    var ww=1;   
        
        
        while(ww==1){
        
            if(indirizzo.charAt(i) == ","){
                lat = parseFloat(latitudine);
                break};
            
            latitudine = latitudine + indirizzo.charAt(i);
            
            i++
            
        }
        
         while(ww==1){
        
            if(indirizzo.charAt(i+1) == ")"){
                 longit = parseFloat(longitudine);
                break};
            
            longitudine = longitudine + indirizzo.charAt(i+1);
            
            i++
            
          }
           
        
    
    for(m = 0; m <matrix.length; m++)
        {
        
        var R  = 6371; // km
        var f1 = lat* Math.PI / 180;
        
        var f2 = parseFloat(matrix[m][4]);
        f2 = f2 * Math.PI / 180;
        var l2 = parseFloat(matrix[m][5]);
        
        var df = (f1 - f2);
        var dl = (longit - l2)* Math.PI / 180;

        var a = Math.sin(df/2) * Math.sin(df/2) +
        Math.cos(f1) * Math.cos(f2) *
        Math.sin(dl/2) * Math.sin(dl/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        var d = R * c;
        
        matrix[m][6] = d;
        }

          
        
        matrix.sort(sortFunction);
        
         for(m = 0; m <10; m++){    
         var caflat= parseFloat(matrix[m][4]);
         var caflong = parseFloat(matrix[m][5]);   
         var poscaf = new google.maps.LatLng( caflat , caflong )
          var telefono = '<a href="tel:'+matrix[m][2] + ' ">'
          
          
        info = '<div id="content">'+ '<h2 >'  + matrix[m][3] + 
               '</h2>' + "                    " +
                matrix[m][0] + matrix[m][1] + '<br>'+ 
    
                telefono + matrix[m][2] +'</a>' + '<br>' +
                
              
               ' <input type="button" value="macchina" onclick= "calcRoute(start,end,0)">'+ 
               ' <input type="button" value="bus" onclick= "calcRoute(start,end,1)">'+
               ' <input type="button" value="a piedi" onclick= "calcRoute(start,end,2)">'+
              
               '</div>';
         
         addMarker(map,info,poscaf,1);
         }
         
        
        
        }
      else {
      alert('Geocode was not successful for the following reason: ' + status);
      }
  });
  }

google.maps.event.addDomListener(window, 'load', initialize);

