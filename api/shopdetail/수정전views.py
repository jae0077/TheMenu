from django.shortcuts import render
from django.http import HttpResponse
from django.sqlSetting import settings
import pymysql
import json
import qrcode
import time
import hashlib

def handler(request):
    token = request.POST["_token"]
    shop_name = request.POST["_shop_name"]
    shop_menu = request.POST["_shop_menu"]
    shop_tel = request.POST["_shop_tel"]
    shop_location = request.POST["_shop_location"]
     
    #상점이름 sha256으로 암호화
    hash_shop_name =  hashlib.sha256(shop_name.encode()).hexdigest()
    shop_qrlink = "qrcode" + hash_shop_name[:5] + "-" + str(time.time()).replace(".","")

    db = pymysql.connect(host=settings.RDB_HOST, port=settings.RDB_PORT, user=settings.RDB_ID, passwd=settings.RDB_PW, db=settings.RDB_DBNAME)


    cursor = db.cursor()
    cursor.execute("CALL qm_shopdetail_pd('%s', '%s', '%s', '%s', '%s', '%s');" %(token, shop_name, shop_menu, shop_tel, shop_location, shop_qrlink))

    fetchResult = cursor.fetchone()
    db.commit()
    db.close()
    

    #qrcode 생성코드
    qr = qrcode.make("http://54.180.115.40/Themenu/listing.html?qm_qr_link="+shop_qrlink)
    qr.save("/opt/qrimg/" + shop_qrlink + '.png')
    return HttpResponse(fetchResult)
