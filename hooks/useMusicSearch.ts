import { useEffect, useState } from "react";
import { Album, Track } from "../types/music";

export function useMusicSearch(query: string) {
  const [results, setResults] = useState<{ tracks: Track[]; albums: Album[] }>({ tracks: [], albums: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      setLoading(true);
      searchMusic(query).then(setResults).finally(() => setLoading(false));
    } else {
      setResults({ tracks: [], albums: [] });
    }
  }, [query]);

  const searchMusic = async (q: string) => {
    // Using iTunes Search API
    const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(q)}&limit=20`);
    const data = await response.json();

    const tracks: Track[] = data.results
      .filter((item: any) => item.kind === "song")
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
      .filter((item: any) => item.collectionType === "Album")
      .map((item: any) => ({
        id: item.collectionId,
        title: item.collectionName,
        artist: item.artistName,
        artworkUrl: item.artworkUrl100,
        tracks: [], // Can fetch later if needed
      }));

    return { tracks, albums };
  };

  return { results, loading };
}