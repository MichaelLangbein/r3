#%% 
from riesgos.backend.orchestrator import addAction, addAppInfo, run



#%%

def action1(data):
    print("Action 1 got the following parameters:")
    print(data)
    return data["para1"] + data["para2"]
    

description1 = {
    "title": "Step 1",
    "description": "A simple step",
    "userParas": [
        { "label": "para1", "options": [1, 2, 3] },
        { "label": "para2", "options": [2, 3, 4] }
    ]
}

addAction("step1", action1, description1)



#%%

def action2(para1, para2):
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
    return data

description2 = {
    "title": "Step 2",
    "description": "Another simple step",
    "dependencies": [
        "step1"
    ],
}

addAction("step2", action2, description2)

#%%

addAppInfo({
    "aoi": [-78, -11, -73, -9]
})

run()


# %%
