import express from 'express';
import axios from 'axios';
import fs from 'node:fs';

const projects = JSON.parse(fs.readFileSync(new URL('./projects.json', import.meta.url)));
const profile = JSON.parse(fs.readFileSync(new URL('./profile.json', import.meta.url)));

const app = express();
app.use(express.json());

const MODEL = process.env.LLAMA_MODEL || 'llama3.2:latest';
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434/api/generate';

console.log('\u25B6\uFE0E Using MODEL =', MODEL);
console.log('\u25B6\uFE0E Using OLLAMA_URL =', `'${OLLAMA_URL}'`);

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  console.log('• Received POST /api/chat with body:', req.body);

  if (!message) {
    return res.status(400).json({ reply: 'No message provided' });
  }
  try {
    const lower = message.toLowerCase();
    const projectKeywords = /\bprojects?\b|portfolio/;
    const experienceKeywords = /\bexperience\b|work history|background/;
    const educationKeywords = /\beducation\b|degree|studies/;
    const bioKeywords = /who\s+is\s+varun|who\s+are\s+you|tell me about (?:yourself|varun)/;

    if (projectKeywords.test(lower)) {
      const list = projects.map((p) => p.title).join(', ');
      return res.json({ reply: `Here are some of my projects: ${list}.` });
    }

    if (bioKeywords.test(lower)) {
      return res.json({ reply: profile.bio });
    }

    if (experienceKeywords.test(lower)) {
      const summary = profile.experience
        .map((e) => `${e.position} at ${e.company} (${e.period})`)
        .join('; ');
      return res.json({ reply: `Here's a summary of my experience: ${summary}.` });
    }

    if (educationKeywords.test(lower)) {
      const summary = profile.education
        .map((e) => `${e.degree} from ${e.school} (${e.period})`)
        .join('; ');
      return res.json({ reply: `Here's my education: ${summary}.` });
    }

    console.log(`→ Forwarding to Ollama at: ${OLLAMA_URL}`);
    console.log('  Payload =', { model: MODEL, prompt: message, stream: false });

    const resp = await axios.post(OLLAMA_URL, {
      model: MODEL,
      prompt: message,
      stream: false,
    });

    console.log('← Ollama replied:', resp.data);
    res.json({ reply: resp.data.response.trim() });
  } catch (err) {
    console.error('LLM error (full error object):', err);
    console.error('Is the Ollama server running on', OLLAMA_URL, '?');
    res.status(500).json({ reply: 'Oops! Something went wrong.' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Chat server listening on ${port}`));
