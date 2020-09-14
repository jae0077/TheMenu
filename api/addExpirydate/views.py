from django.shortcuts import render
from django.http import HttpResponse
from django.sqlSetting import settings
import pymysql
 
def handler(request):
    token = request.POST["_token"]
    db = pymysql.connect(host=settings.RDB_HOST, port=settings.RDB_PORT, user=settings.RDB_ID, passwd=settings.RDB_PW, db=settings.RDB_DBNAME)

    cursor = db.cursor()
    cursor.execute("CALL qm_addExpirydate_pd('%s');" %(token))
    fetchResult = cursor.fetchall()
     
    db.commit()
    db.close()
    
    return HttpResponse(fetchResult)
