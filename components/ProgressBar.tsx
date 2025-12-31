import React from "react";
import { Text, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

function ProgressBar({ currentTime, duration, onSeek }: ProgressBarProps) {
  const progress = useSharedValue(currentTime / duration || 0);
  const isSeeking = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const handleGesture = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const newProgress = event.nativeEvent.x / 300; 
      progress.value = newProgress;
      runOnJS(onSeek)(newProgress * duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <View className="w-full px-4">
      <PanGestureHandler onGestureEvent={handleGesture}>
        <Animated.View className="h-2 bg-gray-600 rounded-full">
          <Animated.View className="h-2 bg-blue-500 rounded-full" style={animatedStyle} />
        </Animated.View>
      </PanGestureHandler>
      <View className="flex-row justify-between mt-2">
        <Text className="text-white text-sm">{formatTime(currentTime)}</Text>
        <Text className="text-white text-sm">{formatTime(duration)}</Text>
      </View>
    </View>
  );
}

export default ProgressBar;