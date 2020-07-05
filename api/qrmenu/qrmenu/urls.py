"""qrmenu URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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

import userRegistry.views as qm_registry
import shopdetail.views as qm_detail
import qr_views.views as qm_qrviews
import shopdetail_revise.views as qm_detail_revise
import shopsearch.views as qm_search

urlpatterns = [
    path('admin/', admin.site.urls),
    path('qrmenu/user', qm_registry.handler),
    path('qrmenu/detail', qm_detail.handler),
    path('qrmenu/qrviews', qm_qrviews.handler),
    path('qrmenu/detail_revise', qm_detail_revise.handler),
    path('qrmenu/search', qm_search.handler),
]
