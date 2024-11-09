import React, { useState } from 'react';
import { Search, Disc3, Trophy, Flame, ThumbsDown } from 'lucide-react';
import SearchBar from './components/SearchBar';
import TrackList from './components/TrackList';
import SpotifyEmbed from './components/SpotifyEmbed';
import Prediction from './components/Prediction';
import { Track } from './types';
import { searchTracks, getPrediction } from './api/spotify';

function App() {
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [prediction, setPrediction] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const data = await searchTracks(query);
      setSearchResults(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrackSelect = async (track: Track) => {
    setSelectedTrack(track);
    setPrediction('');
    try {
      const result = await getPrediction(track.id);
      if (result) {
        if (result > 0.5) {
          setPrediction('HIT');
        } else {
          setPrediction('FLOP');
        }
      }
    } catch (error) {
      console.error('Prediction error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 max-w-7xl">
        <header className="text-center mb-6">
          <div className="flex items-center justify-center mb-2">
            <Disc3 className="w-8 h-8 text-purple-400 animate-spin-slow" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            Hit or Flop Predictor
          </h1>
          <p className="text-gray-400 text-sm">
            Discover if your favorite song is destined for greatness
          </p>
        </header>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="space-y-4">
            <TrackList 
              tracks={searchResults} 
              onTrackSelect={handleTrackSelect}
              selectedTrack={selectedTrack}
            />
          </div>

          {selectedTrack && (
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-xl p-4 shadow-xl">
                <SpotifyEmbed trackId={selectedTrack.id} />
                
                <Prediction prediction={prediction}>
                  {prediction === 'HIT' ? (
                    <Trophy className="w-8 h-8 text-yellow-400" />
                  ) : prediction === 'FLOP' ? (
                    <ThumbsDown className="w-8 h-8 text-red-400" />
                  ) : (
                    <Flame className="w-8 h-8 text-purple-400 animate-pulse" />
                  )}
                </Prediction>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;