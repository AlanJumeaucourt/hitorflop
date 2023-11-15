import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";

const SearchSong = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [showList, setShowList] = useState(false);
  const [selectedTrackName, setSelectedTrackName] = useState("");
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
    fetch(`http://localhost:3001/search/${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.tracks && data.tracks.items) {
          setResult(data.tracks.items);
          setShowList(true); // Show the list when there are search results
        } else {
          setResult([]);
          setShowList(false); // Hide the list when there are no search results
        }
      })
      .catch((error) => {
        console.error("Error during search:", error);
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

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item l={6}>
          <div style={{width: "100%"}}>
          <input
            type="text"
            placeholder="Search for a song..."
            value={query}
            onChange={handleInputChange}
            ref={inputRef}
          />
          {console.log(selectedItem)}
          {showList && (
            <ul>
              {result.map((track, index) => (
                <li
                  key={index}
                  className={selectedItem === track ? "selected" : ""}
                  onClick={() => {
                    setSelectedItem(track);
                    setSelectedTrack(track);
                    setShowList(false); // Hide the list when an item is selected
                  }}
                >
                  {track.name} -{" "}
                  {track.artists.map((artist) => artist.name).join(", ")}
                </li>
              ))}
            </ul>
          )}
          </div>
        </Grid>
        <Grid item l={6}>
          {selectedTrack && (
            <div>
              {/* <img
            style={{
              display: "block",
              margin: "0 auto",
              width: 100,
              paddingTop: 20,
              paddingBottom: 20,
            }}
            src={selectedTrack.album.images["0"].url}
            alt="new"
          />
          {selectedTrack.preview_url && (
            <audio controls="controls">
              <source src={selectedTrack.preview_url} type="audio/mpeg" />
            </audio>
          )} */}
              <div>
                <iframe
                  style={{
                    borderRadius: 12,
                    width: "auto",
                    height: 352,
                    loading: "lazy",
                  }}
                  src={`https://open.spotify.com/embed/track/${selectedTrack.id}?utm_source=generator`}
                ></iframe>
              </div>

              <p>
                Selected Track: <b>{selectedTrack.name}</b>
              </p>
              <p>
                Principal Artist : <b>{selectedTrack.artists["0"].name}</b>
              </p>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchSong;
