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
                    codeAddress();
                    return false;
                } else {
                    return true;
                }
            });
        };

        makeAllFormSubmitOnEnter();
    });