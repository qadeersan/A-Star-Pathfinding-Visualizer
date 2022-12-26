from django.urls import path, include
from . import views

urlpatterns = [
    path('A_Star_Visualizer/', include('A_Star_Visualizer.urls')),
    path('admin/', admin.site.urls),
]
