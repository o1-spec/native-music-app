import { TrackItem } from "@/components/TrackItem";
import { searchMusic } from "@/lib/musicApi";
import { Track } from "@/types/music";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  content: {
    padding: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  item: {
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    marginTop: 16,
    fontSize: 16,
  },
  noResults: {
    color: '#9ca3af',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});

function Genre() {
  const { genre } = useLocalSearchParams();
  const router = useRouter();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const data = await searchMusic(genre as string);
        setTracks(data.tracks);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTracks();
  }, [genre]);

  const renderTrack = ({ item }: { item: Track }) => (
    <Animated.View entering={FadeInUp.duration(600)} style={styles.item}>
      <TrackItem track={item} horizontal={false} />
    </Animated.View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={styles.loadingText}>Loading {genre} tracks...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>{genre} Tracks</Text>
        </View>
        <FlatList
          data={tracks}
          renderItem={renderTrack}
          keyExtractor={(item) => item.id.toString()}
        />
        {tracks.length === 0 && (
          <Text style={styles.noResults}>No tracks found for {genre}</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

export default Genre;