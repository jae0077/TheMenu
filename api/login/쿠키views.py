from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from django.sqlSetting import settings
import pymysql

def login(request):
    user_id = request.POST.get('user_id')
    user_pw = request.POST.get('user_pw')

    if not (user_id and user_pw):
        return HttpResponse("빈칸을 입력하세요")
    else:
        db = pymysql.connect(host=settings.RDB_HOST, port=settings.RDB_PORT, user=settings.RDB_ID, passwd=settings.RDB_PW, db=settings.RDB_DBNAME)

        cursor = db.cursor()
        cursor.execute("CALL qm_login_pd('%s', '%s')" % (user_id, user_pw))
        db.close()
        chk_user = cursor.fetchone()[0]

        if chk_user == 0:
            return HttpResponse("다시입력해주세요")
        else:
            #return redirect('http://54.180.115.40/Themenu/')
            response = redirect('http://54.180.115.40/Themenu/')
            response.set_cookie('user_id',user_id)
            response.set_cookie('user_pw',user_pw)
            return response
