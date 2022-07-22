from riesgos.backend.orchestratorFactory import OrchestratorFactory, Para
from riesgos.backend.orchestrator import DisplayableProduct, Product
from riesgos.backend.server import webAppFactory, AppInfo
from riesgos.backend.utils import find
from services import EqSvc, Deus


eqSvc = EqSvc()
deusSvc = Deus()
of = OrchestratorFactory()


@of.step(id="eq", title="Earthquake", description="some description", requires=[], provides=["intensity", "eqPoints"])
async def runEqSim(paras):
    (i, points) = await eqSvc.exec()
    return [Product(
        id="intensity",
        data=i
    ), DisplayableProduct(
        id="eqPoints",
        data=points,
        display="geojson"
    )]


@of.step(id="deus", title="EQ-damage", description="another description", requires=["intensity"], userParas=[Para(id="exposure", options=["1", "2", "3"])], provides=["damage"])
async def runDeus(paras):
    exposure = find(paras, lambda para: para.id == 'exposure').data
    intensity = find(paras, lambda para: para.id == 'intensity').data
    damage = await deusSvc.exec(intensity)
    return [DisplayableProduct(
        id = "damage",
        data = damage,
        display = "geojson"
    )]


appInfo = AppInfo(aoi=[-78, -11, -73, -9])
app = webAppFactory(appInfo, of)
app.run(port=5000, debug=True)

