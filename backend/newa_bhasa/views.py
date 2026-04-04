from django.shortcuts import render
import json
from django.conf import settings
import os
from django.http import JsonResponse

# Create your views here.
def get_picture(request, category, level):
    file_path = os.path.join(settings.BASE_DIR, 'newa_bhasa', 'Newari_Dataset/data.json')

    with open(file_path, encoding='utf-8') as f:
        data = json.load(f)

    # filter data
    filtered = [
        item for item in data
        if item['category'].lower() == category.lower() and str(item['level']) == level
    ]

    return JsonResponse(filtered, safe=False)

def get_audio(request, category, level):
    file_path = os.path.join(settings.BASE_DIR, 'newa_bhasa', 'Newari_Dataset/data.json')

    with open(file_path, encoding='utf-8') as f:
        data = json.load(f)

    # filter data
    filtered = [
        item for item in data
        if item['category'].lower() == category.lower() and str(item['level']) == level
    ]

    return JsonResponse(filtered, safe=False)

def get_text(request, category, level):
    file_path = os.path.join(settings.BASE_DIR, 'newa_bhasa', 'Newari_Dataset/data.json')

    with open(file_path, encoding='utf-8') as f:
        data = json.load(f)

    # filter data
    filtered = [
        item for item in data
        if item['category'].lower() == category.lower() and str(item['level']) == level
    ]

    return JsonResponse(filtered, safe=False)