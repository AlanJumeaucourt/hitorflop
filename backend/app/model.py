import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

import tensorflow as tf
import keras
import pandas as pd
import numpy as np

# Remplacez ces valeurs par vos propres identifiants Spotify
client_id = 'ee81f20dfd134f47a82e6be46c36e27b'
client_secret = 'd1fa2ca29e4a4f3e947147f8bb1bc096'

# Initialisez l'authentification client pour l'API Spotify
client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

def get_track_audio_features(track_id):
    audio_features = sp.audio_features(track_id)
    return audio_features[0] if audio_features else None

def format_data_for_model(track_audio_features):
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

    
def hit_or_shit(track_id):
    # Get info from spotify API
    track_audio_features = get_track_audio_features(track_id)

    # Format the data for the model
    data = format_data_for_model(track_audio_features)

    # Affichage des caractéristiques audio de la musique
    df = pd.DataFrame(data, index=[0])


    print("Generate a prediction")
    prediction = model.predict(df)
    print("prediction:", df)
    return str(prediction[0][0])


# Load the already train model
model = keras.models.load_model("/code/app/model.keras")
