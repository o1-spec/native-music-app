import MiniPlayer from "@/components/MiniPlayer";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#000000",
            borderTopColor: "#374151",
            borderTopWidth: 1,
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
          },
          tabBarActiveTintColor: "#3b82f6",
          tabBarInactiveTintColor: "#9ca3af",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
          },
          tabBarItemStyle: {
            paddingVertical: 5,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: "Library",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
      <MiniPlayer /> 
    </>
  );
}