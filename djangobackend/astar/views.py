from django.shortcuts import render
from django.contrib.auth.models import User, Group
from django.http import HttpResponse
from rest_framework import viewsets, routers
from astar.serializers import UserSerializer, GroupSerializer

from djangobackend import settings
import os

def index(request):
    # return render(request, os.path.join(settings.REACT_APP_DIR(os.path.abspath('index.html'))))
    try:
        with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
            return HttpResponse(f.read())
    except FileNotFoundError:
        return HttpResponse(
            """
            Please build the front-end using cd frontend && npm install && npm run build 
            """,
            status=501,
        )

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
