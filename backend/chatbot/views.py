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
    #chat = [{"role": "system", "content": "You are a helpful assistant designed to output JSON."},
    #{"role": "user", "content": "Who won the world series in 2020?"}]

    #data = {'chatsofar': chat}

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",  # Specify the correct engine
        messages=data['chatsofar'],     # Ensure this matches the frontend structure
    )

    resp = completion.choices[0].message.content

    return JsonResponse({"reply": resp})

