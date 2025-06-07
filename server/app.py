# server/app.py

import os
import json
import requests
import numpy as np
from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# ─── 1. LOAD YOUR DATA ─────────────────────────────────────────────────────────

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# projects.json can be either a list or an object with a "projects" key
with open(os.path.join(BASE_DIR, "projects.json"), "r") as f:
    raw = json.load(f)
if isinstance(raw, dict) and "projects" in raw:
    PROJECTS = raw["projects"]
elif isinstance(raw, list):
    PROJECTS = raw
else:
    raise RuntimeError("projects.json must be a list or contain a top-level 'projects' key")

# profile.json is your big nested resume object
with open(os.path.join(BASE_DIR, "profile.json"), "r") as f:
    PROFILE = json.load(f)

# Extract a simple bio
BIO = PROFILE["biographical_information"]["professional_summary"][
    "detailed_description"
][0]

# Flatten experience entries
EXP_LIST = []
for entry in PROFILE["professional_experience"]["timeline"]:
    pos   = entry["position"]["title"]
    comp  = entry["company"]["name"]
    start = entry["position"]["period"]["start"]
    end   = entry["position"]["period"]["end"]
    EXP_LIST.append({
        "position": pos,
        "company":  comp,
        "period":   f"{start} – {end}"
    })

# Flatten education entries
EDU_LIST = []
for entry in PROFILE["education_background"]["degree_programs"]:
    deg  = entry["degree"]["title"]
    school = entry["institution"]["name"]
    dur  = entry["degree"]["duration"]
    EDU_LIST.append({
        "degree": deg,
        "school": school,
        "period": dur
    })

# ─── 2. PREPARE RAG EMBEDDINGS ──────────────────────────────────────────────────

# Build a list of text snippets + metadata tags
rag_texts = []
rag_meta  = []

for p in PROJECTS:
    rag_texts.append(p["description"])
    rag_meta.append(f"Project – {p['title']}")

for e in EXP_LIST:
    snippet = f"{e['position']} at {e['company']} ({e['period']})"
    rag_texts.append(snippet)
    rag_meta.append("Experience")

for ed in EDU_LIST:
    snippet = f"{ed['degree']} from {ed['school']} ({ed['period']})"
    rag_texts.append(snippet)
    rag_meta.append("Education")

# Compute embeddings once
embedder      = SentenceTransformer("all-MiniLM-L6-v2")
rag_embeddings = embedder.encode(rag_texts, convert_to_numpy=True)

# ─── 3. SESSION STORE & LLM CONFIG ────────────────────────────────────────────

sessions = {}

MODEL      = os.getenv("LLAMA_MODEL",  "llama3.2:latest")
OLLAMA_URL = os.getenv("OLLAMA_URL",   "http://localhost:11434/api/generate")

SYSTEM_PROMPT = """
You are Varun Tyagi’s AI avatar.
You know Varun’s resume, projects, and achievements.
Speak in a {tone} tone, in {language}.
"""

# ─── 4. INTENT DETECTION & RAG ─────────────────────────────────────────────────

def detect_intent(text: str) -> str:
    l = text.lower()
    if any(k in l for k in ("who is varun", "tell me about varun", "introduce yourself")):
        return "bio"
    if any(k in l for k in ("projects", "portfolio")):
        return "projects"
    if any(k in l for k in ("experience", "work history", "background")):
        return "experience"
    if any(k in l for k in ("education", "degree", "studies")):
        return "education"
    return "fallback"

def retrieve_context(query: str, top_k: int = 3) -> str:
    q_emb = embedder.encode([query], convert_to_numpy=True)
    sims  = cosine_similarity(q_emb, rag_embeddings)[0]
    idxs  = sims.argsort()[-top_k:][::-1]
    return "\n".join(f"[{rag_meta[i]}] {rag_texts[i]}" for i in idxs)

# ─── 5. THE /api/chat ENDPOINT ─────────────────────────────────────────────────

@app.post("/api/chat")
def chat():
    data       = request.get_json(force=True)
    message    = data.get("message", "").strip()
    session_id = data.get("sessionId", "default")

    if not message:
        return jsonify({"reply": "No message provided"}), 400

    state = sessions.setdefault(
        session_id,
        {"history": [], "tone": "neutral", "language": "English"}
    )
    history  = state["history"]
    tone     = state["tone"]
    language = state["language"]

    intent = detect_intent(message)

    # ── DIRECT JSON RESPONSES ──────────────────────
    if intent == "bio":
        return jsonify({"reply": BIO})
    if intent == "projects":
        titles = ", ".join(p["title"] for p in PROJECTS)
        return jsonify({"reply": f"My key projects are: {titles}."})
    if intent == "experience":
        summ = "; ".join(f"{e['position']} at {e['company']} ({e['period']})" for e in EXP_LIST)
        return jsonify({"reply": f"Here's my experience: {summ}."})
    if intent == "education":
        summ = "; ".join(f"{e['degree']} from {e['school']} ({e['period']})" for e in EDU_LIST)
        return jsonify({"reply": f"Here's my education: {summ}."})

    # ── TONE / LANGUAGE COMMANDS ───────────────────
    low = message.lower()
    if low.startswith("set tone to "):
        new_tone    = low.replace("set tone to ", "").strip()
        state["tone"] = new_tone
        return jsonify({"reply": f"Okay, I'll respond in a {new_tone} tone from now on."})
    if low.startswith("speak in "):
        new_lang      = low.replace("speak in ", "").strip().capitalize()
        state["language"] = new_lang
        return jsonify({"reply": f"Sure — I'll reply in {new_lang}."})

    # ── RAG + LLM FALLBACK ─────────────────────────
    context = retrieve_context(message)
    convo   = "\n".join(f"{m['sender']}: {m['text']}" for m in history[-6:])
    system  = SYSTEM_PROMPT.format(tone=tone, language=language).strip()
    prompt  = f"{system}\nContext:\n{context}\n{convo}\nUser: {message}\nAssistant:"

    try:
        resp = requests.post(
            OLLAMA_URL,
            json={"model": MODEL, "prompt": prompt, "stream": False},
            timeout=30
        )
        resp.raise_for_status()
        llm_out = resp.json().get("response", "").strip()
        reply   = llm_out or "I’m not sure I understood that. Could you rephrase?"
    except Exception as e:
        print("LLM error:", e)
        reply = "Oops! Something went wrong."

    # Save conversation history
    history.append({"sender": "User",      "text": message})
    history.append({"sender": "Assistant", "text": reply})

    return jsonify({"reply": reply})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3002)
