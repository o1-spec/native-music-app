import { TrackItem } from "@/components/TrackItem";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, SectionList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAlbum } from "../../lib/musicApi";
import { usePlayerStore } from "../../store/playerStore";
import { Album, Track } from "../../types/music";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  list: {
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
  topTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 256,
    borderRadius: 8,
    marginBottom: 16,
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
    marginBottom: 16,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shuffleButton: {
    backgroundColor: '#6b7280',
  },
  item: {
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    marginTop: 16,
    fontSize: 16,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
    textAlign: 'center',
  },
});

function Playlist() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { setCurrentTrack, setQueue } = usePlayerStore();
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const data = await getAlbum(Number(id));
        if (data) {
          setAlbum(data);
        } else {
          setError('Album not found');
        }
      } catch (err) {
        setError('Failed to load album');
      } finally {
        setLoading(false);
      }
    };
    fetchAlbum();
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

  const renderItem = ({ item }: { item: Track }) => (
    <Animated.View entering={FadeInUp.duration(600)} style={styles.item}>
      <TrackItem track={item} horizontal={false} />
    </Animated.View>
  );

  const renderHeader = () => (
    <>
      <Animated.View entering={FadeInUp.duration(600)} style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Album</Text>
      </Animated.View>
      <Animated.View entering={FadeInUp.duration(600)} style={styles.headerCard}>
        <Animated.Image
          entering={FadeInDown.duration(800)}
          source={{ uri: album?.artworkUrl || "https://via.placeholder.com/300" }}
          style={styles.image}
          resizeMode="cover"
        />
        <Animated.Text entering={FadeInUp.duration(600).delay(200)} style={styles.title}>
          {album?.title}
        </Animated.Text>
        <Animated.Text entering={FadeInUp.duration(600).delay(300)} style={styles.artist}>
          {album?.artist}
        </Animated.Text>
        <Animated.View entering={FadeInUp.duration(600).delay(400)} style={styles.buttons}>
          <TouchableOpacity onPress={handlePlay} style={styles.button}>
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShuffle} style={[styles.button, styles.shuffleButton]}>
            <Text style={styles.buttonText}>Shuffle</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={styles.loadingText}>Loading album...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!album) return null;

  const sections = [{ title: 'Tracks', data: album.tracks }];

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sections}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

export default Playlist;