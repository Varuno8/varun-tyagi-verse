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

1. In one terminal, start the Ollama server (again, **use `ollama serve`, not `ollama run`**):

   ```sh
   ollama serve
   ```

2. In a **second terminal**, pull the desired model (only needed the first time) and start the chat server. Leave this terminal running so the front end can reach it:

   ```sh
   ollama pull llama3.2:latest
   npm run server

   The server should print `Chat server listening on 3001` when it starts.
   ```

   This starts an API on `http://localhost:3001/api/chat`.

   You can test it with:

   ```sh
   curl -X POST http://localhost:3001/api/chat \
     -H 'Content-Type: application/json' \
     -d '{"message":"ping"}'
   ```

3. Finally, start the Vite dev server:

   ```sh
   npm run dev
   ```

Navigate to `http://localhost:8080/living-resume` to chat with your AI avatar powered by the local model.

If you see connection errors, confirm the Ollama API is reachable:
```sh
curl http://localhost:11434/api/generate
```
You can also test the chat server directly:
```sh
curl -X POST http://localhost:3001/api/chat \
  -H 'Content-Type: application/json' \
  -d '{"message":"ping"}'
```

If the chat interface reports an `ECONNREFUSED` error, double-check that both
`ollama serve` and `npm run server` are running in their own terminals.
