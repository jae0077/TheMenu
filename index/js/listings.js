/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Isotope
5. Init Google Map


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = $('.header');
	var map;

	setHeader();

	$(window).on('resize', function()
	{
		setHeader();

		setTimeout(function()
		{
			$(window).trigger('resize.px.parallax');
		}, 375);
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	initMenu();
	initIsotope();
	initGoogleMap();

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		if($(window).scrollTop() > 91)
		{
			header.addClass('scrolled');
		}
		else
		{
			header.removeClass('scrolled');
		}
	}

	/* 

	3. Init Menu

	*/

	function initMenu()
	{
		if($('.menu').length)
		{
			var header = $('.header');
			var hOverlay = $('.header_overlay');
			var menu = $('.menu');
			var hamb = $('.hamburger');
			var sup = $('.super_container_inner');
			var close = $('.menu_close');
			var overlay = $('.super_overlay');

			hamb.on('click', function()
			{
				header.toggleClass('active');
				sup.toggleClass('active');
				menu.toggleClass('active');
			});

			close.on('click', function()
			{
				header.toggleClass('active');
				sup.toggleClass('active');
				menu.toggleClass('active');
			});

			overlay.on('click', function()
			{
				header.toggleClass('active');
				sup.toggleClass('active');
				menu.toggleClass('active');
			});

			hOverlay.on('click', function()
			{
				header.toggleClass('active');
				sup.toggleClass('active');
				menu.toggleClass('active');
			});
		}
	}

	/* 

	4. Init Isotope

	*/

	function initIsotope()
	{
		if($('.grid').length)
		{
			var grid = $('.grid');
			grid.isotope(
			{
				itemSelector:'.grid-item',
				layoutMode: 'fitRows'
			});

			// Filtering
			var checkboxes =  $('.listing_checkbox label input');
	        checkboxes.on('click', function()
	        {
	        	var checked = checkboxes.filter(':checked');
	        	var filters = [];
	        	checked.each(function()
	        	{
	        		var filterValue = $(this).attr('data-filter');
	        		filters.push(filterValue);
	        	});

	        	filters = filters.join(', ');
	        	grid.isotope({filter: filters});
	        });
		}
	}

	/* 

	5. Init Google Map

	*/

	function initGoogleMap()
	{
		var myLatlng = new google.maps.LatLng(47.495962, 19.050966);
    	var mapOptions = 
    	{
    		center: myLatlng,
	       	zoom: 14,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			draggable: true,
			scrollwheel: false,
			zoomControl: true,
			zoomControlOptions:
			{
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			fullscreenControl: true,
			styles:
			[
			  {
			    "featureType": "road.highway",
			    "elementType": "geometry.fill",
			    "stylers": [
			      {
			        "color": "#ffeba1"
			      }
			    ]
			  }
			]
    	}

    	// Initialize a map with options
    	map = new google.maps.Map(document.getElementById('map'), mapOptions);

		// Re-center map after window resize
		google.maps.event.addDomListener(window, 'resize', function()
		{
			setTimeout(function()
			{
				google.maps.event.trigger(map, "resize");
				map.setCenter(myLatlng);
			}, 1400);
		});
	}
	
});
//쿼리스트링 input에 넣기
function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
console.log(getParameterByName("_keyword"))
$('#_keyword').val(getParameterByName("_keyword"));

//페이지 로딩시에 ajax로 검색
window.onload=function(){
	let _keyword = $("#_keyword").val();
	let form_data = { _keyword: _keyword };
	$.ajax({
		type: 'get',
		url: "http://13.125.234.164:8000/qrmenu/search",
		dataType: 'JSON',
		data:form_data,
		
		success:function(data){
			//data = JSON.parse(data);
			html = "";

			var list_content = document.getElementById('shop_list');
			
			//ajax결과물을 html변수에 담음
			for(var i=0; i < data.length; i++){
				html += '<div class="grid-item result">';
				html += '<div class="listing" style=text-align:center>';
				html += '<div class="listing_image">';
				html += '<a href="listing.html?qm_qr_link=' + data[i]['qm_qr_link'] + '"><img src="images/listing_1.jpg" alt=""></a>';
				html += '</div>';
				html += '<div class="listing_title_container">';
				html += '<div class="listing_title"><a href="listing.html">' + data[i]['qm_shop_name'] +'</a></div>';
				html += '<div class="listing_info" style=margin:auto>';
				html += '<div class="listing_tel">' + 'tel : ' + data[i]['qm_tel'] + '</div>';
				html += '<div class=listing_location>' + data[i]['qm_location'] + '</div>';
				html += '<div class=listing_location>' + data[i]['qm_qr_link'] + '</div>';
				html += '</div>';
				html += '</div>';
				html += '</div>';
				html += '</div>';
				console.log(data[i]);
				}
			list_content.innerHTML = html;
			
		}
	})
}