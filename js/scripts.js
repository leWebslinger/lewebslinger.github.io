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
