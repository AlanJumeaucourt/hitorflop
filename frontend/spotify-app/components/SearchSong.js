import React, { useState, useEffect, useRef } from 'react';

const SearchSong = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showList, setShowList] = useState(false);
    const [selectedTrackName, setSelectedTrackName] = useState('');
    const inputRef = useRef(null);
    
    useEffect(() => {
      if (selectedItem !== null) {
        inputRef.current.blur();
        onSearch(selectedItem.id); // Perform an action with the selected item (e.g., pass the ID)
        setSelectedItem(null); // Reset the selected item
        setShowList(false); // Hide the list
        setSelectedItem(null); // Reset the selected item

      }
    }, [selectedItem, onSearch]);
  
  const handleSearch = (searchQuery) => {
    fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=track`, {
      headers: {
        'Authorization': `Bearer BQAjj9xsYg7Pk3KQMHNGGPdUxzA78sI8hTAIDgaUsfulU7C0YdzJPC0i8b2tqbIupK9_k7fVkdH0sEnqjPrnykNm-YJTGMIRnOLenSuv2Xs2oVcp11s`,
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.tracks && data.tracks.items) {
        setResult(data.tracks.items);
        setShowList(true); // Show the list when there are search results
      } else {
        setResult([]);
        setShowList(false); // Hide the list when there are no search results
      }
    })
    .catch(error => {
      console.error('Error during search:', error);
    });
  };

  const handleInputChange = (e) => {
    const inputQuery = e.target.value;
    setQuery(inputQuery);
    if (inputQuery.length >= 3) {
      handleSearch(inputQuery);
    } else {
      setResult([]);
      setShowList(false); // Hide the list when the input length is less than 3 characters
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (selectedItem === null) {
        setSelectedItem(result[result.length - 1]);
      } else {
        const index = result.indexOf(selectedItem);
        setSelectedItem(result[(index - 1 + result.length) % result.length]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (selectedItem === null) {
        setSelectedItem(result[0]);
      } else {
        const index = result.indexOf(selectedItem);
        setSelectedItem(result[(index + 1) % result.length]);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      setSelectedItem(result.find(item => item === selectedItem));
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a song..."
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      {selectedItem && (
        <div>
          <p>Selected Track: {selectedTrackName}</p>
          <p>Track ID: {selectedItem.id}</p>
        </div>
      )}
      {showList && (
        <ul>
          {result.map((track, index) => (
            <li
              key={index}
              className={selectedItem === track ? 'selected' : ''}
              onClick={() => {
                setSelectedItem(track);
                setSelectedTrackName(track.name);
                setShowList(false); // Hide the list when an item is selected
              }}
            >
              {track.name} - {track.artists.map(artist => artist.name).join(', ')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchSong;
