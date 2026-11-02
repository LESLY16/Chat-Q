# Chat-Q

A lightweight AI chat application inspired by ChatGPT, built with a FastAPI backend and a React + Vite frontend. The project allows users to send prompts, receive AI-generated responses, and view formatted markdown output in a conversational interface.

## Overview

Chat-Q combines:

- A Python backend powered by FastAPI
- A Groq-based AI inference backend using the `openai/gpt-oss-120b` model
- A modern React frontend with Vite for fast client-side development
- Markdown rendering for readable assistant responses
- CORS-enabled API communication between frontend and backend

This repository is designed as a simple full-stack chat app that can be run locally for testing, experimentation, or further customization.

## Features

- Chat-style user interface
- AI-powered conversation responses
- Markdown formatting in chat bubbles
- Real-time server communication via REST API
- Lightweight deployment-friendly backend
- Responsive frontend UI
- Simple local development setup

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS
- React Markdown
- Remark GFM

### Backend
- Python
- FastAPI
- Groq Python SDK
- Python-dotenv

## Project Structure

```text
Chat-Q/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── render.yaml
│   └── .env.example (recommended for local setup)
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── index.html
│   └── README.md
├── .gitignore
├── README.md
└── LICENSE (if added later)
```

## Architecture

### Backend
The backend is implemented in `backend/main.py` and creates a FastAPI application that:

- loads environment variables from a `.env` file
- reads the Groq API key from `GROQ_API_KEY`
- exposes a health endpoint at `/`
- exposes a chat endpoint at `/chat`
- sends the conversation history to Groq
- returns the generated assistant response as JSON

The backend uses a universal system prompt to instruct the model to respond in a structured, readable way with headings, bullet points, explanations, and examples.

### Frontend
The frontend is a Vite React app located in `frontend/`. It:

- maintains a message list in local state
- sends user messages to the backend API
- renders AI responses with `react-markdown`
- supports keyboard submission with Enter and multi-line input with Shift+Enter
- shows temporary loading state while waiting for the server

## API Endpoints

### GET /
Returns a simple success message indicating that the API is running.

Example response:

```json
{
  "status": "success",
  "message": "AI Tutor API Running"
}
```

### POST /chat
Accepts a JSON payload with a message list.

Request body example:

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Explain recursion in Python."
    }
  ]
}
```

Example response:

```json
{
  "response": "## Answer\nRecursion is ..."
}
```

## Local Setup

### Prerequisites

Before running the project, make sure you have installed:

- Python 3.10+
- Node.js 18+
- npm
- A Groq API key

### 1. Clone the repository

```bash
git clone https://github.com/LESLY16/Chat-Q.git
cd Chat-Q
```

### 2. Configure backend environment

Create a `.env` file in the `backend/` directory:

```env
GROQ_API_KEY=your_groq_api_key_here
```

You can also add any other required environment variables if needed in the future.

### 3. Install backend dependencies

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 4. Run the backend

From the repository root:

```bash
uvicorn backend.main:app --reload
```

The backend will typically run at:

```text
http://localhost:8000
```

### 5. Configure frontend environment

In the `frontend/` directory, create a `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

### 6. Install frontend dependencies

```bash
cd frontend
npm install
```

### 7. Run the frontend

```bash
npm run dev
```

The frontend will usually run at:

```text
http://localhost:5173
```

## Production / Deployment Notes

The backend includes a `render.yaml` file for deployment on Render, which makes it suitable for cloud hosting. The frontend is built as a Vite app and can be deployed to static hosting providers such as Vercel, Netlify, or similar services.

## Environment Variables

### Backend
- `GROQ_API_KEY`: required for authentication with the Groq API

### Frontend
- `VITE_API_URL`: base URL of the backend API (for example `http://localhost:8000`)

## Development Notes

- The frontend communicates with the backend using a relative URL built from `VITE_API_URL`.
- The backend has CORS enabled with `allow_origins=["*"]` for local development convenience.
- The application currently uses the Groq model `openai/gpt-oss-120b`.
- AI responses are returned as plain strings and rendered using Markdown.

## Future Improvements

Potential improvements for this project include:

- user authentication
- chat history persistence
- conversation export/import
- streaming responses
- model selection UI
- dark mode / theme customization
- better error handling and retry logic
- enhanced UI for mobile devices
- deployment-ready Docker setup

## Contributing

Contributions are welcome. If you want to improve the UI, add features, or fix bugs:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## License

This project does not currently specify a license in the repository. If you plan to distribute or reuse it commercially, consider adding an appropriate open-source license.

## Author

Project repository: `LESLY16/Chat-Q`

## Summary

Chat-Q is a simple but powerful AI chat application that demonstrates how to connect a React frontend to a Python FastAPI backend powered by Groq. It is a good foundation for learning full-stack app development, AI integration, and chat UX design.

If you want to extend this app into a production-ready product, the cleanest next steps are to add persistence, authentication, and a stronger deployment pipeline.
