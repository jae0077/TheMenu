from django.shortcuts import render
from django.shortcuts import redirect

def logout(request):
    response = redirect('http://54.180.115.40/Themenu/')
    response.delete_cookie('user_id')
    response.delete_cookie('user_pw')
    return response

