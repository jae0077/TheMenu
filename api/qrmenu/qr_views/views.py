from django.shortcuts import render
from django.http import HttpResponse
import pymysql
import qrcode
import json

def handler(request):
    qr_link = request.GET["_qm_qr_link"]

    db = pymysql.connect(host='lowercase-database.c0rk8bkrsblu.ap-northeast-2.rds.amazonaws.com', port=3306, user='admin', passwd='wogns5%chldbs', db='qrmenu')

    cursor = db.cursor()
    cursor.execute("CALL qm_qr_select_pd('%s');" %(qr_link))
    fetchResult = cursor.fetchone()
    db.close()
    result = json.dumps(fetchResult)
    return HttpResponse(result)
