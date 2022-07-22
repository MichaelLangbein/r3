from dataclasses import dataclass
from typing import List
from .orchestrator import Process, Product, Orchestrator, UserPara
from .orchestrator import ProcessCallback


@dataclass
class Para:
    id: str
    options: List[str]


def productListFromProcessList(processes: List[Process]) -> List[Product]:
    productIds = set()
    for process in processes:
        for productId in process.requires:
            productIds.add(productId)
        for productId in process.provides:
            productIds.add(productId)
    products: List[Product] = []
    for productId in productIds:
        products.append(Product(
            id=productId,
            data=None
        ))
    return products


class OrchestratorFactory:

    def __init__(self, processes: List[Process] = [], products: List[Product] = []) -> None:
        self.processes = processes
        self.products = products

    def addStep(self, callback: ProcessCallback, id: str, requires: List[str], provides: List[str], title: str, description: str):
        self.processes.append(Process(
            id,
            callback,
            requires,
            provides,
            title,
            description
        ))

    def addProduct(self, id: str, data: object):
        self.products.append(Product(
            id,
            data
        ))

    def addUserPara(self, userParaData: Para):
        self.products.append(UserPara(
            id=userParaData.id,
            label=userParaData.id,
            options=userParaData.options,
            data=None
        ))

    def productHasData(self, id):
        for product in self.products:
            if product.id == id:
                return product.data is not None


    def step(self, id: str, requires: List[str], provides: List[str], userParas: List[Para]= [], title: str = "", description: str = ""):
        """
            Use this as a function annotation to register a function as a process.
        """
        def wrapper(callback: ProcessCallback):
            allRequires = requires + [p.id for p in userParas]
            self.addStep(callback, id, allRequires, provides, title, description)
            for productId in requires:
                if not self.productHasData(productId):
                    self.addProduct(productId, None)
            for data in userParas:
                self.addUserPara(data)
            for productId in provides:
                if not self.productHasData(productId):
                    self.addProduct(productId, None)
        return wrapper

    def makeOrchestrator(self) -> Orchestrator:
        orchestrator = Orchestrator(self.processes, self.products)
        return orchestrator


