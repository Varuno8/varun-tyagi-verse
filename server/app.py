# server/app.py
import os
import re
import json
import requests
import numpy as np
from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# ─── 1. LOAD JSON ───────────────────────────────────────────────────────────────

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# projects.json has top-level "projects" array
with open(os.path.join(BASE_DIR, "projects.json"), "r") as f:
    pj = json.load(f)
PROJECTS = pj.get("projects", pj)  # either dict or list

# profile.json  
with open(os.path.join(BASE_DIR, "profile.json"), "r") as f:
    PROFILE = json.load(f)

# extract bio / headline
HEADLINE = PROFILE["biographical_information"]["professional_summary"]["headline"]
BIO      = PROFILE["biographical_information"]["professional_summary"]["detailed_description"][0]

# flatten experience
EXP_LIST = []
for e in PROFILE["professional_experience"]["timeline"]:
    title = e["position"]["title"]
    comp  = e["company"]["name"]
    start = e["position"]["period"]["start"]
    end   = e["position"]["period"]["end"]
    EXP_LIST.append({"position": title, "company": comp, "period": f"{start} – {end}"})

# flatten education
EDU_LIST = []
for ed in PROFILE["education_background"]["degree_programs"]:
    degree = ed["degree"]["title"]
    school = ed["institution"]["name"]
    dur    = ed["degree"]["duration"]
    EDU_LIST.append({"degree": degree, "school": school, "period": dur})

# ─── 2. RAG EMBEDDINGS ─────────────────────────────────────────────────────────

rag_texts = []
rag_meta  = []

for p in PROJECTS:
    rag_texts.append(p["description"])
    rag_meta.append(f"Project – {p['title']}")

for e in EXP_LIST:
    snip = f"{e['position']} at {e['company']} ({e['period']})"
    rag_texts.append(snip)
    rag_meta.append("Experience")

for e in EDU_LIST:
    snip = f"{e['degree']} from {e['school']} ({e['period']})"
    rag_texts.append(snip)
    rag_meta.append("Education")

embedder       = SentenceTransformer("all-MiniLM-L6-v2")
rag_embeddings = embedder.encode(rag_texts, convert_to_numpy=True)

# ─── 3. SESSION & LLM CONFIG ───────────────────────────────────────────────────

sessions   = {}
MODEL      = os.getenv("LLAMA_MODEL",  "llama3.2:latest")
OLLAMA_URL = os.getenv("OLLAMA_URL",   "http://localhost:11434/api/generate")

SYSTEM_PROMPT = f"""
You are Varun Tyagi’s AI avatar ({HEADLINE}).
You know Varun’s resume, projects, and achievements.
Speak in a {{tone}} tone, in {{language}}.
""".strip()

# ─── 4. HELPERS ─────────────────────────────────────────────────────────────────

def detect_intent(text: str) -> str:
    clean = re.sub(r"[^\w\s]", "", text.lower())
    if any(k in clean for k in ("who is varun", "tell me about varun", "introduce yourself")):
        return "bio"
    if any(k in clean for k in ("projects", "portfolio")):
        return "projects"
    if any(k in clean for k in ("experience", "work history", "background")):
        return "experience"
    if any(k in clean for k in ("education", "degree", "studies")):
        return "education"
    return "fallback"

def retrieve_context(query: str, top_k: int = 3) -> str:
    q_emb = embedder.encode([query], convert_to_numpy=True)
    sims  = cosine_similarity(q_emb, rag_embeddings)[0]
    idxs  = sims.argsort()[-top_k:][::-1]
    return "\n".join(f"[{rag_meta[i]}] {rag_texts[i]}" for i in idxs)

# ─── 5. /api/chat ───────────────────────────────────────────────────────────────

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

    # direct answers
    if intent == "bio":
        return jsonify({"reply": BIO})
    if intent == "projects":
        titles = ", ".join(p["title"] for p in PROJECTS)
        return jsonify({"reply": f"My projects are: {titles}."})
    if intent == "experience":
        summ = "; ".join(f"{e['position']} at {e['company']} ({e['period']})" for e in EXP_LIST)
        return jsonify({"reply": f"Here's my experience: {summ}."})
    if intent == "education":
        summ = "; ".join(f"{e['degree']} from {e['school']} ({e['period']})" for e in EDU_LIST)
        return jsonify({"reply": f"Here's my education: {summ}."})

    # tone/lang
    low = message.lower()
    if low.startswith("set tone to "):
        new = low.replace("set tone to ", "").strip()
        state["tone"] = new
        return jsonify({"reply": f"Okay, I'll respond in a {new} tone now."})
    if low.startswith("speak in "):
        new = low.replace("speak in ", "").strip().capitalize()
        state["language"] = new
        return jsonify({"reply": f"Sure — I'll reply in {new}."})

    # RAG + LLM fallback
    context = retrieve_context(message)
    convo   = "\n".join(f"{m['sender']}: {m['text']}" for m in history[-6:])
    system  = SYSTEM_PROMPT.format(tone=tone, language=language)
    prompt  = f"{system}\n\nContext:\n{context}\n\n{convo}\nUser: {message}\nAssistant:"

    try:
        resp = requests.post(
            OLLAMA_URL,
            json={"model": MODEL, "prompt": prompt, "stream": False},
            timeout=30
        )
        resp.raise_for_status()
        llm_out = resp.json().get("response", "").strip()
        reply   = llm_out or "I’m not sure I understood. Could you rephrase?"
    except Exception as e:
        print("LLM error:", e)
        reply = "Oops! Something went wrong."

    # save & return
    history.append({"sender": "User",      "text": message})
    history.append({"sender": "Assistant", "text": reply})
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3002)
