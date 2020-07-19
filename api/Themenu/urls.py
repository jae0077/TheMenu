"""Themenu URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

import userRegistry.views as tm_registry
import shopdetail.views as tm_detail
import qr_views.views as tm_qrviews
import shopdetail_revise.views as tm_detail_revise
import shopsearch.views as tm_search
import login.views as login
import logout.views as logout

urlpatterns = [
    path('admin/', admin.site.urls),
    path('Themenu/user', tm_registry.handler),
    path('Themenu/detail', tm_detail.handler),
    path('Themenu/qrviews', tm_qrviews.handler),
    path('Themenu/detail_revise', tm_detail_revise.handler),
    path('Themenu/search', tm_search.handler),
    path('Themenu/login', login.login),
    path('Themenu/logout', logout.logout),
]
