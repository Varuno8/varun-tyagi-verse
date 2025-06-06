import express from 'express';
import axios from 'axios';

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
    const resp = await axios.post(OLLAMA_URL, {
      model: MODEL,
      prompt: message,
      stream: false,
    });
    res.json({ reply: resp.data.response.trim() });
  } catch (err) {
    console.error('LLM error:', err.message);
    res.status(500).json({ reply: 'Oops! Something went wrong.' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Chat server listening on ${port}`));
