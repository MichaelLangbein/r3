from riesgos.backend.orchestratorFactory import OrchestratorFactory
from riesgos.backend.orchestrator import Product
from riesgos.backend.server import run
from services import EqSvc, Deus


eqSvc = EqSvc()
deusSvc = Deus()
of = OrchestratorFactory()


@of.step(id="eq", title="Earthquake", description="some description", provides=["eqPoints", "eqWms"])
async def runEqSim():
    (points, wms) = eqSvc.exec()
    return [Product(
        id="eqPoints",
        data=points
    ), Product(
        id="eqWms",
        data=wms,
        display="wms"
    )]


@of.step(id="deus", title="EQ-damage", requires=["eqPoints"], userParas=[{"schema": [1, 2, 3]}], provides=["damage"])
async def runDeus(schema, eqPoints):
    damage = deusSvc.exec(schema, eqPoints)
    return [{
        "id": "damage",
        "data": damage,
        "display": "geojson"
    }]



run(of, 5000)

