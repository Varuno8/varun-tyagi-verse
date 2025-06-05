# Living Resume

This portfolio includes an experimental "Living Resume" page that exposes a conversational AI avatar. You can access it at `/living-resume` once the project is running.

## How It Works

- **Chat Interface**: A simple React component maintains the conversation history and sends the user message to `/api/chat`.
- **LLM Backend**: Implement the `/api/chat` endpoint using your preferred LLM provider (OpenAI, local model, etc.). The endpoint should accept the current chat history and return a JSON response with a `reply` field.
- **Speech Synthesis**: Browser speech synthesis is triggered on each reply so the avatar can speak the response aloud.

The AI avatar should be trained on your resume, project descriptions, and blog posts so it can respond in your voice and style. You can fine-tune a model or create embeddings for retrieval-augmented generation.

This feature showcases skills in NLP, LLMs, and front‑end integration.

## Local Llama Setup

The repository now includes a small Express server that proxies requests to a local Llama model served by [Ollama](https://ollama.ai/).

1. Start the Ollama server and pull the desired model, for example:

   ```sh
   ollama serve &
   ollama pull llama3.2:latest
   ```

2. In a separate terminal, run the chat server:

   ```sh
   npm run server
   ```

   This starts an API on `http://localhost:3001/api/chat`.

3. Finally, start the Vite dev server:

   ```sh
   npm run dev
   ```

Navigate to `http://localhost:8080/living-resume` to chat with your AI avatar powered by the local model.
