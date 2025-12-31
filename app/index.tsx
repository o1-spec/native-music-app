import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

function Welcome() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/home");
  };

  return (
    <View className="flex-1 bg-black justify-center items-center pt-12">
      <View className="p-8 items-center">
        <Animated.View entering={FadeInDown.duration(1000)} className="mb-8">
          <Ionicons name="musical-notes" size={100} color="#3b82f6" />
        </Animated.View>
        <Animated.Text
          entering={FadeInUp.duration(800).delay(200)}
          className="text-4xl font-bold text-center mb-4"
          style={{ color: 'white', marginBottom: 8, textAlign: 'center', fontSize: 28 }}
        >
          Welcome to Music App
        </Animated.Text>
        <Animated.Text
          entering={FadeInUp.duration(800).delay(400)}
          className="text-lg text-center mb-8"
          style={{ color: '#9ca3af', marginBottom: 28, textAlign: 'center', fontSize: 16 }}
        >
          Discover and play your favorite tunes.
        </Animated.Text>
        <Animated.View entering={FadeInUp.duration(800).delay(600)}>
          <TouchableOpacity
            onPress={handleGetStarted}
            className="bg-blue-500 py-4 px-8 rounded-full shadow-lg"
          >
            <Text className="text-white text-lg font-semibold text-center">
              Get Started
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

export default Welcome;