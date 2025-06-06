import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

const MODEL = process.env.LLAMA_MODEL || 'llama3.2:latest';
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434/api/generate';

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ reply: 'No message provided' });
  }
  try {
    const resp = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        prompt: message,
        stream: false,
      }),
    });
    const data = await resp.json();
    res.json({ reply: data.response.trim() });
  } catch (err) {
    console.error('LLM error:', err.message);
    console.error('Is the Ollama server running on', OLLAMA_URL, '?');
    res.status(500).json({ reply: 'Oops! Something went wrong.' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Chat server listening on ${port}`));
