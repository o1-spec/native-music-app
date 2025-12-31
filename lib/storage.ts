import AsyncStorage from '@react-native-async-storage/async-storage';
import { Track } from '../types/music';

export const getItem = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error('Error getting item:', error);
    return null;
  }
};

export const setItem = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error setting item:', error);
  }
};

export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing item:', error);
  }
};

export const getRecentlyPlayed = async (): Promise<Track[]> => {
  const data = await getItem('recentlyPlayed');
  return data ? JSON.parse(data) : [];
};

export const addRecentlyPlayed = async (track: Track): Promise<void> => {
  const recent = await getRecentlyPlayed();
  const filtered = recent.filter(t => t.id !== track.id);
  filtered.unshift(track);
  const limited = filtered.slice(0, 20);
  await setItem('recentlyPlayed', JSON.stringify(limited));
};

export const getRecentSearches = async (): Promise<string[]> => {
  const data = await getItem('recentSearches');
  return data ? JSON.parse(data) : [];
};

export const addRecentSearch = async (query: string): Promise<void> => {
  const recent = await getRecentSearches();
  const filtered = recent.filter(q => q !== query);
  filtered.unshift(query);
  const limited = filtered.slice(0, 10);
  await setItem('recentSearches', JSON.stringify(limited));
};

export const getFavorites = async (): Promise<Track[]> => {
  const data = await getItem('favorites');
  return data ? JSON.parse(data) : [];
};

export const addFavorite = async (track: Track): Promise<void> => {
  const favs = await getFavorites();
  if (!favs.find(t => t.id === track.id)) {
    favs.push(track);
    await setItem('favorites', JSON.stringify(favs));
  }
};

export const removeFavorite = async (track: Track): Promise<void> => {
  const favs = await getFavorites();
  const filtered = favs.filter(t => t.id !== track.id);
  await setItem('favorites', JSON.stringify(filtered));
};

export const isFavorite = async (track: Track): Promise<boolean> => {
  const favs = await getFavorites();
  return favs.some(t => t.id === track.id);
};