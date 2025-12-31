import { AlbumCard } from "@/components/AlbumCard";
import SearchInput from "@/components/SearchInput";
import { TrackItem } from "@/components/TrackItem";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMusicSearch } from "../../hooks/useMusicSearch";
import { addRecentSearch, getRecentSearches } from "../../lib/storage";
import { Album, Track } from "../../types/music";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    marginBottom: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    marginTop: 16,
    fontSize: 16,
  },
  noResults: {
    color: "#9ca3af",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
  recentItem: {
    color: "white",
    fontSize: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
  },
});

function Search() {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { results, loading } = useMusicSearch(query);

  useEffect(() => {
    const loadRecent = async () => {
      const data = await getRecentSearches();
      setRecentSearches(data);
    };
    loadRecent();
  }, []);

  const handleSearch = (q: string) => {
    setQuery(q);
    if (q.trim()) {
      addRecentSearch(q.trim());
      setRecentSearches((prev) =>
        [q.trim(), ...prev.filter((s) => s !== q.trim())].slice(0, 10)
      );
    }
  };

  const handleRecentPress = (search: string) => {
    setQuery(search);
  };

  const renderTrack = ({ item }: { item: Track }) => (
    <TrackItem track={item} horizontal={false} />
  );
  const renderAlbum = ({ item }: { item: Album }) => <AlbumCard album={item} />;
  const renderRecent = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => handleRecentPress(item)}>
      <Text style={styles.recentItem}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchInput onSearch={handleSearch} />
      <View style={styles.content}>
        {query === "" ? (
          <Animated.View
            entering={FadeInUp.duration(600)}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <FlatList
              data={recentSearches}
              renderItem={renderRecent}
              keyExtractor={(item, index) => index.toString()}
            />
          </Animated.View>
        ) : loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        ) : (
          <>
            {/* Tracks */}
            {results.tracks.length > 0 && (
              <Animated.View
                entering={FadeInUp.duration(600).delay(200)}
                style={styles.section}
              >
                <Text style={styles.sectionTitle}>Songs</Text>
                <FlatList
                  data={results.tracks}
                  renderItem={renderTrack}
                  keyExtractor={(item) => item.id.toString()}
                />
              </Animated.View>
            )}

            {/* Albums */}
            {results.albums.length > 0 && (
              <Animated.View
                entering={FadeInUp.duration(600).delay(400)}
                style={styles.section}
              >
                <Text style={styles.sectionTitle}>Albums</Text>
                <FlatList
                  data={results.albums}
                  renderItem={renderAlbum}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </Animated.View>
            )}

            {results.tracks.length === 0 && results.albums.length === 0 && (
              <Text style={styles.noResults}>
                No results found for "{query}"
              </Text>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

export default Search;
