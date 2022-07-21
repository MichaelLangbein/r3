from datetime import timedelta
from flask import Flask, request, send_from_directory, session
from flask_cors import CORS
from riesgos.backend.orchestrator import Orchestrator
from riesgos.backend.orchestratorFactory import OrchestratorFactory


app = Flask(__name__)
app.secret_key = "change me"
app.permanent_session_lifetime = timedelta(hours=5)
cors = CORS(app)



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




def run(pr: OrchestratorFactory, port=5000, debug=True):
    app.run(host="localhost", port=port, debug=debug)




