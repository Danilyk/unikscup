
$(document).ready(function() {
	$(".bicon_bicon_menu").on("click", function() {
		var isOpened = $(".nav").hasClass('is-opened');

		if (isOpened) {
			$(".nav").removeClass('is-opened');
			$(".page").removeClass('menu-opened');
			$(this).css('background', 'url(img/menu.png) center center no-repeat');
		} else {
			$(".nav").addClass('is-opened');
			$(".page").addClass('menu-opened');
			$(this).css('background', 'url(img/clear.png) center center no-repeat');
		}
	});
});

function initMap() {
  var myLatLng = {lat: 62.531392, lng: 113.977136};

  var map = new google.maps.Map(document.getElementById('mapBox'), {
    zoom: 17,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
}
