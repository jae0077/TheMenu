from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from django.sqlSetting import settings
import pymysql

def handler(request):
    if request.method == "POST":

        user_idx = int(request.POST["_user_idx"])
        review_idx = int(request.POST["_review_idx"])
        
        db = pymysql.connect(host=settings.RDB_HOST, port=settings.RDB_PORT, user=settings.RDB_ID, passwd=settings.RDB_PW, db=settings.RDB_DBNAME)

        cursor = db.cursor()
        cursor.execute("CALL qm_review_del_pd(%d, %d)" % (user_idx, review_idx))
        
        
        result = cursor.fetchone()[0]

        db.commit()
        db.close()
        return HttpResponse(result)

