from dataclasses import dataclass
from typing import List
from datetime import timedelta
from flask import Flask, request, send_from_directory, session
from flask_cors import CORS
from .orchestrator import Orchestrator, Process, Product, DisplayableProduct
from .orchestratorFactory import OrchestratorFactory


def processToJson(process: Process):
    return {
        "id": process.id,
        "title": process.title,
        "description": process.description,
        "requires": process.requires,
        "provides": process.provides,
        "state": process.state
    }

def toGraph(o: Orchestrator):
    return {
        "products": [p for p in o.products],
        "processes": [processToJson(p) for p in o.processes]
    }



@dataclass
class AppInfo:
    aoi: List[float]


def webAppFactory(appInfo: AppInfo, pr: OrchestratorFactory) -> Flask:
    

    # @TODO: create a dedicated orchestrator for every session.
    # @TODO: have orchestrator only keep `href`s to data. Client can then download that data separately from the state-graph.


    orchestrator = pr.makeOrchestrator()

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
        return { "info": appInfo }


    # on this route the frontend gets the current steps
    @app.route("/graph", methods=["GET"])
    def graphRoute():
        graph = toGraph(orchestrator)
        return {"graph": graph}


    # on this route the backend listens to frontend-user-input
    @app.route("/actions/<id>", methods=["POST"])
    async def actionRoute(id):
        print("Now handling action: ", id)
        results = await orchestrator.execute(id)
        graph = toGraph(orchestrator)
        return {"graph": graph }

    return app




