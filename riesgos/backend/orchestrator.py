from concurrent.futures import ProcessPoolExecutor
from dataclasses import dataclass
from enum import Enum
from typing import List, Callable, Awaitable



@dataclass
class Product:
    id: str
    data: object


class State(Enum):
    INCOMPLETE = "incomplete"
    READY = "ready"
    RUNNING = "running"
    COMPLETE = "complete"
    ERROR = "error"


ProcessCallback = Callable[[List[Product]], Awaitable[List[Product]]]

@dataclass
class Process:
    id: str
    callback: ProcessCallback
    requires: List[str]
    provides: List[str]
    title: str = ""
    description: str = ""
    state: State = State.INCOMPLETE




"""
    Keeps track of products and of processes' states.
"""
class Orchestrator:
    def __init__(self, processes: List[Process] = [], products: List[Product] = []):
        self.processes = processes
        self.products = products

    async def execute(self, id: str) -> List[Product]:
        process = self.getProcess(id)
        inputs = self.getInputs(process)
        outputs = await process.callback(*inputs)
        for output in outputs:
            self.setProduct(output)
        return outputs
        
    def getProcess(self, id: str) -> Process:
        for process in self.processes:
            if process.id == id:
                return process

    def getInputs(self, process: Process) -> List[Product]:
        inputs = []
        for inputId in process.requires:
            input = self.getProduct(inputId)
            inputs.append(input)
        return inputs

    def getOutputs(self, process: Process) -> List[Product]:
        outputs = []
        for outputId in process.provides:
            output = self.getProduct(outputId)
            outputs.append(output)
        return outputs

    def getProduct(self, id: str) -> Product:
        for product in self.products:
            if product.id == id:
                return product

    def setProduct(self, product: Product) -> None:
        for p in self.products:
            if p.id == product.id:
                p.data = product.data




