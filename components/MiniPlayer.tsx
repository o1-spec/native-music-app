import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { usePlayerStore } from "../store/playerStore"; // Assuming Zustand store

function MiniPlayer() {
  const { currentTrack, isPlaying, playPause } = usePlayerStore();
  const router = useRouter();
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const snapPoints = ["10%", "90%"]; // Mini and full

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
        backgroundStyle={{ backgroundColor: "#1f2937" }}
      >
        <View className="flex-1 p-4">
          {/* Mini Player View */}
          <TouchableOpacity onPress={handleExpand} className="flex-row items-center">
            <Image
              source={{ uri: currentTrack.artworkUrl || "placeholder.png" }}
              className="w-12 h-12 rounded mr-4"
            />
            <View className="flex-1">
              <Text className="text-white text-sm font-semibold" numberOfLines={1}>
                {currentTrack.title}
              </Text>
              <Text className="text-gray-400 text-xs" numberOfLines={1}>
                {currentTrack.artist}
              </Text>
            </View>
            <TouchableOpacity onPress={playPause} className="ml-4">
              <Text className="text-white text-2xl">
                {isPlaying ? "⏸️" : "▶️"}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
          {/* Full Player Placeholder - Expand to player.tsx */}
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

export default MiniPlayer;