import express from 'express';
import fetch from 'node-fetch';
import fs from 'node:fs';

const projects = JSON.parse(fs.readFileSync(new URL('./projects.json', import.meta.url)));
const profile = JSON.parse(fs.readFileSync(new URL('./profile.json', import.meta.url)));

const app = express();
app.use(express.json());

// Keep chat state (history, tone, language) in memory for each session ID
const sessions = new Map();

const MODEL = process.env.LLAMA_MODEL || 'llama3.2:latest';
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434/api/generate';

console.log('\u25B6\uFE0E Using MODEL =', MODEL);
console.log('\u25B6\uFE0E Using OLLAMA_URL =', `'${OLLAMA_URL}'`);

app.post('/api/chat', async (req, res) => {
  const { message, sessionId = 'default' } = req.body;
  const state = sessions.get(sessionId) || { history: [], tone: 'neutral', language: 'en' };
  const { history, tone, language } = state;
  console.log('• Received POST /api/chat with body:', req.body);

  if (!message) {
    return res.status(400).json({ reply: 'No message provided' });
  }
  try {
    const lower = message.toLowerCase();
    const projectKeywords = /\bprojects?\b|portfolio/;
    const projectDetailRegex = /(read|show|tell).*\b(details?)\b.*(\b[A-Za-z0-9- ]+)/;
    const experienceKeywords = /\bexperience\b|work history|background/;
    const educationKeywords = /\beducation\b|degree|studies/;
    const skillsKeywords = /\bskills?\b|tech stack/;
    const achievementKeywords = /\bachievements?\b|accomplishments?/;
    const bioKeywords = /who\s+is\s+varun|who\s+are\s+you|tell me about (?:yourself|varun)/;
    const toneRegex = /set tone to (casual|formal)/;
    const langRegex = /speak in (\w+)/;

    if (toneRegex.test(lower)) {
      const match = lower.match(toneRegex);
      const [, t] = match || [];
      if (t) {
        state.tone = t;
        sessions.set(sessionId, state);
        return res.json({ reply: `Okay, I'll respond in a ${t} tone from now on.` });
      }
    }

    if (langRegex.test(lower)) {
      const match = lower.match(langRegex);
      const [, lang] = match || [];
      if (lang) {
        state.language = lang.toLowerCase();
        sessions.set(sessionId, state);
        return res.json({ reply: `Got it. I'll reply in ${lang} when possible.` });
      }
    }

    if (projectDetailRegex.test(lower)) {
      const match = lower.match(projectDetailRegex);
      const name = match ? match[3].trim() : '';
      const proj = projects.find(p => p.title.toLowerCase().includes(name));
      if (proj) {
        return res.json({ reply: `${proj.title}: ${proj.description}` });
      }
    }

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

    if (skillsKeywords.test(lower)) {
      const list = [
        ...profile.skills.languages,
        ...profile.skills.frameworks,
        ...profile.skills.ml
      ].join(', ');
      return res.json({ reply: `Here are some of my key skills: ${list}.` });
    }

    if (achievementKeywords.test(lower)) {
      const list = profile.achievements.join('; ');
      return res.json({ reply: `Here are some of my achievements: ${list}.` });
    }

    // Build a conversation prompt using the previous messages and tone/language hints.
    const contextLines = history
      .slice(-10)
      .map((m) => `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
      .join('\n');
    const prompt = `${contextLines}\nUser: ${message}\nAssistant:`.trim();
    const system = `Respond in a ${tone} style. Use ${language} language.`;
    const finalPrompt = `${system}\n${prompt}`;

    console.log(`→ Forwarding to Ollama at: ${OLLAMA_URL}`);
    console.log('  Payload =', { model: MODEL, prompt: finalPrompt, stream: false });

    const resp = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: MODEL, prompt: finalPrompt, stream: false }),
    });
    const data = await resp.json();
    let reply = data.response.trim();
    if (!reply) {
      reply = 'I\'m not sure I understood that. Could you rephrase?';
    }
    console.log('← Ollama replied:', data);

    // save conversation history for this session
    history.push({ sender: 'user', text: message });
    history.push({ sender: 'bot', text: reply });
    sessions.set(sessionId, { history, tone: state.tone, language: state.language });

    res.json({ reply });
  } catch (err) {
    console.error('LLM error (full error object):', err);
    console.error('Is the Ollama server running on', OLLAMA_URL, '?');
    res.status(500).json({ reply: 'Oops! Something went wrong.' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Chat server listening on ${port}`));
