import {
  Audio,
  InterruptionModeAndroid,
  InterruptionModeIOS,
} from "expo-av";
import { useEffect, useRef } from "react";
import { usePlayerStore } from "../store/playerStore";

export function useAudioPlayer() {
  const soundRef = useRef<Audio.Sound | null>(null);
  const {
    currentTrack,
    isPlaying,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    nextTrack,
    previousTrack,
  } = usePlayerStore();

  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
    });
  }, []);

  useEffect(() => {
    if (currentTrack) {
      loadTrack(currentTrack);
    }

    return () => {
      soundRef.current?.unloadAsync();
    };
  }, [currentTrack]);

  const loadTrack = async (track: any) => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
    }

    const { sound } = await Audio.Sound.createAsync(
      { uri: track.previewUrl },
      { shouldPlay: false }
    );

    soundRef.current = sound;

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded) {
        setCurrentTime(status.positionMillis || 0);
        if (status.didJustFinish) {
          nextTrack(); // Go to next track when finished
        }
      }
    });

    const status = await sound.getStatusAsync();
    if (status.isLoaded && typeof status.durationMillis === "number") {
      setDuration(status.durationMillis); // Keep in ms
    } else {
      setDuration(0);
    }
    setCurrentTime(0);
  };

  const play = async () => {
    if (!soundRef.current) return;
    await soundRef.current.playAsync();
    setIsPlaying(true);
  };

  const pause = async () => {
    if (!soundRef.current) return;
    await soundRef.current.pauseAsync();
    setIsPlaying(false);
  };

  const seek = async (time: number) => {
    if (!soundRef.current) return;
    await soundRef.current.setPositionAsync(time);
    setCurrentTime(time);
  };

  const playPause = () => {
    isPlaying ? pause() : play();
  };

  return {
    play,
    pause,
    seek,
    playPause,
    handleNext: nextTrack,
    handlePrevious: previousTrack,
  };
}