from django.urls import include, path
from rest_framework import routers
from astar import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', views.index, name='index.html'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]