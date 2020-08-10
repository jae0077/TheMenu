/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Isotope
5. custom

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
	
});

//페이지 로딩시에 ajax로 검색
window.onload=function(){
	let _token = sessionStorage.user;

	let form_data = {
		'_token' : _token
	};
	$.ajax({
		type: 'POST',
		url: "http://54.180.115.40:8000/Themenu/myshop",
		dataType: 'JSON',
		data:form_data,
		
		success:function(data){
			html = "";
	        console.log(data);
            console.log(typeof(data))
			var list_content = document.getElementById('myshop_list');
			if (data.length >= 1) {
				//ajax결과물을 html변수에 담음
				for(var i=0; i < data.length; i++){
					html += '<div class="grid-item result">';
					html += '<div class="listing" style=text-align:center>';
					html += '<div class="listing_image">';
					html += '<a href="listing.html?qm_qr_link=' + data[i]['qm_qr_link'] + '"><img src="images/listing_1.jpg" alt=""></a>';
					html += '</div>';
					html += '<div class="listing_title_container">';
					html += '<div class="listing_title"><a href="listing.html">' + data[i]['qm_shop_name'] +'</a></div>';
					html += '<div class="listing_title" style=margin:auto>';
					html += '<div class="listing_tel">' + 'tel : ' + data[i]['qm_tel'] + '</div>';
					html += '<div class=listing_location>' + data[i]['qm_location'] + '</div>';
					html += '<div class=listing_location>' + data[i]['qm_qr_link'] + '</div>';
					html += '<a href=edit.html?qm_qr_link=' + data[i]['qm_qr_link'] + '><button type="button" class="btn btn-secondary btn-lgk">수정</button></a>'
					html += '</div>';
					html += '</div>';
					html += '</div>';
					html += '</div>';
					console.log(data[i]);
					}
				//list_content.innerHTML = html;
			} else {
				html += '<div class="grid-item result">';
                html += '<div class="listing" style= "text-align:center; height:300px;">';
				html += '<div style="display:table; height:100%; width:100%">';
				html += '<div class="none_list"">등록하신 상점이 없습니다.</div>';
				html += '</div>';
				html += '</div>';
				html += '</div>';
			}
			list_content.innerHTML = html;
		}
	})
}
