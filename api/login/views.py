from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from django.sqlSetting import settings
import pymysql
import jwt
import time
import datetime
import json

def login(request):
    user_id = request.POST.get('user_id')
    user_pw = request.POST.get('user_pw')

    if not (user_id and user_pw):
        return HttpResponse("case_1")
    else:
        db = pymysql.connect(host=settings.RDB_HOST, port=settings.RDB_PORT, user=settings.RDB_ID, passwd=settings.RDB_PW, db=settings.RDB_DBNAME)

        cursor = db.cursor()
        cursor.execute("CALL qm_login_pd('%s', '%s')" % (user_id, user_pw))
        result = cursor.fetchone()
        chk_user = result[0]
        chk_name = result[1]
        chk_idx = result[2] 
        if chk_user == 0:
            db.close()
            return HttpResponse("case_2")
        else:
            temp = str(time.time())
            data = {'user' : chk_user, 'temp' : temp}
            token = jwt.encode(data, settings.SECRET_KEY, settings.ALGORITHM)
            token_str = token.decode('utf-8')
            now = datetime.datetime.now()
            hourlater = now + datetime.timedelta(hours = 1)
            strnow = hourlater.strftime('%Y-%m-%d %H:%M:%S')
            cursor.execute("CALL qm_tokenstorage_ins_pd('%s', '%s', '%s')" %(token_str, strnow, user_id))
            db.commit()
            db.close()
            sessionvalue = json.dumps([token_str, chk_name, chk_idx])
            return HttpResponse(sessionvalue)
