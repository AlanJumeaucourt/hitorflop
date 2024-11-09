import React from 'react';
import { Music } from 'lucide-react';
import { Track } from '../types';

interface TrackListProps {
  tracks: Track[];
  onTrackSelect: (track: Track) => void;
  selectedTrack: Track | null;
}

function TrackList({ tracks, onTrackSelect, selectedTrack }: TrackListProps) {
  if (!tracks.length) return null;

  return (
    <div className="bg-gray-800/50 rounded-xl overflow-hidden">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-3">Search Results</h2>
        <div className="space-y-2">
          {tracks.map((track) => (
            <button
              key={track.id}
              onClick={() => onTrackSelect(track)}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                selectedTrack?.id === track.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                {track.albumArt ? (
                  <img
                    src={track.albumArt}
                    alt={track.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-md bg-gray-700 flex items-center justify-center">
                    <Music className="w-5 h-5 text-gray-400" />
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-sm line-clamp-1">{track.name}</h3>
                  <p className="text-xs text-gray-400 line-clamp-1">
                    {track.artist}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrackList;