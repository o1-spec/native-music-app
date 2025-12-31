import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { usePlayerStore } from "../../store/playerStore";
import { Track, Album } from "../../types/music";
import TrackItem from "@/components/TrackItem";

function Playlist() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { setCurrentTrack, setQueue } = usePlayerStore();
  const [album, setAlbum] = useState<Album | null>(null);

  useEffect(() => {
    // Mock fetch album by id - replace with API
    const mockAlbum: Album = {
      id: Number(id),
      title: "Mock Album",
      artist: "Mock Artist",
      artworkUrl: "placeholder.png",
      tracks: [], // Add sample tracks
    };
    setAlbum(mockAlbum);
  }, [id]);

  const handlePlay = () => {
    if (album && album.tracks.length > 0) {
      setQueue(album.tracks);
      setCurrentTrack(album.tracks[0]);
    }
  };

  const handleShuffle = () => {
    if (album && album.tracks.length > 0) {
      const shuffled = [...album.tracks].sort(() => Math.random() - 0.5);
      setQueue(shuffled);
      setCurrentTrack(shuffled[0]);
    }
  };

  const renderTrack = ({ item }: { item: Track }) => (
    <TrackItem track={item} />
  );

  if (!album) return <Text>Loading...</Text>;

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="p-4">
        <Image
          source={{ uri: album.artworkUrl || "placeholder.png" }}
          className="w-full h-64 rounded-lg mb-4"
          resizeMode="cover"
        />
        <Text className="text-white text-2xl font-bold mb-2">{album.title}</Text>
        <Text className="text-gray-400 text-lg mb-4">{album.artist}</Text>
        <View className="flex-row mb-4">
          <TouchableOpacity onPress={handlePlay} className="bg-blue-500 py-2 px-4 rounded mr-4">
            <Text className="text-white">Play</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShuffle} className="bg-gray-600 py-2 px-4 rounded">
            <Text className="text-white">Shuffle</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={album.tracks}
          renderItem={renderTrack}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

export default Playlist;