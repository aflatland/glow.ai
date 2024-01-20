from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from openai import OpenAI
import json

client = OpenAI()

@csrf_exempt
@require_http_methods(["POST"])
def chat(request):
    data = json.loads(request.body)

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",  # Specify the correct engine
        messages=data['chatsofar'],     # Ensure this matches the frontend structure
    )

    resp = completion.choices[0].message.content

    return JsonResponse({"reply": resp})

@csrf_exempt
@require_http_methods(["POST"])
def translate(request):
    data = json.loads(request.body)
    #data = {"textToTranslate":"Hei! Hvordan er du"}

    messages = [
        {"role":"system", "content":"Translate Norwegian to English"},
        {"role":"user", "content":data['textToTranslate']}
    ]

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages
    )

    resp = completion.choices[0].message.content 
    return JsonResponse({"reply": resp})
