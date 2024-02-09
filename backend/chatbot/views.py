from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from openai import OpenAI
import json

client = OpenAI()

def sayHello(request):
    return JsonResponse({"Hello":"For all those times you just wanted to say hello."})

@csrf_exempt
@require_http_methods(["POST"])
def chat(request):
    data = json.loads(request.body)

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",  # Specify the correct engine
        messages=data['completeChat'],     # Ensure this matches the frontend structure
    )

    resp = completion.choices[0].message.content

    return JsonResponse({"reply": resp})

@csrf_exempt
@require_http_methods(["POST"])
def translator(request):
    data = json.loads(request.body)
    #data = {"textToTranslate":"Hei! Hvordan er du"}

    messages = [
        {"role":"system", "content":"Translate the text to English"},
        {"role":"user", "content":data['textToTranslate']}
    ]

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages
    )

    resp = completion.choices[0].message.content 
    return JsonResponse({"translation": resp})

@csrf_exempt
@require_http_methods(["POST"])
def corrector(request):

    data = json.loads(request.body)

    # returns correction response as JSON
    def jsonify_correction(correction_exists, corrected_text, explanation): # corrected_text: text, explanation: exp
        correction_json = {
            "correction_exists": correction_exists,
            "corrected_text": corrected_text,
            "explanation": explanation
        }
        return correction_json
    
    # extracts correction details from function call
    def get_correction_details(args):
        correction_exists = args.get("contains_grammatically_incorrect_" + data["learning_language"], "False")
        corrected_text = args.get("corrected_text", "")
        explanation = args.get("explanation", "")

        return correction_exists, corrected_text, explanation
    
    # extract parameters from OpenAI function call and send to correct python function
    def handle_language_correction_request():

        if assistant_msg.tool_calls[0].function.name == "get_correction":

            # load function parameters as JSON
            args = json.loads(assistant_msg.tool_calls[0].function.arguments)

            # extract correction details
            correction_exists, corrected_text, explanation = get_correction_details(args)

            # return corrections as a JSON object
            results = jsonify_correction(correction_exists, corrected_text, explanation)

        else:
            # in case the function call doesn't exist
            results = f"Error: function {assistant_msg.tool_calls[0].function.name} does not exist"

        return results
    
    # correction function call to OpenAI
    tools = [
        {
            "type": "function",
            "function": {
                "name": "get_correction",
                "description": "Use this function to correct the user's "+data["learning_language"]+", providing feedback which will help them learn "+data["learning_language"]+". You will let the user know whether or not their sentence is grammatically correct " +data["learning_language"]+ ".",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "contains_grammatically_incorrect_"+data["learning_language"]: {
                        "type": "boolean",
                        "description": f"""
                                Return true if the sentence is grammatically incorrect """+data["learning_language"]+""".
                                You may also return true if the sentence contains a language other than """+data["learning_language"]+ """.

                            """,
                        },
                        "corrected_text": {
                            "type": "string",
                            "description": f"""
                                    The user's sentence rewritten in grammatically correct """+ data["learning_language"] +""".
                                    If the user's sentence is in a language other than """+data["learning_language"]+""", translate the user's sentence to"""+data["learning_language"]+ """.
                            """,
                        },
                        "explanation": {
                        "type": "string",
                        "description": f"""
                                Explanation of the corrected_text in English for someone who is learning conversational""" +data["learning_language"]+ """.
                                Be sure to explain why the corrections were made.
                        """,
                        }

                    },
                    "required": ["contains_grammatically_incorrect_"+ data["learning_language"]+", corrected_text, explanation"],
                },
            }
        },
    ]

    # example run -- feel free to mess with!
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
            {
                "role": "system",
                "content": "Rewrite my sentence to be grammatically correct"+ data["learning_language"] +", and give an explanation in English."
            },
            {
                "role": "user",
                "content": data["user_content"],
            },

            ],
            temperature=1,
            max_tokens=256,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0,

            tools=tools,
            tool_choice={"type":"function", "function": {"name": "get_correction"}},
        )
    except Exception as e:
        print("Unable to generate ChatCompletion response. Error: {e}")

    assistant_msg = response.choices[0].message

    # detect and handle correction requests
    if assistant_msg.tool_calls:
        res = handle_language_correction_request()
        print(res)
    else:
        print("function not called for some reason?")  

    return JsonResponse(handle_language_correction_request())

