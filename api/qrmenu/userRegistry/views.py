from django.shortcuts import render
from django.http import HttpResponse
import pymysql

def handler(request):
    user_id = request.POST["user_id"]
    user_pw = request.POST["user_pw"]
    user_name = request.POST["user_name"]
    user_email = request.POST["user_email"]
    #키를 포스트로 보내는 각각의 변수를 만든다
    
    db = pymysql.connect(host='lowercase-database.c0rk8bkrsblu.ap-northeast-2.rds.amazonaws.com', port=3306, user='admin', passwd='wogns5%chldbs', db='qrmenu')
    """
    pymysql.connect()메소드로 mysql에 연결한다.
    host : 접속할 mysql server 주소
    port : 접속할 my sql server의 포트번호
    user : mysql ID
    passwd : mysql 암호
    db : 접속할 데이터베이스
    """
    cursor = db.cursor() #커서 객체를 가져온다
    cursor.execute("CALL qm_registry_pd('%s', '%s', '%s', '%s')" % (user_id, user_pw, user_name, user_email))
    #execute()메소드를 사용해 db를 실행하고 미리 만들어둔 프로시저를 사용해 user_id, pw, name을 db에 보낸다
    result = cursor.fetchone()[0]
    #fetchone() 하나의 row를 리턴하는 메소드이며 0번째를 result에 담는다.
    db.commit()
    #트랜잭션을 commit한다
    db.close()
    #db연결을 끊는다.

    msg = "환영합니다. %s님." % (user_name)
    #회원가입에 성공할경우 위의 메세지를 보여주고 아이디가 이미 존재하면 아래의 메세지를 보여준다.
    if result == 0:
        msg = "이미 존재하는 ID입니다."

    return HttpResponse(msg)

