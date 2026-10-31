from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

SERVICES = [
    {"id": 1, "name": "College Affiliation Support", "category": "College"},
    {"id": 2, "name": "Approval & Compliance Documentation", "category": "College"},
    {"id": 3, "name": "College Documentation", "category": "College"},
    {"id": 4, "name": "Faculty Documentation", "category": "College"},
    {"id": 5, "name": "Admission Guidance", "category": "Student"},
    {"id": 6, "name": "Course Information", "category": "Student"},
    {"id": 7, "name": "Exam & Result Guidance", "category": "Student"},
    {"id": 8, "name": "Career Guidance", "category": "Student"},
    {"id": 9, "name": "Computer Courses", "category": "Computer"},
    {"id": 10, "name": "Programming Training", "category": "Computer"},
    {"id": 11, "name": "Computer Repair", "category": "IT"},
    {"id": 12, "name": "Windows & Software Installation", "category": "IT"},
    {"id": 13, "name": "Networking", "category": "IT"},
    {"id": 14, "name": "Printer Support", "category": "IT"},
    {"id": 15, "name": "CCTV Installation", "category": "IT"},
    {"id": 16, "name": "Server & Remote Support", "category": "IT"},
    {"id": 17, "name": "Annual Maintenance (AMC)", "category": "IT"},
    {"id": 18, "name": "Form Filling Assistance", "category": "Online Support"},
    {"id": 19, "name": "Printing & Scanning", "category": "Online Support"},
    {"id": 20, "name": "Document Assistance", "category": "Online Support"},
    {"id": 21, "name": "YouTube Learning Videos", "category": "Media"},
    {"id": 22, "name": "Education Updates", "category": "Media"},
]


@app.get("/api/health")
def health():
    return jsonify({"status": "ok", "app": "EYEPEK API"})


@app.get("/api/services")
def get_services():
    return jsonify({"services": SERVICES, "count": len(SERVICES)})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
