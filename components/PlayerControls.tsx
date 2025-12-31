import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

function PlayerControls({ isPlaying, onPlayPause, onNext, onPrevious }: PlayerControlsProps) {
  return (
    <View className="flex-row items-center justify-center space-x-8">
      <TouchableOpacity onPress={onPrevious} className="p-4">
        <Text className="text-white text-3xl">⏮️</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPlayPause} className="p-4">
        <Text className="text-white text-4xl">{isPlaying ? "⏸️" : "▶️"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext} className="p-4">
        <Text className="text-white text-3xl">⏯️</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PlayerControls;