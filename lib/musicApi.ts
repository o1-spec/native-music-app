import { Album, Track } from '../types/music';

export const searchMusic = async (
  query: string
): Promise<{ tracks: Track[]; albums: Album[] }> => {
  const response = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song,album&limit=20`
  );

  const data = await response.json();

  const tracks: Track[] = data.results
    .filter((item: any) => item.kind === 'song' && item.previewUrl)
    .map((item: any) => ({
      id: item.trackId,
      title: item.trackName,
      artist: item.artistName,
      album: item.collectionName,
      artworkUrl: item.artworkUrl100,
      previewUrl: item.previewUrl,
      duration: item.trackTimeMillis ? item.trackTimeMillis / 1000 : 0,
    }));

  const albums: Album[] = data.results
    .filter(
      (item: any) =>
        item.wrapperType === 'collection' && item.collectionType === 'Album'
    )
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
  try {
    const response = await fetch(
      `https://itunes.apple.com/lookup?id=${id}&entity=song`
    );

    const data = await response.json();

    const collection = data.results.find(
      (item: any) => item.wrapperType === 'collection'
    );

    if (!collection) return null;

    const tracks: Track[] = data.results
      .filter(
        (item: any) =>
          item.wrapperType === 'track' && item.kind === 'song' && item.previewUrl // Added filter for previewUrl
      )
      .map((item: any) => ({
        id: item.trackId,
        title: item.trackName,
        artist: item.artistName,
        album: item.collectionName,
        artworkUrl: item.artworkUrl100,
        previewUrl: item.previewUrl,
        duration: item.trackTimeMillis ? item.trackTimeMillis / 1000 : 0,
      }));

    return {
      id: collection.collectionId,
      title: collection.collectionName,
      artist: collection.artistName,
      artworkUrl: collection.artworkUrl100,
      tracks,
    };
  } catch (error) {
    console.error('Error fetching album:', error);
    return null;
  }
};