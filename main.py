from riesgos.backend.orchestratorFactory import OrchestratorFactory
from riesgos.backend.orchestrator import DisplayableProduct, Product
from riesgos.backend.server import webAppFactory, AppInfo
from services import EqSvc, Deus


eqSvc = EqSvc()
deusSvc = Deus()
of = OrchestratorFactory()


@of.step(id="eq", title="Earthquake", description="some description", requires=[], provides=["eqPoints", "eqWms"])
async def runEqSim():
    (i, points) = await eqSvc.exec()
    return [Product(
        id="intensity",
        data=i
    ), DisplayableProduct(
        id="eqPoints",
        data=points,
        display="geojson"
    )]


@of.step(id="deus", title="EQ-damage", requires=["intensity"], provides=["damage"])
async def runDeus(intensity):
    damage = await deusSvc.exec(intensity)
    return [DisplayableProduct(
        id = "damage",
        data = damage,
        display = "geojson"
    )]


appInfo = AppInfo(aoi=[-78, -11, -73, -9])
app = webAppFactory(appInfo, of)
app.run(port=5000, debug=True)

