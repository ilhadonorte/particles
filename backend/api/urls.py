from django.urls import include, path  
from rest_framework import routers 

from .views import *

router = routers.DefaultRouter()  
router.register(r'names', ParticleNamesViewSet)
router.register(r'description', DescriptionViewSet)

urlpatterns = [
    path('particles/<str:baseid>/', ParticleDetailView.as_view(), name='api_particle'),
    path('particles/', ParticlesView.as_view(), name='api_particles'),
    path('', include(router.urls))]  