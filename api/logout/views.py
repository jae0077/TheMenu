from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from django.sqlSetting import settings
import pymysql

def logout(request):
    if request.method == "POST":
        
        token = request.POST["_token"]
     
        db = pymysql.connect(host=settings.RDB_HOST, port=settings.RDB_PORT, user=settings.RDB_ID, passwd=settings.RDB_PW, db=settings.RDB_DBNAME)

        cursor = db.cursor()
        cursor.execute("CALL qm_tokenStorage_del_pd('%s')" % (token))

        db.commit()
        db.close()
        return HttpResponse(token)
