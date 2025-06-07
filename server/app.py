import json
import os
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Load project and profile data
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(BASE_DIR, 'projects.json'), 'r') as f:
    PROJECTS = json.load(f)
with open(os.path.join(BASE_DIR, 'profile.json'), 'r') as f:
    PROFILE = json.load(f)

# In-memory session store
sessions = {}

MODEL = os.getenv('LLAMA_MODEL', 'llama3.2:latest')
OLLAMA_URL = os.getenv('OLLAMA_URL', 'http://localhost:11434/api/generate')
print('Using MODEL =', MODEL)
print('Using OLLAMA_URL =', OLLAMA_URL)

@app.post('/api/chat')
def chat():
    data = request.get_json(force=True)
    message = data.get('message', '').strip()
    session_id = data.get('sessionId', 'default')
    if not message:
        return jsonify({'reply': 'No message provided'}), 400

    state = sessions.setdefault(session_id, {'history': [], 'tone': 'neutral', 'language': 'en'})
    history = state['history']

    lower = message.lower()
    tone_regex = 'set tone to '
    lang_prefix = 'speak in '

    if lower.startswith(tone_regex):
        t = lower[len(tone_regex):].strip()
        state['tone'] = t
        return jsonify({'reply': f"Okay, I'll respond in a {t} tone from now on."})

    if lower.startswith(lang_prefix):
        lang = lower[len(lang_prefix):].strip()
        state['language'] = lang
        return jsonify({'reply': f'Got it. I\'ll reply in {lang} when possible.'})

    if 'projects' in lower or 'portfolio' in lower:
        titles = ', '.join(p['title'] for p in PROJECTS)
        return jsonify({'reply': f'Here are some of my projects: {titles}.'})

    if 'who is varun' in lower or 'who are you' in lower:
        return jsonify({'reply': PROFILE.get('bio', '')})

    if 'experience' in lower or 'work history' in lower:
        summary = '; '.join(f"{e['position']} at {e['company']} ({e['period']})" for e in PROFILE['experience'])
        return jsonify({'reply': f"Here's a summary of my experience: {summary}."})

    if 'education' in lower or 'degree' in lower:
        summary = '; '.join(f"{e['degree']} from {e['school']} ({e['period']})" for e in PROFILE['education'])
        return jsonify({'reply': f"Here's my education: {summary}."})

    # Build conversation prompt with context
    context_lines = '\n'.join([f"User: {m['text']}" if m['sender']=='user' else f"Assistant: {m['text']}" for m in history][-10:])
    prompt = f"{context_lines}\nUser: {message}\nAssistant:"
    system = f"Respond in a {state['tone']} style. Use {state['language']} language."
    final_prompt = f"{system}\n{prompt}".strip()

    try:
        response = requests.post(OLLAMA_URL, json={'model': MODEL, 'prompt': final_prompt, 'stream': False}, timeout=60)
        response.raise_for_status()
        data = response.json()
        reply = data.get('response', '').strip() or "I'm not sure I understood that. Could you rephrase?"
    except Exception as e:
        print('LLM error:', e)
        return jsonify({'reply': 'Oops! Something went wrong.'}), 500

    history.append({'sender': 'user', 'text': message})
    history.append({'sender': 'bot', 'text': reply})
    sessions[session_id] = state

    return jsonify({'reply': reply})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 3001)))
