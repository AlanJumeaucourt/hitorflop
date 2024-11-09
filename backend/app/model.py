import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import os
import tensorflow as tf
from tensorflow import keras
import pandas as pd
import numpy as np
import h5py
import keras

# Remplacez ces valeurs par vos propres identifiants Spotify
client_id = 'ee81f20dfd134f47a82e6be46c36e27b'
client_secret = '8b7c3ec55aed4ee58a225303ad151f14'

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


import os
os.system('ls /code/app')


# Add debugging information before loading the model
model_path = "/code/app/model.keras"
print(f"Current working directory: {os.getcwd()}")
print(f"Model path exists: {os.path.exists(model_path)}")
print(f"Model path is file: {os.path.isfile(model_path)}")
print(f"Model path permissions: {oct(os.stat(model_path).st_mode)[-3:]}")
print(f"Directory contents: {os.listdir('/code/app')}")
print(f"TensorFlow version: {tf.__version__}")
print(f"Keras version: {keras.__version__}")

try:
    print(f"Attempting to load model from absolute path: {model_path}")
    # Try to open the file first to verify it's readable
    with h5py.File(model_path, 'r') as f:
        print("File opened successfully")
        print(f"Keys in file: {list(f.keys())}")
    
    # Now try to load the model
    model = tf.keras.models.load_model(
        model_path,
        custom_objects=None,
        compile=False  # Changed to False to avoid compilation issues
    )
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {str(e)}")
    print("File contents:")
    os.system(f"hexdump -C {model_path} | head -n 5")
    raise
