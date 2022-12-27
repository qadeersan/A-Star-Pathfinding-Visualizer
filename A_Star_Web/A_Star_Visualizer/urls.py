from django.urls import path, include
from django.contrib import admin
from . import views

admin.autodiscover()
urlpatterns = [
    path('admin/', admin.site.urls),
]
