import { useEffect, useState } from "react";
import { searchMusic } from "../lib/musicApi";
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

  return { results, loading };
}