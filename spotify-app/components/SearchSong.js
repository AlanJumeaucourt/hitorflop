"use client"; // This is a client component 👈🏽
import React, { useState } from 'react';

const SearchSong = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);
  
    const handleSearch = () => {
      fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
        headers: {
          'Authorization': `Bearer `,
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data && data.tracks && data.tracks.items) {
          // Extraction des informations nécessaires pour chaque piste
          const tracks = data.tracks.items.map(item => ({
            name: item.name,
            album: item.album.name,
            artists: item.artists.map(artist => artist.name).join(', '), // Concaténation des noms des artistes
          }));
          setResult(tracks);
        } else {
          setResult([]); // Réinitialiser le résultat si aucune donnée n'a été trouvée
        }
      })
      .catch(error => {
        console.error('Erreur lors de la recherche :', error);
      });
    };
  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher une chanson..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Rechercher</button>
      <br></br>
      {result.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nom de la musique</th>
              <th>Album</th>
              <th>Artiste(s)</th>
            </tr>
          </thead>
          <tbody>
            {result.map((track, index) => (
              <tr key={index}>
                <td>{track.name}</td>
                <td>{track.album}</td>
                <td>{track.artists}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun résultat trouvé</p>
      )}
    </div>
  );
};

export default SearchSong;

