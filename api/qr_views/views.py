from django.shortcuts import render
from django.http import HttpResponse
from django.sqlSetting import settings
import pymysql
import qrcode
import json

def handler(request):
    qr_link = request.GET["_qm_qr_link"]

    db = pymysql.connect(host=settings.RDB_HOST, port=settings.RDB_PORT, user=settings.RDB_ID, passwd=settings.RDB_PW, db=settings.RDB_DBNAME)

    cursor = db.cursor()
    cursor.execute("CALL qm_qr_select_pd('%s');" %(qr_link))
    fetchResult = cursor.fetchone()
    db.close()
    result = json.dumps(fetchResult)
    return HttpResponse(result)

