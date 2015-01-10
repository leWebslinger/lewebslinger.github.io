



function codeAddress(numerocaf) {
var address = document.getElementById('address').value +" Italia";
if(address==" Italia"){
    alert('spiacenti serve un indirizzo più preciso'); }
else{
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
    
    
     for(m = 0; m <264; m++){    
     var caflat= parseFloat(matrix[m][4]);
     var caflong = parseFloat(matrix[m][5]);   
     var poscaf = new google.maps.LatLng( caflat , caflong )
      var telefono = '<a href="tel:'+matrix[m][2] + ' ">'


    info = '<h2 >'  + matrix[m][3] + 
           '<p></h2>' + "                    " +
            matrix[m][1] + '<br/>'+ matrix[m][0] + '<br/>' +  

            telefono + matrix[m][2] +'</a>' + '<br/></p>' +


           ' <input type="button" value="Macchina" onclick= "calcRoute(start,end,0)">'+ 
           ' <input type="button" value="Bus" onclick= "calcRoute(start,end,1)">'+
           ' <input type="button" value="A piedi" onclick= "calcRoute(start,end,2)">';

     addMarker(map,info,poscaf,1);}
     



    }
  else {
  alert('Geocode was not successful for the following reason: ' + status);
  }
});
}
}


google.maps.event.addDomListener(window, 'load', initialize);