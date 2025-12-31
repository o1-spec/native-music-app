import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Track, Album } from "../../types/music";
import TrackItem from "@/components/TrackItem";
import AlbumCard from "@/components/AlbumCard";

// Mock data - replace with API calls later
const mockRecentlyPlayed: Track[] = [
  // Add sample tracks
];
const mockFeaturedPlaylists: Album[] = [
  // Add sample albums
];

function Home() {
  const [greeting, setGreeting] = useState("Good morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 18) setGreeting("Good evening");
    else if (hour >= 12) setGreeting("Good afternoon");
    else setGreeting("Good morning");
  }, []);

  const renderRecentlyPlayed = ({ item }: { item: Track }) => (
    <TrackItem track={item} />
  );

  const renderFeaturedPlaylist = ({ item }: { item: Album }) => (
    <AlbumCard album={item} />
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView className="p-4">
        <Text className="text-white text-2xl font-bold mb-4">{greeting}</Text>

        {/* Recently Played */}
        <Text className="text-white text-lg mb-2">Recently Played</Text>
        <FlatList
          data={mockRecentlyPlayed}
          renderItem={renderRecentlyPlayed}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
        />

        {/* Featured Playlists */}
        <Text className="text-white text-lg mb-2">Featured Playlists</Text>
        <FlatList
          data={mockFeaturedPlaylists}
          renderItem={renderFeaturedPlaylist}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;