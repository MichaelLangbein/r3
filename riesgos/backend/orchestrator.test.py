import unittest
from orchestrator import Orchestrator, Product, Process
from orchestratorFactory import OrchestratorFactory



class TestOrchestrator(unittest.IsolatedAsyncioTestCase):

    async def test_execute(self):
        products = [Product(
          id='onions',
          data='onions'
        ), Product(
          id='chopped ingredient',
          data=None
        )]

        async def chopFunction(ingredient):
          return [Product(id='chopped ingredient', data='some chopped ' + ingredient.data)]

        processes = [Process(
          id="chopper",
          requires=['onions'],
          provides=['chopped ingredient'],
          callback=chopFunction
        )]

        orchestrator = Orchestrator(processes, products)
        await orchestrator.execute('chopper')

        choppedIngredient = orchestrator.getProduct('chopped ingredient')
        self.assertIsNotNone(choppedIngredient.data)
        self.assertEqual(choppedIngredient.data, 'some chopped onions')


    async def test_multiple(self):
        of = OrchestratorFactory()
        
        of.addProduct(id='onions', data='onions')
        of.addProduct(id='tomatoes', data='tomatoes')
    
        @of.step(id="chopping onions", requires=["onions"], provides=["chopped onions"])
        async def chopOnionsFunction(ingredient):
          return [Product(id='chopped onions', data='some chopped ' + ingredient.data)]

        @of.step(id="chopping tomatoes", requires=["tomatoes"], provides=["chopped tomatoes"])
        async def chopTomatoesFunction(ingredient):
          return [Product(id='chopped tomatoes', data='some chopped ' + ingredient.data)]

        @of.step(id="cook soup", requires=["chopped onions", "chopped tomatoes"], provides=["soup"])
        async def cookSoup(onions, tomatoes):
            return [Product(id="soup", data=f"soup from {onions.data} and {tomatoes.data}")]
        
        orchestrator = of.makeOrchestrator()

        await orchestrator.execute('chopping onions')
        await orchestrator.execute('chopping tomatoes')
        await orchestrator.execute('cook soup')
        
        soup = orchestrator.getProduct('soup')
        self.assertIsNotNone(soup.data)
        self.assertEqual(soup.data, 'soup from some chopped onions and some chopped tomatoes')


if __name__ == '__main__':
    unittest.main()