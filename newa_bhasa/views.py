from django.shortcuts import render
import json
from django.conf import settings
import os
from django.http import JsonResponse

# Create your views here.
def get_words(request, category, level):
    file_path = os.path.join(settings.BASE_DIR, 'newa_bhasa', 'data.json')

    with open(file_path, encoding='utf-8') as f:
        data = json.load(f)

    # filter data
    filtered = [
        item for item in data
        if item['category'].lower() == category.lower() and str(item['level']) == level
    ]

    return JsonResponse(filtered, safe=False)