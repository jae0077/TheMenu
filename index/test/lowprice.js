//table 관련 변수
var tableHead = document.getElementById('headcontent');
var tableContent = document.getElementById('content');
var html = "";
var tHead = "";
//ajax code
function historyAjax() {
    let history_userid = $("#history_userid").val();

    let form_data = {
        _user_id: history_userid
    }
    $.ajax({
        //HTTP METHOD
        type: 'get',

        //요청 URL
        url: "http://15.164.166.220:8000/v1/searchHistory",

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
            alert("요청실패");
            console.log(request, status, error);
        },
        //요청 성공시 data 안에 응답값이 들어옴
        success: function(data) {
            data = JSON.parse(data);
            html = "";
            tHead = "";

            //모달띄우기
            $('#myModal').modal('show');

            var tableHead = document.getElementById('headcontent');
            var tableContent = document.getElementById('content');

            tHead += '<tr>';
            tHead += '<th>'+"#"+'</th>';
            tHead += '<th>'+"상품명"+'</th>';
            tHead += '<th>'+"가격"+'</th>';
            tHead += '<th>'+"검색시간"+'</th>';
            tHead += '</tr>';

            tableHead.innerHTML = tHead;
            
            
            //ajax결과물을 html변수에 담음
            for(var i=0; i < data.length; i++){
                j = i + 1;
                html += '<tr>';
                html += '<td>'+j+'</td>';
                html += '<td>'+data[i]['keyword']+'</td>';
                html += '<td>'+data[i]['price'].toLocaleString()+"원"+'</td>';
                html += '<td>'+data[i]['date']+'</td>';
                html += '</tr>';
                console.log(data[i]);
            }
            //html 변수를 tableContent에 HTML형태로 넣는다.
            tableContent.innerHTML = html;
        }
    });
}

function searchAjax() {
    let keyword = $("#keyword").val();
    let price = $("#price").val();
    let search_userid = $("#search_userid").val();
 
    let form_data = {
        _keyword: keyword,
        _price: price,
        _user_id: search_userid
    }
    $.ajax({
        //HTTP METHOD
        type: 'post',

        //요청 URL
        url: "http://15.164.166.220:8000/v1/request",

        //전송할 데이터 타입
        dataType: "text",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        //동기화
        async : true,

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

            data = JSON.parse(data)

            alert(data['msg']);
            let test2 = data['unique_key'];
            let form_data = {_unique_key: test2}
            if (test2 != null){
            $.ajax({
                type: 'post',
                url: "http://15.164.166.220:8000/v1/result",
                dataType: "text",
                timeout: 5000,
                data: form_data,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                error: function(request, status, error){
                    alert("실패");
                    console.log(request, status, error);
                },
                success: function(data) {
                    
                    var obj = JSON.parse(data);
                    console.log(obj);
                    console.log(typeof(obj));
                    var result = JSON.parse(obj[0][0]);
                    console.log(result);
                    
                    html = "";
                    tHead = "";
                    
                    //모달띄우기
                    $('#myModal').modal('show');
                    tableHead = document.getElementById('headcontent');
                    tableContent = document.getElementById('content');

                    tHead += '<tr>';
                    tHead += '<th>'+"#"+'</th>';
                    tHead += '<th></th>';
                    tHead += '<th>'+"상품명"+'</th>';
                    tHead += '<th>'+"가격"+'</th>';
                    tHead += '</tr>';
                    
                    tableHead.innerHTML = tHead;
                    //검색결과 정렬
                    result.sort(function (a,b){
                        return a.proPrice - b.proPrice;
                    });
                        //ajax결과물을 html변수에 담음
                        for(var i=0; i < result.length; i++){
                            j = i + 1;
                            html += '<tr>';
                            html += '<td>'+j+'</td>';
                            html += '<td>'+'<img src='+result[i]['proImglink']+' width="50px" height="50px"></td>'
                            html += '<td><a href='+result[i]['link']+' target="_blank">'+result[i]['proName']+'</a></td>';
                            html += '<td>'+result[i]['proPrice'].toLocaleString()+"원"+'</td>';
                            html += '</tr>';
                            console.log(result[i]['proImglink'])
                        }
                        
                        //html 변수를 tableContent에 HTML형태로 넣는다.
                        tableContent.innerHTML = html;
                      
                }
            });}
 
        }
    });
}
function joinAjax() {
    let join_userid = $("#join_userid").val();
    let join_userpw = $("#join_userpw").val();
    let join_username = $("#join_username").val();

    let form_data = {
        user_id: join_userid,
        user_pw: join_userpw,
        user_name: join_username
    }
    $.ajax({
        //HTTP METHOD
        type: 'POST',

        //요청 URL
        url: "http://15.164.166.220:8000/v1/user",

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
            alert("요청실패");
            console.log(request, status, error);
        },
        //요청 성공시 data 안에 응답값이 들어옴
        success: function(data) {
            console.log(data);
            html = "";
            $('#myModal').modal('show');
            tableContent = document.getElementById('content');
            
            html += '<tr style="height: 50px;">';
            html += '<p style="font-size: 35px;">';
            html += data;
            html += '</p>';
            html += '<tr style="height: 50px;">';
            tableContent.innerHTML = html;
        }
    });
}

function idsearchAjax() {
    let lost_username = $("#lost_username").val();
    let lost_userpw = $("#lost_userpw").val();

    let form_data = {
        _name: lost_username,
        _lp_pw: lost_userpw,
    }
    $.ajax({
        //HTTP METHOD
        type: 'POST',

        //요청 URL
        url: "http://15.164.166.220:8000/v1/searchId",

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
            alert("요청실패");
            console.log(request, status, error);
        },
        //요청 성공시 data 안에 응답값이 들어옴
        success: function(data) {
            console.log(data);
            console.log(lost_username);
            html = "";
            $('#myModal').modal('show');
            tableContent = document.getElementById('content');
            if(data == "None"){
                html += '<tr style="height: 50px;">';
                html += '<p style="font-size: 30px;">';
                html += lost_username;
                html += '님 ID가 존재하지 않거나 비밀번호가 틀립니다.</p>';
                html += '<tr style="height: 50px;">';
            } else {
                html += '<tr style="height: 50px;">';
                html += '<p style="font-size: 35px;">';
                html += lost_username;
                html += '님 ID는 "';
                html += data;
                html += '"입니다.</p>';
                html += '<tr style="height: 50px;">';
            }
            tableContent.innerHTML = html;
            
        }
    });
}
