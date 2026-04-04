from django.shortcuts import render
import json
from django.conf import settings
import os
from django.http import JsonResponse

# Create your views here.
def get_picture(request, category, level):
    file_path = os.path.join(settings.BASE_DIR, 'newa_bhasa', f'Newari_Dataset/{category.lower()}/test_data.json')

    with open(file_path, encoding='utf-8') as f:
        data = json.load(f)

    # filter data
    filtered = [
        item for item in data
        if item['category'].lower() == category.lower() and str(item['level']) == level
    ]

    return JsonResponse(filtered, safe=False)

def get_audio(request, category, level):
    file_path = os.path.join(settings.BASE_DIR, 'newa_bhasa', f'Newari_Dataset/{category.lower()}/test_data.json')

    with open(file_path, encoding='utf-8') as f:
        data = json.load(f)

    # filter data
    filtered = [
        item for item in data
        if item['category'].lower() == category.lower() and str(item['level']) == level
    ]

    return JsonResponse(filtered, safe=False)

def get_text(request, category, level):
    file_path = os.path.join(settings.BASE_DIR, 'newa_bhasa', f'Newari_Dataset/{category.lower()}/test_data.json')

    with open(file_path, encoding='utf-8') as f:    
        data = json.load(f)

    # filter data
    filtered = [
        item for item in data
        if item['category'].lower() == category.lower() and str(item['level']) == level
    ]

    return JsonResponse(filtered, safe=False)

def get_images(request, category, level):
    file_path = os.path.join(
        settings.BASE_DIR,
        'newa_bhasa',
        'Newari_Dataset',
        category.lower(),
        'image.json'
    )

    with open(file_path, encoding='utf-8') as f:
        data = json.load(f)

    filtered = []

    for item in data:
        if str(item.get('level')) == str(level):

            # ✅ use image_path directly
            image_path = item.get('image_path', '')

            # build full URL
            image_url = request.build_absolute_uri(image_path)

            item['image_url'] = image_url
            filtered.append(item)

    return JsonResponse(filtered, safe=False)