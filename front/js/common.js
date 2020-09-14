$(document).ready(function() {
    if (!sessionStorage.getItem("user")){
	console.log("빔")
	document.getElementById("login").style.display = 'block';
	document.getElementById("signup").style.display = 'block';
    document.getElementById("state").style.display = 'none';
	document.getElementById("logout").style.display = 'none';
	document.getElementsByClassName("myshop")[0].style.display = 'none';
	document.getElementsByClassName("myshop")[1].style.display = 'none';

    }else {
    document.getElementById("login").style.display = 'none';
	document.getElementById("signup").style.display = 'none';
    document.getElementById("state").style.display = 'block';
	document.getElementById("state").textContent = sessionStorage.getItem("name") + "님";
	document.getElementById("logout").style.display = 'block';
	document.getElementsByClassName("myshop")[0].style.display = 'block';
	document.getElementsByClassName("myshop")[1].style.display = 'block';
	console.log("있음")}
});

//ajax에 사용될 토큰 변수
let _token = sessionStorage.getItem("user");
let form_data = { '_token' : _token }

//로그아웃
function logout(){
	//let _token = sessionStorage.getItem("user");
	//let form_data = { '_token' : _token }
	console.log(typeof(_token))
	$.ajax({
         //HTTP METHOD
         type: 'POST',

         //요청 URL
         url: "http://54.180.115.40:8000/Themenu/logout",

         //전송할 데이터 타입
         dataType: "TEXT",

         //timeout 시간
         timeout: 1000,

         //데이터
         data: form_data,
         //ajax 요청 직전 실행 되는 코드
         beforeSend: function() {
             console.log(form_data);
             console.log("요청성공");
         },
         //오류 발생시 예외처리 정보
         error: function(request, status, error) {
             alert("요청실패");
             console.log(request, status, error);
         },
         //요청 성공시 data 안에 응답값이 들어옴
         success: function(data) {
			 console.log(data)
             sessionStorage.clear();
			 window.location.href='http://54.180.115.40/Themenu'

         }
     });

};
//자동로그아웃
(function() {
	checkLogin(3600000);//1시간 뒤에 실행 1000 밀리세컨드 = 1

	function checkLogin(delay) {
		setTimeout(function() {
			
			if (sessionStorage.user) {
				logout();
			} else {
				return false;
			}
			checkLogin(3600000); //재귀함수를 사용해서 반복수행
		}, delay);
	}
	
	$.ajax({
		type: 'POST',
		url: "http://54.180.115.40:8000/Themenu/addDate",
		dataType:"TEXT",
		timeout: 1000,
		data: form_data,
		success: function(data) {
			console.log(data)
		}
	});

})();

