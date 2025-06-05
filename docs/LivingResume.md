# Living Resume

This portfolio includes an experimental "Living Resume" page that exposes a conversational AI avatar. You can access it at `/living-resume` once the project is running.

## How It Works

- **Chat Interface**: A simple React component maintains the conversation history and sends the user message to `/api/chat`.
- **LLM Backend**: Implement the `/api/chat` endpoint using your preferred LLM provider (OpenAI, local model, etc.). The endpoint should accept the current chat history and return a JSON response with a `reply` field.
- **Speech Synthesis**: Browser speech synthesis is triggered on each reply so the avatar can speak the response aloud.

The AI avatar should be trained on your resume, project descriptions, and blog posts so it can respond in your voice and style. You can fine-tune a model or create embeddings for retrieval-augmented generation.

This feature showcases skills in NLP, LLMs, and front‑end integration.
