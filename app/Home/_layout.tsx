import CustomDrawer from "@/components/CustomDrawer";
import type { RootState } from '@/store';
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from 'react';
import { useSelector } from 'react-redux';

export default function HomeLayout() {
  const accent = useSelector((s: RootState) => s.theme.accent) || '#1DB954';
  const mode = useSelector((s: RootState) => s.theme.mode);
  const tabBg = mode === 'light' ? '#FFFFFF' : '#000000';
  return (
    <CustomDrawer>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: accent,
          tabBarInactiveTintColor: "#b0b0b0",
          tabBarStyle: {
            backgroundColor: tabBg,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            height: 100,
            paddingBottom: 35,
            borderTopWidth: 0,
            shadowColor: "#1DB954",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.18,
            shadowRadius: 12,
            elevation: 12,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
            marginBottom: 6,
            letterSpacing: 1,
          },
          tabBarIconStyle: {
            marginTop: 6,
          },
          animation: 'shift',
          animationDuration: 200,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Welcome",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="play" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Search",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="compass" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="ComponentShowcase"
          options={{
            title: "Featured",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="filter" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="HomePage"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="PlaylistBuilder"
          options={{
            title: "Create",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Playlists"
          options={{
            title: "Library",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="library" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </CustomDrawer>
  );
}