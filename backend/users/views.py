import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User

@csrf_exempt
def signup(request):
    if request.method == "POST":
        data = json.loads(request.body)

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        if User.objects.filter(email=email).exists():
            return JsonResponse({"error": "User already exists"}, status=400)

        user = User.objects.create(
            name=name,
            email=email,
            password=password
        )

        return JsonResponse({
            "message": "User created",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email
            }
        })


@csrf_exempt
def login(request):
    if request.method == "POST":
        data = json.loads(request.body)

        email = data.get("email")
        password = data.get("password")

        try:
            user = User.objects.get(email=email, password=password)

            return JsonResponse({
                "message": "Login successful",
                "user": {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email
                }
            })

        except User.DoesNotExist:
            return JsonResponse({"error": "Invalid credentials"}, status=400)