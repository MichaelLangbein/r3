from typing import Callable, List

def find(data: List[object], predicate: Callable):
    for entry in data:
        if predicate(entry):
            return entry