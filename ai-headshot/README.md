# EYEPEK AI Headshot

A Flask-based public-facing AI headshot starter project with a premium navy, royal-blue and ice-blue interface.

## Features
- Responsive landing page and photo upload
- Corporate, Formal, Creative and Executive styles
- Studio, White and Office background choices
- AI image editing integration
- Preview and download generated portrait

## Run locally (Windows)
1. Install Python 3.10+.
2. Open this `ai-headshot` folder in VS Code.
3. In Terminal run:
   ```bash
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   ```
4. Copy `.env.example` to `.env` and add your own OpenAI API key.
5. Run `python app.py`.
6. Open http://127.0.0.1:5000.

## Important before public launch
This is a starter app, not a production-ready public service. Add authentication or CAPTCHA, per-user/IP rate limits, spending limits and alerts, HTTPS, privacy policy, image retention/deletion controls, monitoring and secure deployment configuration. Never commit the real `.env` file or expose API keys in frontend code. ChatGPT subscriptions and API billing are separate.
