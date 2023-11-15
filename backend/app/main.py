from .model import hit_or_shit

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/predict/{track_id}")
async def read_item(track_id):
    print(track_id)
    return hit_or_shit(track_id)