import json
import os
from dotenv import load_dotenv
import google.generativeai as genai


# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def load_design_system(path='design\design-system.json'):
    with open(path, "r") as f:
        return json.load(f)

def build_prompt(user_prompt, design_tokens):
    return f"""
You are an Angular code generator.
Use ONLY the following design tokens: {json.dumps(design_tokens)}.
Generate a valid Angular component using Angular Material and Tailwind CSS.
The component must strictly follow the design tokens (colors, font, border-radius).
User request: "{user_prompt}"
Output raw Angular code only, no explanations or comments.
"""

def generate_component(user_prompt, model="models/gemini-2.5-flash"):
    design_tokens = load_design_system()
    prompt = build_prompt(user_prompt, design_tokens)

    model = genai.GenerativeModel(model)
    response = model.generate_content(prompt)

    # Gemini returns text in response.text
    return response.text

