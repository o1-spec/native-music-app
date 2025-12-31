import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { Album } from "../types/music";

interface AlbumCardProps {
  album: Album;
}

function AlbumCard({ album }: AlbumCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/playlist/${album.id}`);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="bg-gray-800 rounded-lg p-4 mr-4 w-40"
    >
      <Image
        source={{ uri: album.artworkUrl || "placeholder.png" }}
        className="w-full h-32 rounded-lg mb-2"
        resizeMode="cover"
      />
      <Text className="text-white text-sm font-semibold" numberOfLines={1}>
        {album.title}
      </Text>
      <Text className="text-gray-400 text-xs" numberOfLines={1}>
        {album.artist}
      </Text>
    </TouchableOpacity>
  );
}

export default AlbumCard;