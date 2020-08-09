function loginAjax()
	{
		let user_id = $("#user_id").val();
		let user_pw = $("#user_pw").val();
	
		let form_data = {
			user_id: user_id,
			user_pw: user_pw
		}
		$.ajax({
			//HTTP METHOD
			type: 'POST',
	
			//요청 URL
			url: "http://54.180.115.40:8000/Themenu/login",
	
			//전송할 데이터 타입
			dataType: "text",
	
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
				
				console.log(request, status, error);
				alert("요청실패");
			},
			//요청 성공시 data 안에 응답값이 들어옴
			success: function(data) {
			    console.log(data);

			    if(data == "case_1"){
                                html = "";
                                $('#myModal').modal('show');
                                tableContent = document.getElementById('modalcontent');

                                html += '<p style="font-size: 100%;">';
                                html += "ID와 PW를 모두 입력해주세요."
                                html += '</p>';
                                html += '<a href="login.html" style="margin:auto;"><button type="button" class="btn btn-secondary">확인</button></a>'
                                tableContent.innerHTML = html;
		            }
			    else if(data == "case_2") {
                              html = "";
                                $('#myModal').modal('show');
                                tableContent = document.getElementById('modalcontent');

                                html += '<p style="font-size: 100%;">';
                                html += "가입하지 않은 아이디이거나, 잘못된 비밀번호입니다."
                                html += '</p>';
                                html += '<a href="login.html" style="margin:auto;"><button type="button" class="btn btn-secondary">확인</button></a>'
                                tableContent.innerHTML = html;
			    }
			    else {
					data = JSON.parse(data);
			        sessionStorage.setItem("user", data[0]);
					sessionStorage.setItem("name", data[1]);
					window.location.href = 'http://54.180.115.40/Themenu/';
				}
			}
		});
	}

