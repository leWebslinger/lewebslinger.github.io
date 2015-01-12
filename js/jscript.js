// JavaScript Document
$(document).ready(function(e) {	
	
	$("#closePanel").click(function(){
		$("#directions-panel").hide();
		$("#mapCanvas").css("height", "100%");
	});
	
	var openInfo = 0;
	function apriInfoPanel(){
		if (openInfo == 0){
					$("#infoPanel").show('slide', 200);
					$("#container").animate({left:'40%'},200);
					$("#close").show();
					openInfo = 1;
				}
	}
	
	var mobileMenu = 0;
	$("#menu").click(function(){
		if (mobileMenu == 0){
					$("#leftPanel").show('slide', 200);
					$("#container").animate({left:'100%'},200);
					openInfo = 1;
				} else {
					$("#leftPanel").hide('slide', 200);
					$("#container").animate({left:'0'},200);
					openInfo = 0;
				}
	});
	
	$("#close").click(function(){
					$("#infoPanel").hide('slide',200);
					$("#container").animate({left:'0'},200);
					$("#close").hide();
					openInfo = 0;
				});
				
	$("#isee").click(function(){
		if (openInfo==0){
			apriInfoPanel();
		}
		$("#istrText").hide();
		$("#chiText").hide();
		$("#tasseText").hide();
		$("#iseeText").show();
	});
	
	$("#istr").click(function(){
		if (openInfo==0){
			apriInfoPanel();
		}
		$("#istrText").show();
		$("#chiText").hide();
		$("#tasseText").hide();
		$("#iseeText").hide();
	});
	
	$("#chi").click(function(){
		if (openInfo==0){
			apriInfoPanel();
		}
		$("#istrText").hide();
		$("#chiText").show();
		$("#tasseText").hide();
		$("#iseeText").hide();
	});
	
	$("#tasse").click(function(){
		if (openInfo==0){
			apriInfoPanel();
		}
		$("#istrText").hide();
		$("#chiText").hide();
		$("#tasseText").show();
		$("#iseeText").hide();
	});
	
	$(".isee").click(function(){
		$("#iseeText").toggle();
	});
	
	$(".istr").click(function(){
		$("#istrText").toggle();
	});
	
	$(".tasse").click(function(){
		$("#tasseText").toggle();
	});
	
	$(".chi").click(function(){
		$("#chiText").toggle();
	});
	
    	$(".img").click(function(){
	codeAddress();
            $("#infoPanel").hide('slide',200);
					$("#container").animate({left:'0'},200);
					$("#close").hide();
					openInfo = 0;
				
	});
    
		
	google.maps.event.addDomListener(window, 'load', initialize);
	
	$("#address").keypress(function(e) {
		    if(e.which == 13) {
                $("#infoPanel").hide('slide',200);
					$("#container").animate({left:'0'},200);
					$("#close").hide();
					openInfo = 0;
                codeAddress();
				$("#address").blur();
			}
		});
		
		
		function codeAddress() {		
var address = $('#address').val() +" Italia";
if(address==" Italia"){
alert("non funziona");}
else{
    setAllMap(null);
markers = []
geocoder.geocode( { 'address': address}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
	$("#leftPanel").hide('slide',200);
					$("#container").animate({left:'0'},200);
					open = 0;
	
 start = results[0].geometry.location
 map.setCenter(results[0].geometry.location);
     map.setZoom(16);
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
    choise= '264' // LIMITE NUMERO RISULTATI
    
     for(m = 0; m <choise; m++){    
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
});	
