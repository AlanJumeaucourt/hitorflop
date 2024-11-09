import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_FQDN || 'https://api.hitorflop.myfunnycluster.dynamic-dns.net';

export const searchTracks = async (query: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/${query}`);
    const tracks = response.data.tracks.items
      .slice(0, 5)
      .map((item: any) => ({
        id: item.id,
        name: item.name,
        artist: item.artists.map((artist: any) => artist.name).join(', '),
        albumArt: item.album.images[0]?.url
      }));
    return tracks;
  } catch (error) {
    console.error('Error searching tracks:', error);
    throw error;
  }
};

export const getPrediction = async (trackId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/predict/${trackId}`);
    console.log('Prediction value:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting prediction:', error);
    throw error;
  }
}; 