import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Welcome() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900 justify-center items-center">
      <View className="p-8">
        <Text className="text-white text-4xl font-bold text-center mb-4">
          Welcome to Music App
        </Text>
        <Text className="text-gray-400 text-lg text-center mb-8">
          Discover and play your favorite tunes.
        </Text>
        <TouchableOpacity
          onPress={handleGetStarted}
          className="bg-blue-500 py-4 px-8 rounded-full"
        >
          <Text className="text-white text-lg font-semibold text-center">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Welcome;