import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { usePlayerStore } from '../store/playerStore';
import { Track } from '../types/music';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHorizontal: {
    width: 200,
    marginRight: 16,
  },
  cardVertical: {
    width: '100%',
    marginBottom: 16,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  artist: {
    color: '#9ca3af',
    fontSize: 14,
  },
  playButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#3b82f6',
    borderRadius: 20,
    padding: 8,
  },
});

interface TrackItemProps {
  track: Track;
  horizontal?: boolean;
  onPress?: () => void;
}

export function TrackItem({ track, horizontal = true, onPress }: TrackItemProps) {
  const { setCurrentTrack, setQueue, playPause } = usePlayerStore();

  const handlePlay = () => {
    setQueue([track]);
    setCurrentTrack(track);
    playPause();
  };

  return (
    <TouchableOpacity
      style={[styles.card, horizontal ? styles.cardHorizontal : styles.cardVertical]}
      onPress={onPress || handlePlay}
    >
      <Image
        source={{ uri: track.artworkUrl || "https://via.placeholder.com/100" }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {track.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {track.artist}
        </Text>
      </View>
      <TouchableOpacity style={styles.playButton} onPress={onPress || handlePlay}>
        <Ionicons name="play" size={16} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}