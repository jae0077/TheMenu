from django.shortcuts import render
from django.http import HttpResponse
from django.sqlSetting import settings
import pymysql
import qrcode
import json

def handler(request):
    token = request.POST["_token"]
    qm_qr_link = request.POST["_qm_qr_link"]
    review_grade = int(request.POST["_review_grade"])
    review_content = request.POST["_review_content"]
    
    if review_content:
        db = pymysql.connect(host=settings.RDB_HOST, port=settings.RDB_PORT, user=settings.RDB_ID, passwd=settings.RDB_PW, db=settings.RDB_DBNAME)
     
        cursor = db.cursor()
        cursor.execute("CALL qm_review_ins_pd('%s', '%s', %d,'%s');" %(token, qm_qr_link, review_grade, review_content))

        result = 1
        
        db.close()
    else:
        result = 2
    return HttpResponse(result)
