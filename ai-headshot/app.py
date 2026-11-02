import os
import base64
import uuid
from pathlib import Path

from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request, send_from_directory
from openai import OpenAI
from werkzeug.utils import secure_filename

load_dotenv()
ROOT = Path(__file__).resolve().parent
OUTPUT_DIR = ROOT / "static" / "generated"
TEMP_DIR = ROOT / "uploads_tmp"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
TEMP_DIR.mkdir(parents=True, exist_ok=True)

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 10 * 1024 * 1024
ALLOWED = {"jpg", "jpeg", "png", "webp"}

STYLES = {
    "corporate": "Dress the person in polished business attire, with a soft neutral studio background and confident approachable expression.",
    "formal": "Create a clean formal business portrait with elegant professional clothing and a bright white studio background.",
    "creative": "Create an approachable creative-professional portrait with smart-casual clothing and a softly blurred modern office background.",
    "executive": "Create a premium executive portrait with sophisticated dark business attire and a refined deep-neutral studio background."
}
BACKGROUNDS = {
    "studio": "Use a soft neutral professional studio background.",
    "white": "Use a clean pure-white seamless background.",
    "office": "Use a softly blurred modern office background."
}

@app.get("/")
def home():
    return render_template("index.html")

@app.post("/generate")
def generate():
    key = os.getenv("OPENAI_API_KEY", "").strip()
    if not key:
        return jsonify(error="AI is not configured. Add your OpenAI API key to the .env file and restart the app."), 503

    photo = request.files.get("photo")
    style = request.form.get("style", "corporate")
    background = request.form.get("background", "studio")
    if not photo or not photo.filename:
        return jsonify(error="Please select a photo."), 400
    if "." not in photo.filename or photo.filename.rsplit(".", 1)[1].lower() not in ALLOWED:
        return jsonify(error="Use a JPG, PNG or WEBP image."), 400
    if style not in STYLES or background not in BACKGROUNDS:
        return jsonify(error="Select a valid style and background."), 400

    ext = secure_filename(photo.filename).rsplit(".", 1)[1].lower()
    source = TEMP_DIR / f"{uuid.uuid4().hex}.{ext}"
    output_name = f"eyepek_{uuid.uuid4().hex}.png"
    output = OUTPUT_DIR / output_name
    try:
        photo.save(source)
        prompt = (
            "Edit this uploaded photograph into a photorealistic professional headshot. "
            "Preserve the same person's identity, facial structure, skin tone, age, hairstyle and recognizable features. "
            "Keep the face natural and realistic; do not beautify excessively or change who the person is. "
            + STYLES[style] + " " + BACKGROUNDS[background] +
            " Use chest-up framing, natural skin texture, realistic studio lighting. "
            "No text, logos, watermarks or extra people."
        )
        client = OpenAI(api_key=key)
        with source.open("rb") as image_file:
            result = client.images.edit(
                model=os.getenv("OPENAI_IMAGE_MODEL", "gpt-image-1"),
                image=image_file,
                prompt=prompt,
                size="1024x1024",
                quality="medium",
                output_format="png"
            )
        output.write_bytes(base64.b64decode(result.data[0].b64_json))
        return jsonify(image_url=f"/static/generated/{output_name}", filename=output_name)
    except Exception:
        app.logger.exception("AI headshot generation failed")
        return jsonify(error="AI generation failed. Check the API key, API billing/limits and try again."), 500
    finally:
        source.unlink(missing_ok=True)

@app.get("/download/<filename>")
def download(filename):
    if not filename.startswith("eyepek_") or not filename.endswith(".png"):
        return "Not found", 404
    return send_from_directory(OUTPUT_DIR, filename, as_attachment=True)

@app.errorhandler(413)
def too_large(_error):
    return jsonify(error="Image is too large. Maximum size is 10 MB."), 413

if __name__ == "__main__":
    app.run(debug=True)
