// import express from 'express';
// import axios from 'axios';

// const app = express();
// app.use(express.json());

// const MODEL = process.env.LLAMA_MODEL || 'llama3.2:latest';
// const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434/api/generate';

// app.post('/api/chat', async (req, res) => {
//   const { message } = req.body;
//   if (!message) {
//     return res.status(400).json({ reply: 'No message provided' });
//   }
//   try {
//     const resp = await axios.post(OLLAMA_URL, {
//       model: MODEL,
//       prompt: message,
//       stream: false,
//     });
//     res.json({ reply: resp.data.response.trim() });
//   } catch (err) {
//     console.error('LLM error:', err.message);
//     res.status(500).json({ reply: 'Oops! Something went wrong.' });
//   }
// });

// const port = process.env.PORT || 3001;
// app.listen(port, () => console.log(`Chat server listening on ${port}`));
import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

// If you have exported LLAMA_MODEL or OLLAMA_URL in your shell, it will pick that up.
// Otherwise it falls back to these defaults:
const MODEL = process.env.LLAMA_MODEL || 'llama3.2:latest';
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434/api/generate';

console.log('▶︎ Using MODEL =', MODEL);
console.log('▶︎ Using OLLAMA_URL =', `'${OLLAMA_URL}'`);

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  console.log('• Received POST /api/chat with body:', req.body);

  if (!message) {
    return res.status(400).json({ reply: 'No message provided' });
  }

  try {
    // Just before we call Axios, log the URL again:
    console.log(`→ Forwarding to Ollama at: ${OLLAMA_URL}`);
    console.log('  Payload =', { model: MODEL, prompt: message, stream: false });

    const resp = await axios.post(OLLAMA_URL, {
      model: MODEL,
      prompt: message,
      stream: false,
    });

    console.log('← Ollama replied:', resp.data);
    return res.json({ reply: resp.data.response.trim() });
  } catch (err) {
    // Log the full error, not just err.message
    console.error('LLM error (full error object):', err);
    // In most cases err.message will show "Invalid URL" if the URL was bad
    return res.status(500).json({ reply: 'Oops! Something went wrong.' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Chat server listening on ${port}`));
