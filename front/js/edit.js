/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Accordions
5. Init Gallery
6. Init Google Map


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
	initAccordions();
	initGallery();
	

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

	4. Init Accordions

	*/

	function initAccordions()
	{
		if($('.accordion').length)
		{
			var accs = $('.accordion');

			accs.each(function()
			{
				var acc = $(this);

				if(acc.hasClass('active'))
				{
					var panel = $(acc.next());
					var panelH = panel.prop('scrollHeight') + "px";
					
					if(panel.css('max-height') == "0px")
					{
						panel.css('max-height', panel.prop('scrollHeight') + "px");
					}
					else
					{
						panel.css('max-height', "0px");
					} 
				}

				acc.on('click', function()
				{
					if(acc.hasClass('active'))
					{
						acc.removeClass('active');
						var panel = $(acc.next());
						var panelH = panel.prop('scrollHeight') + "px";
						
						if(panel.css('max-height') == "0px")
						{
							panel.css('max-height', panel.prop('scrollHeight') + "px");
						}
						else
						{
							panel.css('max-height', "0px");
						} 
					}
					else
					{
						acc.addClass('active');
						var panel = $(acc.next());
						var panelH = panel.prop('scrollHeight') + "px";
						
						if(panel.css('max-height') == "0px")
						{
							panel.css('max-height', panel.prop('scrollHeight') + "px");
						}
						else
						{
							panel.css('max-height', "0px");
						} 
					}
				});
			});
		}
	}

	/* 

	5. Init Gallery

	*/

	function initGallery()
	{
		if($('.review_image').length)
		{
			$('.colorbox').colorbox(
			{
				rel:'colorbox',
				photo: true,
				maxWidth:'95%',
				maxHeight:'95%'
			});
		}
	}
});

function resize(obj) {
	obj.style.height = "1px";
	obj.style.height = (12+obj.scrollHeight)+"px";
  }
//url파라미터 값 가져오기
function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
console.log("getparameter호출",getParameterByName("qm_qr_link"));
var _qm_qr_link = getParameterByName("qm_qr_link");
//ajax코드
window.onload=function(){
	document.getElementById('shop_name').innerHTML = '';
    document.getElementById('menu_text').innerHTML = '';
    document.getElementById('shop_tel').innerHTML = '';
	document.getElementById('shop_location').innerHTML = '';

	var form_data = { _qm_qr_link : _qm_qr_link };
	// console.log("formdata 호출" ,form_data)
	$.ajax({
		type: 'GET',
		url: "http://54.180.115.40:8000/Themenu/qrviews",
		dataType: 'TEXT',
		data: form_data,

		success:function(data){
			
			data = JSON.parse(data);
			console.log("성공",data)
			console.log(typeof(data)) 	
			sessionStorage.setItem("address", data[3]);
			sessionStorage.setItem("shopname", data[0]);
			document.getElementById('shop_name').innerHTML = '<textarea style="background-color:transparent; color:white; overflow:visible;" onkeydown="resize(this)" onkeyup="resize(this)">' + data[0] +'</textarea>';
			document.getElementById('menu_text').innerHTML = '<textarea class="form-control" style="overflow:visible; min-height: 150px;" onkeydown="resize(this)" onkeyup="resize(this)">' + data[1] + '</textarea>';
			document.getElementById('shop_tel').innerHTML = '<textarea style="overflow:visible;" onkeydown="resize(this)" onkeyup="resize(this)">' + data[2] + '</textarea>';
			document.getElementById('shop_location').innerHTML = '<textarea style="overflow:visible;" onkeydown="resize(this)" onkeyup="resize(this)">' + data[3] + '</textarea>';
			
			
		}
	
        });
}

//수정 ajax

function edit() {
	var _token = sessionStorage.user;
	var _shop_name = document.getElementsByTagName("textarea")[0].value;
	var _shop_menu = document.getElementsByTagName("textarea")[1].value;
	var _shop_tel = document.getElementsByTagName("textarea")[3].value;
	var _shop_location = document.getElementsByTagName("textarea")[2].value;
	
	var form_data = {
		_token : _token,
		_shop_name : _shop_name,
		_shop_menu : _shop_menu,
		_shop_tel : _shop_tel,
		_shop_location : _shop_location,
		_qm_qr_link : _qm_qr_link
	};
	console.log(form_data);
	$.ajax({
		type: 'POST',
		url: "http://54.180.115.40:8000/Themenu/detail_revise",
		dataType: 'TEXT',
		data: form_data,
		success:function(data) {
			console.log(data);
			location.href("http://54.180.115.40/Themenu/myshop.html");
		}
	});
};
