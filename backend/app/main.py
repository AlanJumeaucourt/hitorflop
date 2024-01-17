from .model import hit_or_shit

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import requests
from fastapi import HTTPException
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    """
    This function returns a dictionary with a greeting message.
    """
    return {"Hello": "World"}


@app.get("/predict/{track_id}")
async def read_item(track_id: str):
    """
    Read an item with the given track_id.

    Parameters:
    - track_id (str): The ID of the track to read.

    Returns:
    - str: The result of the hit_or_shit function.
    """
    print(track_id)
    return hit_or_shit(track_id)

# Remplacez ces valeurs par vos propres identifiants Spotify
client_id = 'ee81f20dfd134f47a82e6be46c36e27b'
client_secret = 'd1fa2ca29e4a4f3e947147f8bb1bc096'

client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

@app.get("/search/{query}")
async def search_tracks(query: str):
    """
    Search for tracks using the Spotify API.

    Args:
        query (str): The search query.

    Returns:
        dict: The search results.
    """
    results = sp.search(q=query, type='track')
    print(results)
    return results
