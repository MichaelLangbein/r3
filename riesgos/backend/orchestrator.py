from flask import Flask, request, send_from_directory
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app)

actions = {}


# on this route the frontend is hosted
@app.route("/")
def indexRoute():
    return send_from_directory("./fe/dist")
    

# on this route the frontend gets the current steps
@app.route("/actions", methods=["GET"])
def actionsRoute():
    descriptions = [
        actions[actionId]["description"]
        for actionId in actions.keys()
    ]
    return {"data": descriptions}


# on this route the backend listens to frontend-user-input
@app.route("/actions/<id>", methods=["POST"])
def actionRoute(id):
    args = request.json
    action = actions[id]
    results = action(args)
    return results


def addAction(id, action, description = None):
    actions[id] = {
        "description": description, 
        "action": action
    }


def run():
    app.run(host="localhost", port=5000, debug=True)




