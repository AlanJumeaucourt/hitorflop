import React from 'react';

interface SpotifyEmbedProps {
  trackId: string;
}

function SpotifyEmbed({ trackId }: SpotifyEmbedProps) {
  return (
    <div className="aspect-video w-full">
      <iframe
        src={`https://open.spotify.com/embed/track/${trackId}`}
        width="100%"
        height="280"
        frameBorder="0"
        allow="encrypted-media"
        className="rounded-lg"
      />
    </div>
  );
}

export default SpotifyEmbed;