#%% 
from riesgos.backend.orchestrator import addAction, run



#%%

def action1():
    data = {
        "type": "GeoJSON",
        "features": [{
            "id": 1,
            "type": 'Point',
            "coordinates": [14, 52]
        }, {
            "id": 2,
            "type": 'Point',
            "coordinates": [15, 53]
        }]
    }
    return {
        "data": data
    }

description1 = {
    "title": "Step 1",
    "description": "A simple step"
}

addAction("step1", action1, description1)



#%%

def action2(para1, para2):
    print(para1, para2)
    return {
        "data": [para1, para2]
    }

description2 = {
    "title": "Step 2",
    "description": "Another simple step",
    "userParas": [
        { "select": [1, 2, 3] },
        { "select": [2, 3, 4] }
    ]
}

addAction("step2", action2, description2)

#%%

run()


# %%
