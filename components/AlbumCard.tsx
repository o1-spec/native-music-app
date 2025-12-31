import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Album } from '../types/music';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 12,
    marginRight: 16,
    width: 150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  artist: {
    color: '#9ca3af',
    fontSize: 14,
    textAlign: 'center',
  },
});

interface AlbumCardProps {
  album: Album;
}

export function AlbumCard({ album }: AlbumCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/playlist/${album.id}`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: album.artworkUrl }} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>{album.title}</Text>
      <Text style={styles.artist} numberOfLines={1}>{album.artist}</Text>
    </TouchableOpacity>
  );
}