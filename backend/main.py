import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq

# Load environment variables
load_dotenv()

# Read API key
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError(
        "GROQ_API_KEY not found. Please create a .env file."
    )

# Initialize Groq client
client = Groq(
    api_key=GROQ_API_KEY
)

# FastAPI app
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Universal System Prompt
SYSTEM_PROMPT = """
You are an intelligent AI Assistant, Teacher, Programmer, Researcher and Problem Solver.

GENERAL RULES

- Always answer directly.
- Use Markdown formatting.
- Never generate HTML tags.
- Use headings and bullet lists.
- Keep formatting clean and readable.

MATHEMATICS

- Show all formulas.
- Show calculations step by step.
- Highlight final answers.

PROGRAMMING

- Generate complete runnable code.
- Use Markdown code blocks.
- Explain code clearly.

WRITING

- Use proper indentation and spacing.
- Keep paragraphs short.
- Use headings and subheadings when useful.

FORMAT

Use this structure whenever possible:

## Answer

Direct answer.

## Explanation

Detailed explanation.

## Example

Worked example.

## Summary

Short conclusion.
"""

@app.get("/")
def home():
    return {
        "status": "success",
        "message": "AI Tutor API Running"
    }

@app.post("/chat")
async def chat(data: dict):

    messages = data.get("messages", [])

    full_messages = [
        {
            "role": "system",
            "content": SYSTEM_PROMPT
        }
    ] + messages

    try:

        completion = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=full_messages,
            temperature=0.2,
            max_tokens=2000
        )

        answer = (
            completion
            .choices[0]
            .message
            .content
        )

        return {
            "response": answer
        }

    except Exception as e:

        return {
            "response": f"Groq Error: {str(e)}"
        }
