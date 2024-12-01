from django.urls import include, path  
from rest_framework import routers 

from .views import *

router = routers.DefaultRouter()  
router.register(r'name', ParticleNamesViewSet)

urlpatterns = [
    path('particles/', ParticlesView.as_view(), name='api_particles'),
    path('', include(router.urls)),
]  