from django.db import models

# Create your models here.
class Node(models.Model):
    id = models.CharField(primary_key=True, max_length=10)
    state = models.CharField(max_length=10, default="unvisited")
    # state can be "neighbour", "unvisited", "visited"
    g = models.IntegerField(default='inf')
    h = models.IntegerField(default='inf')
    f = models.IntegerField(default='inf')
    parent = models.CharField(max_length=10, default=None, null=True)