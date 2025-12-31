import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePlayerStore } from '../store/playerStore';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import ProgressBar from '@/components/ProgressBar';
import PlayerControls from '@/components/PlayerControls';

function Player() {
  const { currentTrack, isPlaying, currentTime, duration } = usePlayerStore();
  const { playPause, seek, handleNext, handlePrevious } = useAudioPlayer();

  if (!currentTrack) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900 justify-center items-center">
        <Text className="text-white text-lg">No track selected</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900 justify-center items-center p-4">
      <Image
        source={{ uri: currentTrack.artworkUrl || "placeholder.png" }}
        className="w-80 h-80 rounded-lg mb-8"
        resizeMode="cover"
      />
      <Text className="text-white text-2xl font-bold mb-2">{currentTrack.title}</Text>
      <Text className="text-gray-400 text-lg mb-8">{currentTrack.artist}</Text>
      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        onSeek={seek}
      />
      <PlayerControls
        isPlaying={isPlaying}
        onPlayPause={playPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </SafeAreaView>
  );
}

export default Player;