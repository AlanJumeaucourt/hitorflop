// ./app/page.js
"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from 'react';
import SearchSong from '../components/SearchSong';
import './globals.css'


const SongSearchPage = () => {
  const [songID, setSongID] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false); // Nouvel état pour le chargement

  const handleSearch = (id) => {
    setSongID(id);
  };

  useEffect(() => {
    if (songID) {
      setLoading(true); // Démarre l'indicateur de chargement

      fetch(`http://localhost:3001/predict/${songID}`)
        .then((response) => response.json())
        .then((data) => {
          setPrediction(data);
          setLoading(false); // Arrête l'indicateur de chargement
          console.log(data);
        })
        .catch((error) => {
          console.error('Error fetching prediction:', error);
          setLoading(false); // Arrête l'indicateur de chargement en cas d'erreur
        });
    }
  }, [songID]);

  const renderPredictionResult = () => {
    if (prediction > 0.5) {
      return <p>C'est un HIT</p>;
    } else if (prediction <= 0.5) {
      return <p>C'est un FLOP</p>;
    } else {
      return null; // Handle other cases as needed
    }
  };

  return (
    <div className="song-search-container"> {/* Ajout d'une classe pour le conteneur principal */}
      <h1 className="page-title">Recherche de chansons</h1> {/* Classe pour le titre */}
      <div className="search-container"> {/* Classe pour le conteneur de recherche */}
        <SearchSong onSearch={handleSearch} />
        {songID && <p>ID de la chanson : {songID}</p>}
        {loading && <p>Chargement en cours...</p>}
        {prediction && !loading && (
          <div className="prediction-container"> {/* Classe pour le conteneur de prédiction */}
            <h2>Réponse de l'IA de prédiction :</h2>
            {renderPredictionResult()}
          </div>
        )}
      </div>
    </div>
  );
};


export default SongSearchPage;
