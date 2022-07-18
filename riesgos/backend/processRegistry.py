
class ProcessRegistry:
    """
        Just an object that contains a list of processes to be passed to an orchestrator.
        Contains helper functions `addStep` and `@pr.step`
    """

    def __init__(self, processes = []) -> None:
        self.processes = processes

    def addStep(self, callback, id, requires, userParas, provides, title, description):
        self.processes.append({
            "id": id,
            "callback": callback,
            "requires": requires,
            "provides": provides,
            "userParas": userParas,
            "title": title,
            "description": description
        })

    def step(self, **kwargs):
        """
            Use this as a function annotation to register a function as a process.
        """
        def wrapper(callback):
            self.addStep(
                callback,
                kwargs["id"],
                kwargs["requires"],
                kwargs["userParas"],
                kwargs["provides"],
                kwargs["title"],
                kwargs["description"]
            )
        return wrapper

