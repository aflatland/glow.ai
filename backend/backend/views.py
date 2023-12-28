from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from openai import OpenAI
import json

client = OpenAI()

@csrf_exempt  # Disable CSRF for simplicity, consider using CSRF tokens in production
@require_http_methods(["POST"])
def get_text(request):
    data = json.loads(request.body)
    user_message = data.get('message', '')

    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
        {"role": "user", "content": user_message}
    ]
    )

    resp = completion.choices[0].message.content
    data = {"text":resp}
    return JsonResponse(data)

def get_gpt_response(messages):

    # generate response from list of messages
    completion = client.chat.completions.create(
        model = "gpt-3.5-turbo",
        messages = messages)
    
    # get response as string
    reply = completion.choices[0].message.content
    return reply
    