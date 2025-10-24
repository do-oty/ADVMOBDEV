import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ThemedView style={styles.container}>
    <ScrollView 
      style={styles.scroll}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#1DB954"
          colors={["#1DB954"]}
        />
      }
    >
      {/* Header Section */}
      <ThemedView style={styles.headerSection}>
        <ThemedText tone="accent" style={styles.welcomeText}>Good morning</ThemedText>
        <ThemedText style={styles.mainTitle}>Your Music</ThemedText>
        <ThemedText tone="muted" style={styles.subtitle}>Continue where you left off</ThemedText>
      </ThemedView>

      {/* Recently Played */}
      <View style={styles.recentSection}>
        <ThemedText style={styles.sectionTitle}>Recently Played</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <View style={styles.recentItem}>
            <Image
              source={require("../../Image/mbdtf.jpg")}
              style={styles.recentImage}
            />
            <ThemedText style={styles.recentTitle}>My Beautiful Dark Twisted Fantasy</ThemedText>
            <ThemedText tone="muted" style={styles.recentArtist}>Kanye West</ThemedText>
          </View>
          <View style={styles.recentItem}>
            <Image
              source={require("../../Image/mcr.jpg")}
              style={styles.recentImage}
            />
            <ThemedText style={styles.recentTitle}>The Black Parade</ThemedText>
            <ThemedText tone="muted" style={styles.recentArtist}>My Chemical Romance</ThemedText>
          </View>
          <View style={styles.recentItem}>
            <Image
              source={require("../../Image/joji.jpg")}
              style={styles.recentImage}
            />
            <ThemedText style={styles.recentTitle}>Nectar</ThemedText>
            <ThemedText tone="muted" style={styles.recentArtist}>Joji</ThemedText>
          </View>
        </ScrollView>
      </View>

      {/* Your Playlists */}
      <View style={styles.playlistsSection}>
        <ThemedText style={styles.sectionTitle}>Made for You</ThemedText>
        <View style={styles.playlistGrid}>
          <TouchableOpacity style={styles.playlistCard}>
            <View style={styles.playlistIcon}>
              <Ionicons name="musical-notes" size={24} color="#1DB954" />
            </View>
            <ThemedText style={styles.playlistTitle}>Liked Songs</ThemedText>
            <ThemedText style={styles.playlistCount}>127 songs</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.playlistCard}>
            <View style={styles.playlistIcon}>
              <Ionicons name="heart" size={24} color="#1DB954" />
            </View>
            <ThemedText style={styles.playlistTitle}>Favorites</ThemedText>
            <ThemedText style={styles.playlistCount}>89 songs</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.playlistCard}>
            <View style={styles.playlistIcon}>
              <Ionicons name="time" size={24} color="#1DB954" />
            </View>
            <ThemedText style={styles.playlistTitle}>Recently Added</ThemedText>
            <ThemedText style={styles.playlistCount}>45 songs</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.playlistCard}>
            <View style={styles.playlistIcon}>
              <Ionicons name="add" size={24} color="#1DB954" />
            </View>
            <ThemedText style={styles.playlistTitle}>Create Playlist</ThemedText>
            <ThemedText style={styles.playlistCount}>+</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Access */}
      <View style={styles.quickAccessSection}>
        <ThemedText style={styles.sectionTitle}>Quick Access</ThemedText>
        <View style={styles.quickAccessGrid}>
          <TouchableOpacity style={styles.quickAccessItem}>
            <Ionicons name="library" size={28} color="#1DB954" />
            <ThemedText style={styles.quickAccessText}>Your Library</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAccessItem}>
            <Ionicons name="search" size={28} color="#1DB954" />
            <ThemedText style={styles.quickAccessText}>Search</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAccessItem}>
            <Ionicons name="radio" size={28} color="#1DB954" />
            <ThemedText style={styles.quickAccessText}>Radio</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAccessItem}>
            <Ionicons name="settings" size={28} color="#1DB954" />
            <ThemedText style={styles.quickAccessText}>Settings</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  headerSection: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    lineHeight: 38,
  },
  subtitle: {
    color: "#B3B3B3",
    fontSize: 16,
    lineHeight: 22,
  },
  recentSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  horizontalScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  recentItem: {
    width: 140,
    marginRight: 16,
  },
  recentImage: {
    width: 140,
    height: 140,
    borderRadius: 8,
    marginBottom: 8,
  },
  recentTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  recentArtist: {
    color: "#B3B3B3",
    fontSize: 12,
  },
  playlistsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  playlistGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  playlistCard: {
    backgroundColor: "#121212",
    width: "48%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  playlistIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#1DB954",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  playlistTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  playlistCount: {
    color: "#B3B3B3",
    fontSize: 12,
    textAlign: "center",
  },
  quickAccessSection: {
    paddingHorizontal: 24,
  },
  quickAccessGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  quickAccessItem: {
    backgroundColor: "#121212",
    width: "48%",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  quickAccessText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },
});