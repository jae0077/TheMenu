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
    
    #상점이름 sha256으로 암호화
    hash_shop_name =  hashlib.sha256(shop_name.encode()).hexdigest()
    shop_qrlink = "qrcode" + str(usertbl_idx) + "-" + hash_shop_name[:5] + "-" + str(random.randrange(1, 1000))

    db = pymysql.connect(host='lowercase-database.c0rk8bkrsblu.ap-northeast-2.rds.amazonaws.com', port=3306, user='admin', passwd='wogns5%chldbs', db='qrmenu')

    #usertbl_idx는 로그인 구현 후 수정 예정
    cursor = db.cursor()
    cursor.execute("CALL qm_shopdetail_pd(%d, '%s', '%s', '%s', '%s', '%s');" %(usertbl_idx, shop_name, shop_menu, shop_tel, shop_location, shop_qrlink))

    fetchResult = cursor.fetchone()
    db.commit()
    db.close()
    result = json.dumps(fetchResult)

    #qrcode 생성코드
    qr = qrcode.make("http://13.125.234.164:8000/qrmenu/qrviews?_qm_qr_link="+shop_qrlink)
    qr.save("/opt/qrimg/" + shop_qrlink + '.png')
    return HttpResponse(result, content_type='application/json')
