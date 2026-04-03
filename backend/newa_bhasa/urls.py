from django.urls import path
from newa_bhasa.views import get_values

urlpatterns = [
    path(
        'api/v0/<str:category>/<str:level>/json.json',
        get_values,
    ),
]

    