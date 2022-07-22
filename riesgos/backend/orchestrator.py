from concurrent.futures import ProcessPoolExecutor
from dataclasses import dataclass
from enum import Enum
from typing import List, Callable, Awaitable, Optional



@dataclass
class Product:
    """ Some data that may be produced by a `process` and consumed by another `process` """
    id: str
    data: object


@dataclass
class UserPara(Product):
    """ Some data that is not provided from an upstream process, but through a user-selection """
    label: Optional[str]
    options: List[object]


@dataclass
class DisplayableProduct(Product):
    """
        A special type of product that has a graphical representation.
        Attributes:
        - `display`: A string that tells the frontend how to display this data. The concrete implementation is left to the frontend.
    """
    display: str


class State(str, Enum):
    INCOMPLETE = "incomplete"
    READY = "ready"
    RUNNING = "running"
    COMPLETE = "completed"
    ERROR = "error"


ProcessCallback = Callable[[List[Product]], Awaitable[List[Product]]]

@dataclass
class Process:
    """
        Something that, given a list of `Product`s, can be executed and then return more `Product`s.
    """
    id: str
    callback: ProcessCallback
    requires: List[str]
    provides: List[str]
    title: str = ""
    description: str = ""
    state: State = State.INCOMPLETE




class Orchestrator:
    """
        Keeps track of products and of processes' states.
    """
    
    def __init__(self, processes: List[Process] = [], products: List[Product] = []):
        self.processes = processes
        self.products = products
        self.calculateStates()

    def calculateStates(self):
        for process in self.processes:
            requirementsMet = self.allInputsPresent(process)
            if requirementsMet and process.state == State.INCOMPLETE:
                process.state = State.READY


    async def execute(self, id: str) -> List[Product]:
        process = self.getProcess(id)
        inputs = self.getInputs(process)
        process.state = State.RUNNING
        outputs = await process.callback(inputs)
        process.state = State.COMPLETE
        for output in outputs:
            self.setProduct(output)
        self.calculateStates()
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

    def allInputsPresent(self, process: Process, ignoreUserParas = True) -> bool:
        inputs = self.getInputs(process)
        for input in inputs:
            if isinstance(input, UserPara) and ignoreUserParas:
                continue
            if not input.data:
                return False
        return True

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
        for i, p in enumerate(self.products):
            if p.id == product.id:
                self.products[i] = product
    
    def setProductData(self, id: str, data) -> None:
        for p in self.products:
            if p.id == id:
                p.data = data




