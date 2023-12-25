from django.http import JsonResponse

def get_text(request):
    data = {"text":"Hello from Django!"}
    return JsonResponse(data)