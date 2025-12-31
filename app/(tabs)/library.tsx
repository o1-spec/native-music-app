import { TrackItem } from '@/components/TrackItem';
import React, { useEffect, useState } from 'react';
import { SectionList, StyleSheet, Text } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavorites } from '../../hooks/useFavorites';
import { getRecentlyPlayed } from '../../lib/storage';
import { Track } from '../../types/music';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827', // Solid background
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
  const { favorites } = useFavorites();
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);

  useEffect(() => {
    const loadRecentlyPlayed = async () => {
      const data = await getRecentlyPlayed();
      setRecentlyPlayed(data);
    };
    loadRecentlyPlayed();
  }, []);

  const sections = [
    { title: 'Favorites', data: favorites },
    { title: 'Recently Played', data: recentlyPlayed },
  ];

  const renderItem = ({ item }: { item: Track }) => (
    <Animated.View entering={FadeInUp.duration(600)} style={styles.item}>
      <TrackItem track={item} />
    </Animated.View>
  );

  const renderSectionHeader = ({ section: { title } }: any) => (
    <Animated.Text entering={FadeInUp.duration(600)} style={styles.sectionHeader}>
      {title}
    </Animated.Text>
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