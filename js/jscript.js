// JavaScript Document

var closePanel = function () {
dir_panel = document.getElementById('directions-panel');
dir_panel.style.display = "none";


map_panel = document.getElementById('map-canvas');
map_panel.style.height = "100%";

};

$(document).ready(function () {

var makeAllFormSubmitOnEnter = function () {
    $('#address').live('keypress', function (e) {

        if (e.which && e.which == 13) {
            document.getElementById("address").blur()
            codeAddress();
            return false;
        } else {
            return true;
        }
    });
        $('#n_search').live('keypress', function (e) {

        if (e.which && e.which == 13) {
            codeAddress();

            return false;
        } else {
            return true;
            
        }
    });
};

makeAllFormSubmitOnEnter();
});


$(document).ready(function(){
  $("").blur(function(){
    document.getElementById("address").blur()
  });
});



$(document).ready(function() {
$('#simple-menu').sidr({
side: 'right'

});
});

$(document).ready(function() {
$('#responsive-menu-button').sidr({
name: 'sidr-main',
source: '#navigation'
});


});


