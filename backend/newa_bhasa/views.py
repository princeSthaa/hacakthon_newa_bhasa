from django.shortcuts import render
import json
from django.conf import settings
import os
from django.http import JsonResponse

# Create your views here.
def get_picture(request, category, level):
    file_path = os.path.join(settings.BASE_DIR, 'newa_bhasa', f'Newari_Dataset/{category.lower()}/data.json')

    with open(file_path, encoding='utf-8') as f:
        data = json.load(f)

    # filter data
    filtered = [
        item for item in data
        if item['category'].lower() == category.lower() and str(item['level']) == level
    ]

    return JsonResponse(filtered, safe=False)

def get_audio(request, category, level):
    file_path = os.path.join(settings.BASE_DIR, 'newa_bhasa', f'Newari_Dataset/{category.lower()}/data.json')

    with open(file_path, encoding='utf-8') as f:
        data = json.load(f)

    # filter data
    filtered = [
        item for item in data
        if item['category'].lower() == category.lower() and str(item['level']) == level
    ]

    return JsonResponse(filtered, safe=False)

def get_text(request, category, level):
    file_path = os.path.join(settings.BASE_DIR, 'newa_bhasa', f'Newari_Dataset/{category.lower()}/data.json')

    with open(file_path, encoding='utf-8') as f:    
        data = json.load(f)

    # filter data
    # filtered = [
    #     item for item in data
    #     if item['category'].lower() == category.lower() and str(item['level']) == level
    # ]
    
    filtered = []
    for item in data:
        if (
            item.get('category', '').lower() == category.lower()
            and str(item.get('level')) == str(level)
        ):
            # -------------------
            # IMAGE
            # -------------------
            image_path = item.get('image_path', '')
            image_url = None
            if image_path:
                image_url = request.build_absolute_uri(image_path)

            # -------------------
            # AUDIO
            # -------------------
            # option 1: if audio_path exists in JSON
            audio_path = item.get('audio_path', '')

            # option 2 (fallback): generate from english name
            if not audio_path:
                audio_name = item.get('english', '').strip().replace(' ', '_')
                audio_path = f"/media/{category.lower()}/Recordings/{audio_name}.m4a"

            audio_url = None
            if audio_path:
                audio_url = request.build_absolute_uri(audio_path)

            # -------------------
            # FINAL ITEM
            # -------------------
            filtered.append({
                **item,
                "image_url": image_url,
                "audio_url": audio_url
            })

    return JsonResponse(filtered, safe=False)