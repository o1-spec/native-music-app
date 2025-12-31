import { AlbumCard } from "@/components/AlbumCard";
import { TrackItem } from "@/components/TrackItem";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchMusic } from "../../lib/musicApi";
import { getRecentlyPlayed } from "../../lib/storage";
import { Album, Track } from "../../types/music";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  scrollView: {
    padding: 16,
  },
  greeting: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 12,
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
});

function Home() {
  const [greeting, setGreeting] = useState("Good morning");
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);
  const [popSongs, setPopSongs] = useState<Track[]>([]);
  const [rockSongs, setRockSongs] = useState<Track[]>([]);
  const [hipHopSongs, setHipHopSongs] = useState<Track[]>([]);
  const [jazzSongs, setJazzSongs] = useState<Track[]>([]);
  const [countrySongs, setCountrySongs] = useState<Track[]>([]);
  const [featuredAlbums, setFeaturedAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 18) setGreeting("Good evening");
    else if (hour >= 12) setGreeting("Good afternoon");
    else setGreeting("Good morning");

    const fetchData = async () => {
      try {
        const queries = ["pop", "rock", "hip hop", "jazz", "country"];
        const results = await Promise.all(queries.map(query => searchMusic(query)));
        
        setPopSongs(results[0].tracks.slice(0, 10));
        setRockSongs(results[1].tracks.slice(0, 10));
        setHipHopSongs(results[2].tracks.slice(0, 10));
        setJazzSongs(results[3].tracks.slice(0, 10));
        setCountrySongs(results[4].tracks.slice(0, 10));
        setFeaturedAlbums(results[0].albums.slice(0, 10));
        
        // Load recently played
        const recent = await getRecentlyPlayed();
        setRecentlyPlayed(recent);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderTrack = ({ item }: { item: Track }) => <TrackItem track={item} horizontal={true} />;
  const renderAlbum = ({ item }: { item: Album }) => <AlbumCard album={item} />;

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Animated.Text
          entering={FadeInUp.duration(600)}
          style={styles.greeting}
        >
          {greeting}
        </Animated.Text>

        {/* Recently Played */}
        {recentlyPlayed.length > 0 && (
          <Animated.View entering={FadeInUp.duration(600).delay(200)} style={styles.section}>
            <Text style={styles.sectionTitle}>Recently Played</Text>
            <FlatList
              data={recentlyPlayed}
              renderItem={renderTrack}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </Animated.View>
        )}

        {/* Pop Songs */}
        <Animated.View entering={FadeInUp.duration(600).delay(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>Pop Hits</Text>
          <FlatList
            data={popSongs}
            renderItem={renderTrack}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </Animated.View>

        {/* Rock Songs */}
        <Animated.View entering={FadeInUp.duration(600).delay(600)} style={styles.section}>
          <Text style={styles.sectionTitle}>Rock Classics</Text>
          <FlatList
            data={rockSongs}
            renderItem={renderTrack}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </Animated.View>

        {/* Hip Hop Songs */}
        <Animated.View entering={FadeInUp.duration(600).delay(800)} style={styles.section}>
          <Text style={styles.sectionTitle}>Hip Hop</Text>
          <FlatList
            data={hipHopSongs}
            renderItem={renderTrack}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </Animated.View>

        {/* Jazz Songs */}
        <Animated.View entering={FadeInUp.duration(600).delay(1000)} style={styles.section}>
          <Text style={styles.sectionTitle}>Jazz Vibes</Text>
          <FlatList
            data={jazzSongs}
            renderItem={renderTrack}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </Animated.View>

        {/* Country Songs */}
        <Animated.View entering={FadeInUp.duration(600).delay(1200)} style={styles.section}>
          <Text style={styles.sectionTitle}>Country</Text>
          <FlatList
            data={countrySongs}
            renderItem={renderTrack}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </Animated.View>

        {/* Featured Albums */}
        <Animated.View entering={FadeInUp.duration(600).delay(1400)} style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Albums</Text>
          <FlatList
            data={featuredAlbums}
            renderItem={renderAlbum}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;