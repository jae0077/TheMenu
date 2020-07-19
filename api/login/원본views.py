from django.shortcuts import render
from django.http import HttpResponse
import pymysql
def login(request):
    if request.method == "GET":
        return render(request, 'login.html')

    elif request.method == "POST":
        user_id = request.POST.get('user_id')
        user_pw = request.POST.get('user_pw')

        res_data = {}
        if not (user_id and user_pw):
            res_data['error'] = "모든 칸을 다 입력해주세요"
        else:
            db = pymysql.connect(host='lowercase-database.c0rk8bkrsblu.ap-northeast-2.rds.amazonaws.com', port=3306, user='admin', passwd='wogns5%chldbs', db='qrmenu')

            cursor = db.cursor()
            cursor.execute("CALL qm_login_pd('%s', '%s')" % (user_id, user_pw))
            db.close()
            chk_user = cursor.fetchone()[0]
            if chk_user == 0:
                return HttpResponse("TEST")
            else:
                return HttpResponse(chk_user)

