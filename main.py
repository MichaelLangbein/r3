from riesgos.backend.processRegistry import ProcessRegistry
from riesgos.backend.server import run



eqSvc = EqSvc()
deusSvc = Deus()
pl = ProcessRegistry()


@pl.step(id="eq", title="Earthquake", description="some description", provides=["eqPoints", "eqWms"])
def runEqSim():
    (points, wms) = eqSvc.exec()
    return [{
        "id": "eqPoints",
        "data": points
    }, {
        "id": "eqWms",
        "data": wms,
        "display": "wms"
    }]


@pl.step(id="deus", title="EQ-damage", requires=["eqPoints"], userParas=[{"schema": [1, 2, 3]}], provides=["damage"])
def runDeus(schema, eqPoints):
    damage = deusSvc.exec(schema, eqPoints)
    return [{
        "id": "damage",
        "data": damage,
        "display": "geojson"
    }]



run(pl, 5000)

