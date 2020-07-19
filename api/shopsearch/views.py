from django.shortcuts import render
from django.http import HttpResponse
from django.sqlSetting import settings
import pymysql
import qrcode
import json

def handler(request):
    keyword = request.GET["_keyword"]

    db = pymysql.connect(host=settings.RDB_HOST, port=settings.RDB_PORT, user=settings.RDB_ID, passwd=settings.RDB_PW, db=settings.RDB_DBNAME)

    cursor = db.cursor()
    cursor.execute("CALL qm_shopsearch_pd('%s');" %(keyword))
    fetchResult = cursor.fetchall()
    result = []
    for i in fetchResult:
        item = {
            'qm_shop_name' : i[0],
            'qm_menu' : i[1],
            'qm_tel' : i[2],
            'qm_location' : i[3],
            'qm_qr_link' : i[4]
        }
        result.append(item)
    result = json.dumps(result)
    db.close()
    return HttpResponse(result)

