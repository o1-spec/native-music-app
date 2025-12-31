import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  button: {
    padding: 16,
    marginHorizontal: 12,
    backgroundColor: '#374151',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  playButton: {
    padding: 20,
    backgroundColor: '#3b82f6',
  },
});

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

function PlayerControls({ isPlaying, onPlayPause, onNext, onPrevious }: PlayerControlsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrevious} style={styles.button}>
        <Ionicons name="play-skip-back" size={28} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPlayPause} style={[styles.button, styles.playButton]}>
        <Ionicons name={isPlaying ? "pause" : "play"} size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext} style={styles.button}>
        <Ionicons name="play-skip-forward" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

export default PlayerControls;