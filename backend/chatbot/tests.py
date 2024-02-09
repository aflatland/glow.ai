from django.test import TestCase
import json

from openai import OpenAI
client = OpenAI()

# structures response
def extract_correction(correction_exists, corrected_text, explanation): # corrected_text: text, explanation: exp
    return str(correction_exists) + ": " + corrected_text + "\n " + explanation

def execute_function_call(message):
    if message.tool_calls[0].function.name == "get_correction":
        
        # extract parameters from OpenAI function call
        #corrected_text = json.loads(message.tool_calls[0].function.arguments)["corrected_text"]
        correction_exists = json.loads(message.tool_calls[0].function.arguments)["correction_exists"]

        if correction_exists:
          corrected_text = json.loads(message.tool_calls[0].function.arguments)["corrected_text"]
          explanation = json.loads(message.tool_calls[0].function.arguments)["explanation"]

          # package parameters up neatly
          results = extract_correction(correction_exists, corrected_text, explanation)
        else:
           return False
    else:
        results = f"Error: function {message.tool_calls[0].function.name} does not exist"
    return results

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_correction",
            "description": "Use this function to correct the user's Norwegian.",
            "parameters": {
                "type": "object",
                "properties": {
                    "correction_exists": {
                       "type": "boolean",
                       "description": f"""
                              True if the user's sentence is grammatically incorrect Norwegian.
                              False otherwise.
                          """,
                    },
                    "corrected_text": {
                        "type": "string",
                        "description": f"""
                                The user's sentence rewritten in grammatically correct Norwegian.
                        """,
                    },
                    "explanation": {
                       "type": "string",
                       "description": f"""
                              Explanation of the corrected_text in English for someone who is learning conversational Norwegian.
                       """,
                    }

                },
                "required": ["correction_exists, corrected_text, explanation"],
            },
        }
    },
]

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
        "content": "Er det sant? Det er."
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
if assistant_msg.tool_calls:
   res = execute_function_call(assistant_msg)
   print(res)

#print(response)
