from django.urls import path
from newa_bhasa.views import get_audio, get_picture, get_text

urlpatterns = [
    path(
        'api/v0/<str:category>/<str:level>/picture.json',
        get_picture,
    ),
    
    path(
        'api/v0/<str:category>/<str:level>/audio.json',
        get_audio,
    ),
    
    path(
        'api/v0/<str:category>/<str:level>/text.json',
        get_text,
    )
    
]

    