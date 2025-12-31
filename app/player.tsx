import PlayerControls from '@/components/PlayerControls';
import ProgressBar from '@/components/ProgressBar';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePlayerStore } from '../store/playerStore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  minimizeButton: {
    position: 'absolute',
    top: 50, // Adjust for safe area
    right: 16,
    padding: 8,
  },
  image: {
    width: 320,
    height: 320,
    borderRadius: 12,
    marginBottom: 32,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  artist: {
    color: '#9ca3af',
    fontSize: 18,
    marginBottom: 32,
    textAlign: 'center',
  },
  noTrack: {
    color: 'white',
    fontSize: 18,
  },
});

function Player() {
  const router = useRouter();
  const { currentTrack, isPlaying, currentTime, duration, playPause, nextTrack, previousTrack, setSeekTime } = usePlayerStore();

  const seek = (time: number) => {
    setSeekTime(time);
  };

  if (!currentTrack) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.noTrack}>No track selected</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.minimizeButton}>
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
      <Image
        source={{ uri: currentTrack.artworkUrl || "https://via.placeholder.com/300" }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{currentTrack.title}</Text>
      <Text style={styles.artist}>{currentTrack.artist}</Text>
      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        onSeek={seek}
      />
      <PlayerControls
        isPlaying={isPlaying}
        onPlayPause={playPause}
        onNext={nextTrack}
        onPrevious={previousTrack}
      />
    </SafeAreaView>
  );
}

export default Player;