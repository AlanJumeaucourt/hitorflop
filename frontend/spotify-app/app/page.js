// ./app/page.js
"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from 'react';
import SearchSong from '../components/SearchSong';
import './globals.css';

const SongSearchPage = () => {
  const [songID, setSongID] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (id) => {
    setSongID(id);
  };

  const API_URL = process.env.REACT_APP_API_FQDN
  console.log('API_URL', API_URL);
  useEffect(() => {
    if (songID) {
      setLoading(true);

      fetch(`http://${API_URL}/predict/${songID}`)
        .then((response) => response.json())
        .then((data) => {
          setPrediction(data);
          setLoading(false);
          console.log(data);
        })
        .catch((error) => {
          console.error('Error fetching prediction:', error);
          setLoading(false);
        });
    }
  }, [songID]);

  const renderPredictionResult = () => {
    if (prediction > 0.5) {
      return <p>C'est un HIT</p>;
    } else if (prediction <= 0.5) {
      return <p>C'est un FLOP</p>;
    } else {
      return null;
    }
  };

  return (
    <>
    <div className="song-search-container">
      <h1 className="page-title">Hit or flop ?</h1>
      <p>Le modèle d'IA qui prédit si un son a le potentiel d'un futur hit !</p>
      <br></br>

      <div>
        <SearchSong onSearch={handleSearch} />
      </div>
      <div>
        {loading && <p>Chargement en cours...</p>}
        {prediction && !loading && (
          <div className="prediction-container">
            <h2>Réponse de l'IA de prédiction :</h2>
            {renderPredictionResult()}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default SongSearchPage;
