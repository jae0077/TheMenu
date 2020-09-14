from django.shortcuts import render
from django.http import HttpResponse
from django.sqlSetting import settings
import pymysql
import json
import qrcode
import time
import hashlib
import boto3
import base64
from io import BytesIO
from PIL import Image

def handler(request):
    token = request.POST["_token"]
    shop_name = request.POST["_shop_name"]
    shop_menu = request.POST["_shop_menu"]
    shop_tel = request.POST["_shop_tel"]
    shop_location = request.POST["_shop_location"]
    shop_img = request.POST["_shop_img"]

    #상점이름 sha256으로 암호화
    hash_shop_name =  hashlib.sha256(shop_name.encode()).hexdigest()
    shop_qrlink = "qrcode" + hash_shop_name[:5] + "-" + str(time.time()).replace(".","")
    shop_qrimg_link = "https://themenu-bucket.s3.ap-northeast-2.amazonaws.com/qrcode/" + shop_qrlink + ".png"
    #파일 확장자가 정해지지 않아 temp로 지정
    shop_img_link = "temp" 
    db = pymysql.connect(host=settings.RDB_HOST, port=settings.RDB_PORT, user=settings.RDB_ID, passwd=settings.RDB_PW, db=settings.RDB_DBNAME)


    cursor = db.cursor()
    cursor.execute("CALL qm_shopdetail_pd('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s');" %(token, shop_name, shop_menu, shop_tel, shop_location, shop_qrlink, shop_qrimg_link, shop_img_link))

    fetchResult = cursor.fetchone()[0]
    db.commit()
    
    
    
    if fetchResult == 1:
        #s3 key
        s3 = boto3.resource(
                's3',
                aws_access_key_id =settings.ACCESS_KEY,
                aws_secret_access_key = settings.SECRET_KEY
        )
        #qrcode 생성 코드
        qr = qrcode.make("http://54.180.115.40/Themenu/listing.html?qm_qr_link="+shop_qrlink)
        
        qrimageFormat = qr.get_image().format
    
        memfile = BytesIO()
        qr.save(memfile, format=qrimageFormat)
        memfile.seek(0)
        
        s3.Object("themenu-bucket", 'qrcode/' + shop_qrlink + '.png').put(Body=memfile.read())
        
        #shop img 생성코드
        shopimg = Image.open(BytesIO(base64.b64decode(shop_img[shop_img.find(",")+1:])))
        
        shopimgFormat = shopimg.format
        
        memfile = BytesIO()

        shopimg.save(memfile, format=shopimgFormat)
        memfile.seek(0)
        s3.Object("themenu-bucket", 'shop_images/' + shop_qrlink + "." + shopimgFormat).put(Body=memfile.read())

        #shop_img_link 파일 확장자가 정해졌기때문에 수정
        shop_img_link = "https://themenu-bucket.s3.ap-northeast-2.amazonaws.com/shop_images/" + shop_qrlink + "." + shopimgFormat
        updateSql = "UPDATE qm_shopdetail_tbl SET qm_shopimg_link = %s WHERE qm_qr_link = %s;"
        cursor.execute(updateSql, (shop_img_link, shop_qrlink))
        db.commit()

        fetchResult = shop_qrlink
    
    db.close()
    return HttpResponse(fetchResult)
    
