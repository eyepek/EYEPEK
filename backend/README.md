# EYEPEK Backend (Flask)

Starter REST API for the EYEPEK mobile application.

## Run locally
```bash
cd backend
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

API health check: `http://127.0.0.1:5000/api/health`

The initial version is a public service catalogue demo. Authentication, enquiry storage, and MySQL integration will be added in later steps. Do not add real credentials to this public repository.