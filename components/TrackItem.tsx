import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Track } from "../types/music"; 

interface TrackItemProps {
  track: Track;
  onPress?: () => void;
}

function TrackItem({ track, onPress }: TrackItemProps) {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center p-4 bg-gray-800 rounded-lg mb-2">
      <Image
        source={{ uri: track.artworkUrl || "placeholder.png" }}
        className="w-12 h-12 rounded mr-4"
      />
      <View className="flex-1">
        <Text className="text-white text-sm font-semibold" numberOfLines={1}>
          {track.title}
        </Text>
        <Text className="text-gray-400 text-xs" numberOfLines={1}>
          {track.artist}
        </Text>
      </View>
      <TouchableOpacity className="ml-4">
        <Text className="text-white text-lg">▶️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default TrackItem;