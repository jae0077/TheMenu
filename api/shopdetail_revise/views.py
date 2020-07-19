from django.shortcuts import render
from django.http import HttpResponse
import pymysql
import json
import qrcode
import random
import hashlib

def handler(request):
    usertbl_idx = int(request.POST["_usertbl_idx"])
    shop_name = request.POST["_shop_name"]
    shop_menu = request.POST["_shop_menu"]
    shop_tel = request.POST["_shop_tel"]
    shop_location = request.POST["_shop_location"]
    shop_qrlink = request.POST["_qm_qr_link"]

    db = pymysql.connect(host='lowercase-database.c0rk8bkrsblu.ap-northeast-2.rds.amazonaws.com', port=3306, user='admin', passwd='wogns5%chldbs', db='qrmenu')

    cursor = db.cursor()
    cursor.execute("CALL qm_shopdetail_revise_pd(%d, '%s', '%s', '%s', '%s', '%s');" %(usertbl_idx, shop_name, shop_menu, shop_tel, shop_location, shop_qrlink))

    fetchResult = cursor.fetchone()
    db.commit()
    db.close()
    result = json.dumps(fetchResult)

    return HttpResponse(result, content_type='application/json')

