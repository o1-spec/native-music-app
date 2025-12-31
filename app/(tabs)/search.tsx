import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMusicSearch } from "../../hooks/useMusicSearch";
import { Track, Album } from "../../types/music";
import TrackItem from "@/components/TrackItem";
import AlbumCard from "@/components/AlbumCard";
import SearchInput from "@/components/SearchInput";

function Search() {
  const [query, setQuery] = useState("");
  const { results, loading } = useMusicSearch(query);

  const handleSearch = (q: string) => {
    setQuery(q);
  };

  const renderTrack = ({ item }: { item: Track }) => (
    <TrackItem track={item} />
  );

  const renderAlbum = ({ item }: { item: Album }) => (
    <AlbumCard album={item} />
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <SearchInput onSearch={handleSearch} />
      <View className="p-4">
        {loading ? (
          <Text className="text-white">Loading...</Text>
        ) : (
          <>
            {/* Tracks */}
            {results.tracks.length > 0 && (
              <>
                <Text className="text-white text-lg mb-2">Songs</Text>
                <FlatList
                  data={results.tracks}
                  renderItem={renderTrack}
                  keyExtractor={(item) => item.id.toString()}
                  className="mb-6"
                />
              </>
            )}

            {/* Albums */}
            {results.albums.length > 0 && (
              <>
                <Text className="text-white text-lg mb-2">Albums</Text>
                <FlatList
                  data={results.albums}
                  renderItem={renderAlbum}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-6"
                />
              </>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

export default Search;