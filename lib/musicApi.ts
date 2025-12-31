import { Track, Album } from '../types/music';

export const searchMusic = async (query: string): Promise<{ tracks: Track[]; albums: Album[] }> => {
  const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&limit=20`);
  const data = await response.json();

  const tracks: Track[] = data.results
    .filter((item: any) => item.kind === 'song')
    .map((item: any) => ({
      id: item.trackId,
      title: item.trackName,
      artist: item.artistName,
      album: item.collectionName,
      artworkUrl: item.artworkUrl100,
      previewUrl: item.previewUrl,
      duration: item.trackTimeMillis / 1000,
    }));

  const albums: Album[] = data.results
    .filter((item: any) => item.collectionType === 'Album')
    .map((item: any) => ({
      id: item.collectionId,
      title: item.collectionName,
      artist: item.artistName,
      artworkUrl: item.artworkUrl100,
      tracks: [], 
    }));

  return { tracks, albums };
};

export const getAlbum = async (id: number): Promise<Album | null> => {
  // Mock or fetch album details
  return null; // Implement if needed
};