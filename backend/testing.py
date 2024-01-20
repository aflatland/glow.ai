import openai
import json

client = openai.OpenAI()

messages = [
    {"role":"system", "content":"Translate Norwegian to English"},
    {"role":"user", "content":"Jeg er veldig sterk!"}
]

response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=messages,
)

generated_text = response.choices[0].message


print(generated_text)