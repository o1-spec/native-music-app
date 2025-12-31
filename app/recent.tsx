import { TrackItem } from '@/components/TrackItem';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getRecentlyPlayed } from '../lib/storage';
import { Track } from '../types/music';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    padding: 16,
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

function Recent() {
  const router = useRouter();
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);

  useEffect(() => {
    const loadRecentlyPlayed = async () => {
      const data = await getRecentlyPlayed();
      setRecentlyPlayed(data);
    };
    loadRecentlyPlayed();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <Animated.View entering={FadeInUp.duration(600)} style={styles.item}>
      <TrackItem track={item} horizontal={false} />
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Recently Played</Text>
      </View>
      <FlatList
        data={recentlyPlayed}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>No recently played tracks</Text>}
      />
    </SafeAreaView>
  );
}

export default Recent;