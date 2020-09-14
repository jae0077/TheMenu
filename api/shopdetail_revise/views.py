from django.shortcuts import render
from django.http import HttpResponse
from django.sqlSetting import settings
import pymysql
import json
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
    shop_qrlink = request.POST["_qm_qr_link"]
    shop_img = request.POST["_shop_img"]
    
    if "https://themenu-bucket.s3.ap-northeast-2.amazonaws.com/shop_images/" not in shop_img:
        shop_img_link = "temp"
    
    db = pymysql.connect(host=settings.RDB_HOST, port=settings.RDB_PORT, user=settings.RDB_ID, passwd=settings.RDB_PW, db=settings.RDB_DBNAME)

    cursor = db.cursor()
    cursor.execute("CALL qm_shopdetail_revise_pd('%s', '%s', '%s', '%s', '%s', '%s', '%s');" %(token, shop_name, shop_menu, shop_tel, shop_location, shop_qrlink, shop_img_link))
    result = cursor.fetchone()
    
    db.commit()
    if shop_img_link == "temp":
        #s3 key
        s3 = boto3.resource(
                's3',
                aws_access_key_id =settings.ACCESS_KEY,
                aws_secret_access_key = settings.SECRET_KEY
        )

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
    db.close()
    return HttpResponse(result)
