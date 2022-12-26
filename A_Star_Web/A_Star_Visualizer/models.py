from django.db import models

# Stores start and end coordinates along with coordinates of user selected walls/blockades.
class Grid(models.Model):
    start_row = models.PositiveSmallIntegerField()
    start_col = models.PositiveSmallIntegerField()
    end_row = models.PositiveSmallIntegerField()
    end_col = models.PositiveSmallIntegerField()
    blocked = models.TextField()