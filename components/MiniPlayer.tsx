import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { addFavorite, isFavorite, removeFavorite } from "../lib/storage";
import { usePlayerStore } from "../store/playerStore";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 60, // Above tab bar
    left: 0,
    right: 0,
    backgroundColor: "#1f2937",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#374151",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  artist: {
    color: "#9ca3af",
    fontSize: 12,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlButton: {
    marginLeft: 16,
  },
});

function MiniPlayer() {
  const { currentTrack, isPlaying, playPause, nextTrack } = usePlayerStore();
  const router = useRouter();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (currentTrack) {
      isFavorite(currentTrack).then(setIsFav);
    }
  }, [currentTrack]);

  if (!currentTrack) return null;

  const handleExpand = () => {
    router.push("/player");
  };

  const toggleFav = () => {
    if (!currentTrack) return;
    if (isFav) {
      removeFavorite(currentTrack);
      setIsFav(false);
    } else {
      addFavorite(currentTrack);
      setIsFav(true);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleExpand} style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <Image
          source={{ uri: currentTrack.artworkUrl || "https://via.placeholder.com/100" }}
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {currentTrack.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {currentTrack.artist}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.controls}>
        <TouchableOpacity onPress={toggleFav} style={styles.controlButton}>
          <Ionicons name={isFav ? "heart" : "heart-outline"} size={24} color={isFav ? "red" : "white"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={playPause} style={styles.controlButton}>
          <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={nextTrack} style={styles.controlButton}>
          <Ionicons name="play-skip-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default MiniPlayer;