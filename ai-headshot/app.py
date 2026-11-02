from flask import Flask, redirect, request

app = Flask(__name__)


@app.before_request
def retire_headshot_service():
    if request.method == "GET":
        return redirect("https://www.eyepek.com/", code=302)
    return ("AI Headshot has been discontinued.", 410)
