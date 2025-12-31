import { TrackItem } from '@/components/TrackItem';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { SectionList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavorites } from '../../hooks/useFavorites';
import { getRecentlyPlayed } from '../../lib/storage';
import { Track } from '../../types/music';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  list: {
    padding: 16,
  },
  header: {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
  },
  viewMore: {
    color: '#3b82f6',
    fontSize: 16,
  },
  item: {
    marginBottom: 8,
  },
  emptyText: {
    color: '#9ca3af',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});

function Library() {
  const router = useRouter();
  const { favorites } = useFavorites();
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);

  useEffect(() => {
    const loadRecentlyPlayed = async () => {
      const data = await getRecentlyPlayed();
      setRecentlyPlayed(data);
    };
    loadRecentlyPlayed();
  }, []);

  const favoritesData = favorites.slice(0, 5);
  const recentData = recentlyPlayed.slice(0, 5);

  const sections = [
    { title: 'Favorites', data: favoritesData, showViewMore: favorites.length > 5, type: 'favorites' },
    { title: 'Recently Played', data: recentData, showViewMore: recentlyPlayed.length > 5, type: 'recent' },
  ];

  const renderItem = ({ item }: { item: Track }) => (
    <Animated.View entering={FadeInUp.duration(600)} style={styles.item}>
      <TrackItem track={item} horizontal={false} />
    </Animated.View>
  );

  const renderSectionHeader = ({ section }: any) => (
    <Animated.View entering={FadeInUp.duration(600)} style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, { color: 'white' }]}>{section.title}</Text>
      {section.showViewMore && (
        <TouchableOpacity onPress={() => router.push(section.type === 'favorites' ? '/favorites' : '/recent')}>
          <Text style={styles.viewMore}>View More</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );

  const renderHeader = () => (
    <Animated.Text entering={FadeInUp.duration(600)} style={styles.header}>
      Library
    </Animated.Text>
  );

  const renderEmpty = () => (
    <Text style={styles.emptyText}>No items in this section</Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

export default Library;