import json
from openai import OpenAI
client = OpenAI()

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_correction",
            "description": "Use this function to correct the user's Norwegian, providing feedback which will help them learn Norwegian. You will let the user know whether or not their sentence is grammatically correct Norwegian.",
            "parameters": {
                "type": "object",
                "properties": {
                    "contains_grammatically_incorrect_Norwegian": {
                       "type": "boolean",
                       "description": f"""
                              Return true if the sentence is grammatically incorrect Norwegian.
                              You may also return true if the sentence contains a language other than Norwegian.

                          """,
                    },
                    "corrected_text": {
                        "type": "string",
                        "description": f"""
                                The user's sentence rewritten in grammatically correct Norwegian.
                                If the user's sentence is in a language other than Norwegian, translate the user's sentence to Norwegian.
                        """,
                    },
                    "explanation": {
                       "type": "string",
                       "description": f"""
                              Explanation of the corrected_text in English for someone who is learning conversational Norwegian.
                              Be sure to explain why the corrections were made.
                       """,
                    }

                },
                "required": ["contains_grammatically_incorrect_Norwegian, corrected_text, explanation"],
            },
        }
    },
]

# returns correction response as JSON
def jsonify_correction(correction_exists, corrected_text, explanation): # corrected_text: text, explanation: exp
    correction_json = [
       {"correction_exists": correction_exists},
       {"corrected_text": corrected_text},
       {"explanation": explanation}
    ]
    return correction_json

# extracts correction details from function call
def get_correction_details(arguments):
   correction_exists = arguments.get("contains_grammatically_incorrect_Norwegian")
   corrected_text = arguments.get("corrected_text")
   explanation = arguments.get("explanation")

   return correction_exists, corrected_text, explanation

# extract parameters from OpenAI function call and send to correct python function
def handle_language_correction_request(message):

    if message.tool_calls[0].function.name == "get_correction":

        # load function parameters as JSON
        args = json.loads(message.tool_calls[0].function.arguments)

        # extract correction details
        correction_exists, corrected_text, explanation = get_correction_details(args)

        # return corrections as a JSON object
        results = jsonify_correction(correction_exists, corrected_text, explanation)

    else:
        # in case the function call doesn't exist
        results = f"Error: function {message.tool_calls[0].function.name} does not exist"

    return results

# example run -- feel free to mess with!
try:
  response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
      {
        "role": "system",
        "content": "Rewrite my sentence to be grammatically correct Norwegian, and give an explanation in English."
      },
      {
        "role": "user",
        "content": "Hi there!"
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
   res = handle_language_correction_request(assistant_msg)
   print(res)
else:
   print("function not called for some reason?")

