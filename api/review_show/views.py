from django.shortcuts import render
from django.http import HttpResponse
from django.sqlSetting import settings
import pymysql
import json

def handler(request):
    qr_link = request.POST["_qm_qr_link"]

    db = pymysql.connect(host=settings.RDB_HOST, port=settings.RDB_PORT, user=settings.RDB_ID, passwd=settings.RDB_PW, db=settings.RDB_DBNAME)

    cursor = db.cursor()
    cursor.execute("CALL qm_review_show_pd('%s');" %(qr_link))
    fetchResult = cursor.fetchall()
    db.close()
    result = []
    
    for i in fetchResult:
        item = {
            'review_idx' : i[0],
            'user_name' : i[1],
            'user_idx' : i[2],
            'review_grade' : i[3],
            'review_date' : i[4].strftime('%Y-%m-%d %H:%M'),
            'review_content' : i[5]
        }
        result.append(item)
    result = json.dumps(result)

    #result = json.dumps(fetchResult)
    return HttpResponse(result)

