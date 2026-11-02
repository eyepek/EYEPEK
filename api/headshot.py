import base64
import os
from io import BytesIO

from flask import Flask, jsonify, request
from openai import OpenAI

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 4 * 1024 * 1024

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp"}
STYLES = {
    "corporate": "polished business attire, confident approachable expression",
    "formal": "clean formal business portrait with elegant professional clothing",
    "creative": "approachable creative-professional portrait with smart-casual clothing",
    "executive": "premium executive portrait with sophisticated dark business attire",
}
BACKGROUNDS = {
    "studio": "soft neutral professional studio background",
    "white": "clean pure-white seamless background",
    "office": "softly blurred modern office background",
}


@app.get("/api/headshot")
def health():
    return jsonify(
        status="ready",
        service="EYEPEK AI Headshot",
        openai_configured=bool(os.getenv("OPENAI_API_KEY", "").strip()),
    )


@app.post("/api/headshot")
def generate_headshot():
    api_key = os.getenv("OPENAI_API_KEY", "").strip()
    if not api_key:
        return jsonify(error="AI Headshot is not configured yet. The website owner must add OPENAI_API_KEY in Vercel Environment Variables."), 503

    photo = request.files.get("photo")
    style = request.form.get("style", "corporate")
    background = request.form.get("background", "studio")

    if photo is None or not photo.filename:
        return jsonify(error="Please select a photo first."), 400
    if photo.mimetype not in ALLOWED_TYPES:
        return jsonify(error="Please upload a JPG, PNG or WEBP image."), 400
    if style not in STYLES or background not in BACKGROUNDS:
        return jsonify(error="Please select a valid style and background."), 400

    image_bytes = photo.read()
    if not image_bytes:
        return jsonify(error="The selected image is empty. Please choose another photo."), 400
    if len(image_bytes) > 4 * 1024 * 1024:
        return jsonify(error="Please use an image smaller than 4 MB."), 413

    prompt = (
        "Edit this uploaded photograph into a photorealistic professional headshot. "
        "Preserve the same person's identity, facial structure, skin tone, age, hairstyle "
        "and recognizable features. Keep the face natural and realistic; do not change "
        "who the person is. Create " + STYLES[style] + " with a " + BACKGROUNDS[background] +
        ". Use chest-up framing, natural skin texture and realistic studio lighting. "
        "No text, logos, watermarks or extra people."
    )

    try:
        client = OpenAI(api_key=api_key)
        result = client.images.edit(
            model=os.getenv("OPENAI_IMAGE_MODEL", "gpt-image-1"),
            image=(photo.filename, image_bytes, photo.mimetype),
            prompt=prompt,
            size="1024x1024",
            quality="medium",
            output_format="png",
        )
        encoded = result.data[0].b64_json
        if not encoded:
            return jsonify(error="The image service returned no image. Please try again."), 502
        return jsonify(image_data_url="data:image/png;base64," + encoded)
    except Exception:
        app.logger.exception("EYEPEK AI Headshot generation failed")
        return jsonify(error="Image generation failed. Please check the OpenAI API key, account billing and usage limits, then try again."), 502


@app.errorhandler(413)
def file_too_large(_error):
    return jsonify(error="Please use an image smaller than 4 MB."), 413
