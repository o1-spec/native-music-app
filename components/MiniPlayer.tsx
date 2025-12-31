import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { usePlayerStore } from "../store/playerStore";

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#1f2937",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  miniPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    color: '#9ca3af',
    fontSize: 14,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    marginHorizontal: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#4b5563',
    borderRadius: 2,
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 2,
  },
});

function MiniPlayer() {
  const { currentTrack, isPlaying, playPause, nextTrack, previousTrack, currentTime, duration } = usePlayerStore();
  const progress = duration > 0 ? currentTime / duration : 0;
  const router = useRouter();
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const snapPoints = ["15%", "90%"]; // Mini and full

  const handleExpand = () => {
    bottomSheetRef.current?.present();
  };

  const handleSheetChange = (index: number) => {
    if (index === 1) {
      router.push("/player"); // Navigate to full player on expand
    }
  };

  if (!currentTrack) return null;

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        backgroundStyle={styles.modal}
      >
        <View style={styles.container}>
          {/* Mini Player View */}
          <TouchableOpacity onPress={handleExpand} style={styles.miniPlayer}>
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
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
              </View>
            </View>
            <View style={styles.controls}>
              <TouchableOpacity onPress={previousTrack} style={styles.controlButton}>
                <Ionicons name="play-skip-back" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={playPause} style={styles.controlButton}>
                <Ionicons name={isPlaying ? "pause" : "play"} size={28} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={nextTrack} style={styles.controlButton}>
                <Ionicons name="play-skip-forward" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          {/* Full Player Placeholder - Expand to player.tsx */}
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

export default MiniPlayer;