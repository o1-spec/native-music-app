import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
  },
  bar: {
    height: 8,
    backgroundColor: '#4b5563',
    borderRadius: 4,
  },
  fill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    color: 'white',
    fontSize: 14,
  },
});

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

function ProgressBar({ currentTime, duration, onSeek }: ProgressBarProps) {
  const progress = useSharedValue(currentTime / duration || 0);
  const barRef = useRef<View>(null);
  const barWidth = useSharedValue(300); // Default, will update

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const handleGesture = (event: any) => {
    'worklet';
    if (event.nativeEvent.state === State.END) {
      const newProgress = event.nativeEvent.x / barWidth.value;
      progress.value = Math.max(0, Math.min(1, newProgress));
      runOnJS(onSeek)(progress.value * duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={handleGesture}>
        <Animated.View
          ref={barRef}
          style={styles.bar}
          onLayout={(event) => {
            barWidth.value = event.nativeEvent.layout.width;
          }}
        >
          <Animated.View style={[styles.fill, animatedStyle]} />
        </Animated.View>
      </PanGestureHandler>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}

export default ProgressBar;