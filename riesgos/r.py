from riesgos import step, run


eqSvc = Shakyground()
deusSvc = Deus()



@step(id="eq", title="Earthquake", description="some description", provides=["eqPoints", "eqWms"])
def runEqSim():
    (points, wms) = eqSvc.exec()
    return [{
        id: "eqPoints",
        data: points
    }, {
        id: "eqWms",
        data: wms,
        display: "wms"
    }]


@step(id="deus", title="EQ-damage", requires=["eqPoints"], userParas=[{"schema": [1, 2, 3]}], provides=["damage"])
def runDeus(schema, eqPoints):
    damage = deusSvc.exec(schema, eqPoints)
    return [{
        id: "damage",
        data: damage,
        display: "geojson"
    }]



run(5000)







processes = []

def step(**kwargs):
    def wrapper(callback):
        process = {key: val for (key, val) in kwargs}
        process["callback"] = callback
        process["state"] = "incomplete"
        processes.append(kwargs)
    return wrapper


session = Orchestrator(processes)

"""
    Keeps track of products and of processes' states.
"""
class Orchestrator:
    def __init__(self, processes) -> None:
        self.processes = processes
        self.products = []
        self.__updateStates()

    def execute(self, id):
        pass

    def provideData(self, data):
        pass

    def __updateStates(self):
        pass