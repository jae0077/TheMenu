from django.shortcuts import render
from django.http import HttpResponse
import pymysql
import qrcode
import json

def handler(request):
    keyword = request.GET["_keyword"]

    db = pymysql.connect(host='lowercase-database.c0rk8bkrsblu.ap-northeast-2.rds.amazonaws.com', port=3306, user='admin', passwd='wogns5%chldbs', db='qrmenu')

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
