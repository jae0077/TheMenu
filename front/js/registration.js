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

//이미지 업로드시 bgImg변경
function setImg(event) {
	var reader = new FileReader();
	reader.onload = function(event) {
		changeImg = event.target.result
        document.getElementById("bgImg").style.backgroundImage = "url("+changeImg+")";
	};
	reader.readAsDataURL(event.target.files[0]);
}

function OnFocus() {
    document.getElementById('focus').style.display = "block";
}
function OffFocus() {
    document.getElementById('focus').style.display = "none";
}


//게시글 등록 ajax
function posting() {
	var _token = sessionStorage.user;
	var _shop_name = document.getElementsByTagName("textarea")[0].value;
	var _shop_menu = document.getElementsByTagName("textarea")[1].value.replace(/(\n|\r\n)/g, '<br>');
	var _shop_tel = document.getElementsByTagName("textarea")[3].value;
	var _shop_location = document.getElementsByTagName("textarea")[2].value;
	
	if (document.getElementById("bgImg").style.backgroundImage === 'url("images/listing_image_1.jpg")'){
		var _shop_img = "images/listing_image_1.jpg"
	} else {
		var _shop_img = document.getElementById("bgImg").style.backgroundImage.replace("url","").replace('("',"").replace('")',"")
	};
	
		if (!_shop_name || !_shop_menu || !_shop_tel || !_shop_location) {
		alert("빈칸을 모두 작성해주세요!")	
	} else {
	
		var form_data = {
			"_token" : _token,
			"_shop_name" : _shop_name,
			"_shop_menu" : _shop_menu,
			"_shop_tel" : _shop_tel,
			"_shop_location" : _shop_location,
			"_shop_img" : _shop_img
		};
		console.log(typeof(form_data));
		$.ajax({
			type: 'POST',
			url: "http://54.180.115.40:8000/Themenu/detail",
			dataType: 'TEXT',
			data: form_data,
			success:function(data) {
				console.log(typeof(data));
				if (data != "0") {
					window.location.href='http://54.180.115.40/Themenu/listing.html?qm_qr_link='+data;
					} else {

					alert("이미 등록한 상점입니다.\n상점 이름과 주소를 확인해 주세요");
				}
			}
		});
	}
};
