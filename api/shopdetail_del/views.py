from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from django.sqlSetting import settings
import pymysql
import boto3

def handler(request):
    token = request.POST["_token"]
    qm_qr_link = request.POST["_qm_qr_link"]

    db = pymysql.connect(host=settings.RDB_HOST, port=settings.RDB_PORT, user=settings.RDB_ID, passwd=settings.RDB_PW, db=settings.RDB_DBNAME)
 
    cursor = db.cursor()
    cursor.execute("CALL qm_shopdetail_del_pd('%s', '%s')" % (token, qm_qr_link))
    result = cursor.fetchone()[0]

    db.commit()
    db.close()
    
    #s3 key
    s3 = boto3.resource(
        's3',
        aws_access_key_id =settings.ACCESS_KEY,
        aws_secret_access_key = settings.SECRET_KEY
    )
    shopimg_link = result.replace("https://themenu-bucket.s3.ap-northeast-2.amazonaws.com/shop_images/", "")
    bucket = s3.Bucket("themenu-bucket")
    bucket.objects.filter(Prefix="qrcode/" + qm_qr_link + ".png").delete()
    bucket.objects.filter(Prefix="shop_images/" + shopimg_link).delete()

    return HttpResponse(token)

