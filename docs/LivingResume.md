````markdown
# Living Resume

This portfolio includes an experimental "Living Resume" page that exposes a conversational AI avatar. You can access it at `/living-resume` once the project is running.

## How It Works

- **Chat Interface**: A simple React component maintains the conversation history and sends the user message to `/api/chat`.  
- **LLM Backend**: Implement the `/api/chat` endpoint using your preferred LLM provider (OpenAI, local model, etc.). The endpoint should accept the current chat history and return a JSON response with a `reply` field.  
- **Speech Synthesis**: Browser speech synthesis is triggered on each reply so the avatar can speak the response aloud.  

The AI avatar should be trained on your resume, project descriptions, and blog posts so it can respond in your voice and style. You can fine-tune a model or create embeddings for retrieval-augmented generation.

This feature showcases skills in NLP, LLMs, and front-end integration.  
The backend also knows about the portfolio projects listed in `server/projects.json`. If the user asks about "projects" in chat, the server will respond with a short list instead of forwarding the question to the LLM.  
It can also summarize my work experience and education from `server/profile.json`.  
It will even introduce me if you ask "Who is Varun?" using the brief bio stored in that file.

### Voice Controls

Speech output supports pause/resume. Use the buttons below the chat input to pause or resume the spoken reply. Sending a new message automatically stops any previous speech.

## Local Llama Setup

The repository now includes a small Express server that proxies requests to a local Llama model served by [Ollama](https://ollama.ai/).

1. **In one terminal**, start the Ollama server (use `ollama serve`, not `ollama run`):

   ```sh
   ollama serve
````

2. **In a second terminal**, pull the desired model (only needed the first time) and start the chat server. Leave this terminal running so the front end can reach it:

   ```sh
   ollama pull llama3.2:latest
   # install dependencies if you haven't already
   npm install --legacy-peer-deps
   npm run server
   ```

   The server should print `Chat server listening on 3001` when it starts.

3. **Verify the chat endpoint is responding**:

   ```sh
   curl -X POST http://localhost:3001/api/chat \
     -H 'Content-Type: application/json' \
     -d '{"message":"ping"}'
   ```

4. **Finally, start the Vite dev server**:

   ```sh
   npm run dev
   ```

5. **Open in your browser**
   Navigate to [http://localhost:8080/living-resume](http://localhost:8080/living-resume) to chat with your AI avatar powered by the local model.

If you see connection errors, confirm the Ollama API is reachable:

```sh
curl http://localhost:11434/api/generate
```

You can also test the chat server directly again:

```sh
curl -X POST http://localhost:3001/api/chat \
  -H 'Content-Type: application/json' \
  -d '{"message":"ping"}'
```

If the chat interface reports an `ECONNREFUSED` error, double-check that both `ollama serve` and `npm run server` are running in their own terminals.

---

## Technologies Used

* **Frontend**: React, TypeScript, Vite
* **Styling**: Tailwind CSS, shadcn/ui component library
* **3D Graphics**: Three.js, React Three Fiber, React Three Drei
* **Animations**: React Spring
* **Form Handling**: EmailJS for contact form submission
* **Routing**: React Router for navigation
* **Deployment**: Vercel

---

## Getting Started

### Prerequisites

* Node.js 16+ and npm installed

### Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install NPM packages**

   ```sh
   npm install --legacy-peer-deps
   ```

3. **Start the Ollama server**

   ```sh
   ollama serve
   ```

4. **Run the chat API** (in a second terminal)

   ```sh
   ollama pull llama3.2:latest
   npm run server
   ```

5. **Verify the chat endpoint**

   ```sh
   curl -X POST http://localhost:3001/api/chat \
     -H 'Content-Type: application/json' \
     -d '{"message":"ping"}'
   ```

6. **Start the Vite dev server**

   ```sh
   npm run dev
   ```

7. **Open in your browser**
   Navigate to [http://localhost:8080](http://localhost:8080) to view the portfolio locally.

---

### Building for Production

To create an optimized, production-ready build, run:

```sh
npm run build
```

---

## Project Structure

```
src/
├── components/        # UI components
│   ├── ui/            # Base UI components from shadcn/ui
│   ├── three/         # 3D-related components
│   ├── projects/      # Project showcase components
│   ├── contact/       # Contact form components
│   └── achievements/  # Achievements display components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Page components (Home, About, Living Resume, etc.)
└── main.tsx           # Application entry point
```

---

## Deployment

This site is configured for deployment on Vercel.

1. In your Vercel dashboard, add an environment variable `NPM_FLAGS` with the value `--legacy-peer-deps`.
2. Connect your GitHub repository to Vercel for automatic deployments.

---

## Troubleshooting

If you encounter an `ECONNREFUSED` error when chatting with the avatar, check:

1. **Ollama server**:

   ```sh
   ollama serve
   ```

2. **Chat API server**:

   ```sh
   npm run server
   ```

3. **Ollama API connectivity**:

   ```sh
   curl http://localhost:11434/api/generate
   ```

4. **Chat endpoint**:

   ```sh
   curl -X POST http://localhost:3001/api/chat \
     -H 'Content-Type: application/json' \
     -d '{"message":"ping"}'
   ```

---

## Contact

Varun Tyagi – [varun28082001@gmail.com](mailto:varun28082001@gmail.com)
Project Link: [https://github.com/yourusername/portfolio](https://github.com/yourusername/portfolio)

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

```

This is the final version of your document without any conflicts. Let me know if any other changes are needed!
```
