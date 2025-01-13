from django.contrib.gis.db import models

class Bridge(models.Model):
    bridge_id = models.CharField(primary_key=True, max_length=10)
    name = models.CharField(max_length=100, blank=True, null=True)
    location = models.PointField(srid=4326)

    class Meta:
        managed = False
        db_table = 'bridges'
