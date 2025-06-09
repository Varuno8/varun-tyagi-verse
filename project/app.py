"""Flask web app serving an offline talking avatar.

Setup:
    pip install flask TTS
    # Download SadTalker and models (https://github.com/OpenTalker/SadTalker)
    # Ensure ffmpeg is installed and accessible from the command line.

This app expects the SadTalker inference script to be available at
'SadTalker/inference.py'. Adjust SADTALKER_SCRIPT path if needed.
Place an avatar image as `static/avatar.png` (see `static/README.md` for a
download link).
"""

import os
import threading
import subprocess
from flask import Flask, request, send_file, render_template, abort

import chatbot
from TTS.api import TTS

app = Flask(__name__)

# Load TTS model once at startup. Replace model name with downloaded one.
tts = TTS(model_name="tts_models/en/ljspeech/vits", progress_bar=False)

AUDIO_PATH = os.path.join("static", "audio.wav")
VIDEO_PATH = os.path.join("static", "answer.mp4")

SADTALKER_SCRIPT = os.path.join(os.getcwd(), "SadTalker", "inference.py")
# Path to the avatar image used for animation. Provide your own image at this
# location or update the path. A sample avatar can be downloaded from:
# https://raw.githubusercontent.com/github/explore/main/topics/octocat/octocat.png
AVATAR_IMAGE = os.path.join("static", "avatar.png")

# Simple cache: question -> video path
CACHE = {}


def synthesize_audio(text: str, path: str = AUDIO_PATH) -> None:
    """Generate speech audio from text using Coqui TTS."""
    tts.tts_to_file(text=text, file_path=path)


def run_sadtalker(audio: str, output: str, image: str = AVATAR_IMAGE) -> None:
    """Run SadTalker to create talking-head video."""
    if not os.path.exists(image):
        raise FileNotFoundError(
            f"Avatar image not found: {image}. Place an image at this path." )
    cmd = [
        "python",
        SADTALKER_SCRIPT,
        "--driven_audio", audio,
        "--source_image", image,
        "--result_dir", os.path.dirname(output),
        "--pose_style", "1",
    ]
    subprocess.run(cmd, check=True)
    # SadTalker outputs <audio_name>.mp4 in result_dir; rename/move to output
    generated = os.path.join(os.path.dirname(output), os.path.splitext(os.path.basename(audio))[0] + ".mp4")
    if os.path.exists(generated):
        os.replace(generated, output)


def generate_video(question: str, answer: str) -> str:
    """Generate video for a question, using cache when possible."""
    if question in CACHE and os.path.exists(CACHE[question]):
        return CACHE[question]

    synthesize_audio(answer, AUDIO_PATH)
    run_sadtalker(AUDIO_PATH, VIDEO_PATH)
    CACHE[question] = VIDEO_PATH
    return VIDEO_PATH


def process_request(question: str) -> str:
    """Generate chatbot answer and talking video."""
    answer = chatbot.get_response(question)
    return generate_video(question, answer)


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.route("/ask", methods=["POST"])
def ask():
    question = request.form.get("question", "")
    if not question:
        abort(400, "Missing question")

    video_path = None

    def worker():
        nonlocal video_path
        try:
            video_path = process_request(question)
        except Exception as e:
            print("Error generating video", e)

    thread = threading.Thread(target=worker)
    thread.start()
    thread.join()

    if video_path and os.path.exists(video_path):
        return send_file(video_path, mimetype="video/mp4")
    abort(500, "Failed to generate video")


if __name__ == "__main__":
    # When running locally: FLASK_APP=app.py flask run --reload
    app.run(debug=True)
