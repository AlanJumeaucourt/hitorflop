// ./app/page.js
"use client"; // This is a client component 👈🏽
import React, { useState } from 'react';

import SearchSong from '../components/SearchSong';

const SongSearchPage = () => {

  const [songID, setSongID] = useState(null);

  const handleSearch = (id) => {
    setSongID(id); // Mettre à jour l'ID de la chanson récupéré de l'API
  };

  return (
    <div>
      <h1>Recherche de chansons</h1>
      <SearchSong onSearch={handleSearch} />
      {songID && <p>ID de la chanson : {songID}</p>}
    </div>
  );
};

export default SongSearchPage;
