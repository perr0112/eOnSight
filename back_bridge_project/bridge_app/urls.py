from django.urls import path
from .views import BridgeListCreateView, BridgeDetailsView

urlpatterns = [
    path('bridges/', BridgeListCreateView.as_view(), name='bridge-list-create'),  # route pour la liste et création des ponts
    path('bridges/<str:bridge_id>/', BridgeDetailsView.as_view(), name='bridge-details'),  # route pour les détails d'un pont
]
