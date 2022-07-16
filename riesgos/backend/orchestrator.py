from flask import Flask, request, send_from_directory

app = Flask(__name__)

steps = {}


# on this route the frontend is hosted
@app.route("/")
def index():
    return send_from_directory("./fe/dist")
    

# on this route the frontend gets the current steps
@app.route("/actions", methods=["GET"])
def actions():
    return steps


# on this route the backend listens to frontend-user-input
@app.route("/actions/<id>", methods=["POST"])
def action(id):
    args = request.json
    action = steps[id]
    results = action(args)
    return results


def addStep(id, action, description = None):
    steps[id] = {
        "description": description, 
        "action": action
    }


def run():
    app.run(host="localhost", port=5000, debug=True)




