import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavorites } from '../../hooks/useFavorites';
import { Track } from '../../types/music';
import TrackItem from '@/components/TrackItem';

function Library() {
  const { favorites } = useFavorites();

  // Mock recently played - replace with actual data
  const mockRecentlyPlayed: Track[] = [
    // Add sample tracks
  ];

  const renderFavorite = ({ item }: { item: Track }) => (
    <TrackItem track={item} />
  );

  const renderRecentlyPlayed = ({ item }: { item: Track }) => (
    <TrackItem track={item} />
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-900 p-4">
      <Text className="text-white text-2xl font-bold mb-4">Library</Text>

      {/* Favorites */}
      <Text className="text-white text-lg mb-2">Favorites</Text>
      <FlatList
        data={favorites}
        renderItem={renderFavorite}
        keyExtractor={(item) => item.id.toString()}
        className="mb-6"
      />

      {/* Recently Played */}
      <Text className="text-white text-lg mb-2">Recently Played</Text>
      <FlatList
        data={mockRecentlyPlayed}
        renderItem={renderRecentlyPlayed}
        keyExtractor={(item) => item.id.toString()}
        className="mb-6"
      />
    </SafeAreaView>
  );
}

export default Library;