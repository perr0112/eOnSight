# bridge_app/serializers.py

from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import Bridge

class BridgeSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Bridge
        geo_field = 'location'
        fields = '__all__'