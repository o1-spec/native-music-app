import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Track } from "../types/music";

const FAVORITES_KEY = "favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Track[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  const saveFavorites = async (newFavorites: Track[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  const addFavorite = (track: Track) => {
    if (!favorites.find(fav => fav.id === track.id)) {
      const newFavorites = [...favorites, track];
      saveFavorites(newFavorites);
    }
  };

  const removeFavorite = (trackId: number) => {
    const newFavorites = favorites.filter(fav => fav.id !== trackId);
    saveFavorites(newFavorites);
  };

  const isFavorite = (trackId: number) => {
    return favorites.some(fav => fav.id === trackId);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}