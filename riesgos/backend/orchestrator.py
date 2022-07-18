from flask import Flask, request, send_from_directory
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app)

actions = {}
appInfo = {}


# on this route the frontend is hosted
@app.route("/")
def indexRoute():
    return send_from_directory("./fe/dist")
    

# on this route the frontend gets general app-information
@app.route("/info", methods=["GET"])
def infoRoute():
    return appInfo


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
    global actions
    payload = request.json
    action = actions[id]
    result = action["action"](payload)
    return {"data": result }


def addAppInfo(info):
    global appInfo
    appInfo = info

def addAction(id, action, description = None):
    global actions
    description["id"] = id
    actions[id] = {
        "description": description, 
        "action": action
    }


def run():
    app.run(host="localhost", port=5000, debug=True)




