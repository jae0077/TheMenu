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


//url파라미터 값 가져오기
function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
console.log("getparameter호출",getParameterByName("qm_qr_link"));
var _qm_qr_link = getParameterByName("qm_qr_link");

//리뷰 평점 제이쿼리 코드
$('.starRev span').click(function(){
	$(this).parent().children('span').removeClass('on');
	$(this).addClass('on').prevAll('span').addClass('on');
	return false;
});

//textarea 자동리사이즈
function resize(obj) {
	obj.style.height = "1px";
    obj.style.height = (12+obj.scrollHeight)+"px";
}

//qr코드 버튼
function qrview() {
	$('#myModal').modal('show');
	document.getElementById('qrcode').src = "https://themenu-bucket.s3.ap-northeast-2.amazonaws.com/qrcode/" + _qm_qr_link + ".png"
}

//ajax코드
window.onload=function(){
	document.getElementById('shop_name').innerHTML = '';
    document.getElementById('menu_text').innerHTML = '';
    document.getElementById('shop_tel').innerHTML = '';
	document.getElementById('shop_location').innerHTML = '';

	var form_data = { '_qm_qr_link' : _qm_qr_link };
	// console.log("formdata 호출" ,form_data)
	$.ajax({
		type: 'GET',
		url: "http://54.180.115.40:8000/Themenu/qrviews",
		dataType: 'TEXT',
		data: form_data,

		success:function(data){
			
			data = JSON.parse(data);
			console.log("성공",data);
			console.log(typeof(data));
			sessionStorage.setItem("address", data[3]);
			sessionStorage.setItem("shopname", data[0]);
			document.getElementById('shop_name').innerHTML = '<span>' + data[0] +'</span>';
			document.getElementById('menu_text').innerHTML = '<span>' + data[1] + '</span>';
			document.getElementById('shop_tel').innerHTML = '<span>' + data[2] + '</span>';
			document.getElementById('shop_location').innerHTML = '<span>' + data[3] + '</span>';
			document.getElementById("bgImg").style.backgroundImage = "url(" + data[4] + ")";

			if (!sessionStorage.getItem("user")){
				document.getElementsByTagName("th")[0].textContent = "닉네임"
				document.getElementsByTagName("textarea")[0].textContent = "리뷰를 작성하려면 로그인이 필요합니다."
				document.getElementsByTagName("textarea")[0].disabled = true;
			}	
			else {
				document.getElementsByTagName("th")[0].textContent = sessionStorage.name;
			}
			
		}
	});
	
	$.ajax({
		type: 'POST',
		url: "http://54.180.115.40:8000/Themenu/review_show",
		dataType: 'TEXT',
		data: form_data,

		success:function(data) {
			data = JSON.parse(data);
			console.log(data);

			var html = ""
			var review_list = document.getElementById('review_list');
            
			//ajax결과물을 html변수에 담음
            for(var i=0; i < data.length; i++){
				html += "<table class='table'>";
				html += "<thead>";
				html += "<tr>";
				html += "<th scope='col'>" + data[i]['user_name'] + "</th>";
				html += "<th scope='col'>"
				html += "<div class='starRev'>"
				console.log(typeof(data[i]['review_grade']));
				for(var j=0; j < data[i]['review_grade']; j++){
					html += "<span class='starR on'>grade</span>";
				}
				html += "</div>";
				html += "</th>";
				html += "<th scop='col'>" + data[i]['review_date'] +  "</th>";
				if (data[i]['user_idx'] === Number(sessionStorage.idx)) {
					html += "<th scope='col' style='text-align:right;'><button class='myreview' value='" + i + "' onclick='review_edit(this.value)' style='cursor:pointer;'>수정</button> <button class='myreview' value='"+ data[i]['review_idx'] + "' onclick='review_del(this.value)' style='cursor:pointer;'>삭제</button></th>";
				};
				html += "</tr>";
				html += "</thead>";
				html += "<tbody>";
				html += "<tr>";
				html += "<td scope='row' colspan='4'>" + data[i]['review_content'] + "</td>";
				html += "</tr>";
				html += "</tbody>";
				html += "</table>";

			}
            
			review_list.innerHTML = html;
		}
	});
}

function review_ins() {
	var _token = sessionStorage.user;
	var _review_grade = document.getElementById("star_rev").getElementsByClassName("starR on").length;
	var _review_content = document.getElementById("review_text").value; 
	
	var form_data = {
		"_token" : _token,
		"_qm_qr_link" : _qm_qr_link,
		"_review_grade" : _review_grade,
		"_review_content" : _review_content
	};
	$.ajax({
		type: 'POST',
		url: "http://54.180.115.40:8000/Themenu/review_ins",
		dataType : 'TEXT',
		data: form_data,

		success: function(data) {
			if (data == 1) {
				location.reload(true);
			} else {
				alert("내용을 입력해 주세요.");
			}
		}
	});
}

function review_del(click_btn) {
	if (confirm("리뷰를 삭제하시겠습니까?") == true) { //확인
	var _user_idx = sessionStorage.idx;
	var _review_idx = click_btn;
	
	var form_data = {
		"_user_idx" : _user_idx,
		"_review_idx" : _review_idx
	};

	$.ajax({
		type: 'POST',
		url: "http://54.180.115.40:8000/Themenu/review_del",
		dataType: "TEXT",
		data: form_data,

		success: function(data) {
			if (data == 0) {
				location.reload(true);
			}
		}
	});
	} else { //취소
		return false;
	};
}
/*수정중
function review_edit(click_btn) {
	var _user_idx = sessionStorage.idx;
    var _review_idx = click_btn;
    var form_data = {
        "_user_idx" : _user_idx,
        "_review_idx" : _review_idx
    };
    
	$.ajax({
       	type: 'POST',
        url: "http://54.180.115.40:8000/Themenu/review_edit",
        dataType: "TEXT",
        data: form_data,
        success: function(data) {    
        	var origin = document.getElementByid('review_list').getElementsByTagName("td")[click_btn].TextContent
			
			document.getElementById('review_list').getElementsByTagName("td")[click_btn].innerHTML = '<textarea class="editText" style="background-color:transparent; width:100%;" onkeydown="resize(this)" onkeyup="resize(this)">' + origin +'</textarea>';
		}
    });
}

var aaaa = document.getElementById('review_list').getElementsByTagName("table")[0].getElementsByTagName("th")[1];

var tttt = "";
tttt += '<div class="starRev" id="star_reva">';
tttt += '<span class="starR on">별1</span>';
tttt += '<span class="starR">별2</span>';
tttt += '<span class="starR">별3</span>';
tttt += '<span class="starR">별4</span>';
tttt += '<span class="starR">별5</span>';
tttt += '</div>';
aaaa.innerHTML = tttt;
*/
