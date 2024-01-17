import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

import tensorflow as tf
import keras
import pandas as pd
import numpy as np
from typing import Dict, Any

# Remplacez ces valeurs par vos propres identifiants Spotify
client_id = 'ee81f20dfd134f47a82e6be46c36e27b'
client_secret = 'd1fa2ca29e4a4f3e947147f8bb1bc096'

# Initialisez l'authentification client pour l'API Spotify
client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

def fetch_audio_features(track_id: str):
    """
    Fetches the audio features for a given track ID.

    Parameters:
    track_id (str): The ID of the track.

    Returns:
    dict or None: A dictionary containing the audio features of the track, or None if no audio features are available.
    """
    audio_features = sp.audio_features(track_id)
    return audio_features[0] if audio_features else None

def preprocess_data_for_model(track_audio_features: Dict[str, Any]):
    """
    Preprocesses track audio features for the model.

    Args:
        track_audio_features (dict): A dictionary containing track audio features.

    Returns:
        dict: A dictionary containing preprocessed track audio features.
    """
    data = {}
    data["danceability"] = track_audio_features['danceability']
    data["energy"] = track_audio_features['energy']
    data["key"] = track_audio_features['key']
    data["loudness"] = track_audio_features['loudness']
    data["mode"] = track_audio_features['mode']
    data["speechiness"] = track_audio_features['speechiness']
    data["acousticness"] = track_audio_features['acousticness']
    data["instrumentalness"] = track_audio_features['instrumentalness']
    data["liveness"] = track_audio_features['liveness']
    data["valence"] = track_audio_features['valence']
    data["tempo"] = track_audio_features['tempo']
    data["duration_ms"] = track_audio_features['duration_ms']
    data["time_signature"] = track_audio_features['time_signature']

    print(data)

    return data

    
def hit_or_shit(track_id: str):
    """
    Determines whether a given track is a hit or a flop based on its audio features.

    Parameters:
    track_id (str): The ID of the track to be evaluated.

    Returns:
    str: The prediction indicating whether the track is a hit or a flop.
    """
    
    # Get info from spotify API
    track_audio_features = fetch_audio_features(track_id)

    # Format the data for the model
    data = preprocess_data_for_model(track_audio_features)

    # Affichage des caractéristiques audio de la musique
    df = pd.DataFrame(data, index=[0])


    print("Generate a prediction")
    prediction = model.predict(df)
    print("prediction:", df)
    return str(prediction[0][0])


# Load the already train model
model = keras.models.load_model("/code/app/model.keras")
