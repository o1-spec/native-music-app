import { AlbumCard } from "@/components/AlbumCard";
import { TrackItem } from "@/components/TrackItem";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, SectionList, StyleSheet, Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchMusic } from "../../lib/musicApi";
import { getRecentlyPlayed } from "../../lib/storage";
import { Album, Track } from "../../types/music";

type SectionType = {
  title: string;
  data: (Track | Album)[];
  isTrack: boolean;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  list: {
    padding: 16,
  },
  greeting: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  sectionHeader: {
    color: 'white',
    fontSize: 18,
    marginBottom: 12,
    marginTop: 16,
  },
  item: {
    marginBottom: 8,
  },
  albumItem: {
    marginRight: 16,
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

  const sections: SectionType[] = [
    ...(recentlyPlayed.length > 0 ? [{ title: 'Recently Played', data: recentlyPlayed as (Track | Album)[], isTrack: true }] : []),
    { title: 'Pop Hits', data: popSongs as (Track | Album)[], isTrack: true },
    { title: 'Rock Classics', data: rockSongs as (Track | Album)[], isTrack: true },
    { title: 'Hip Hop', data: hipHopSongs as (Track | Album)[], isTrack: true },
    { title: 'Jazz Vibes', data: jazzSongs as (Track | Album)[], isTrack: true },
    { title: 'Country', data: countrySongs as (Track | Album)[], isTrack: true },
    { title: 'Featured Albums', data: featuredAlbums as (Track | Album)[], isTrack: false },
  ];

  const renderItem = ({ item, section }: { item: Track | Album; section: SectionType }) => (
    <Animated.View entering={FadeInUp.duration(600)} style={section.isTrack ? styles.item : styles.albumItem}>
      {section.isTrack ? <TrackItem track={item as Track} horizontal={false} /> : <AlbumCard album={item as Album} />}
    </Animated.View>
  );

  const renderSectionHeader = ({ section: { title } }: { section: SectionType }) => (
    <Animated.Text entering={FadeInUp.duration(600)} style={styles.sectionHeader}>
      {title}
    </Animated.Text>
  );

  const renderHeader = () => (
    <Animated.Text entering={FadeInUp.duration(600)} style={styles.greeting}>
      {greeting}
    </Animated.Text>
  );

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
      <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

export default Home;