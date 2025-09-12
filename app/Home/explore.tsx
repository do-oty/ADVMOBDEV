import React, { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';

export default function TabTwoScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView 
      style={styles.container} 
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
      {/* Green Mini Header */}
      <View style={styles.miniHeader}>
        <ThemedText style={styles.miniHeaderText}>Music Search</ThemedText>
        <ThemedText style={styles.miniHeaderTitle}>Find Anything</ThemedText>
        <ThemedText style={styles.miniHeaderSubtitle}>Search artists, songs, albums, and playlists</ThemedText>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#B3B3B3"
          />
          <TouchableOpacity style={styles.searchButton}>
            <ThemedText style={styles.searchButtonText}>Search</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Search Suggestions */}
      <View style={styles.suggestionsSection}>
        <ThemedText style={styles.sectionTitle}>Quick Search</ThemedText>
        <View style={styles.suggestionsGrid}>
          <TouchableOpacity style={styles.suggestionCard}>
            <ThemedText style={styles.suggestionText}>Trending Songs</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestionCard}>
            <ThemedText style={styles.suggestionText}>New Releases</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestionCard}>
            <ThemedText style={styles.suggestionText}>Top Artists</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestionCard}>
            <ThemedText style={styles.suggestionText}>Popular Playlists</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Browse Categories */}
      <View style={styles.categoriesSection}>
        <ThemedText style={styles.sectionTitle}>Browse by Genre</ThemedText>
        <View style={styles.categoriesGrid}>
          <TouchableOpacity style={[styles.categoryCard, { backgroundColor: "#1DB954" }]}>
            <ThemedText style={styles.categoryTitle}>Hip Hop</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.categoryCard, { backgroundColor: "#E22134" }]}>
            <ThemedText style={styles.categoryTitle}>Rock</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.categoryCard, { backgroundColor: "#FF6B35" }]}>
            <ThemedText style={styles.categoryTitle}>Pop</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.categoryCard, { backgroundColor: "#8E44AD" }]}>
            <ThemedText style={styles.categoryTitle}>Electronic</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.categoryCard, { backgroundColor: "#F39C12" }]}>
            <ThemedText style={styles.categoryTitle}>Jazz</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.categoryCard, { backgroundColor: "#2ECC71" }]}>
            <ThemedText style={styles.categoryTitle}>Alternative</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Searches */}
      <View style={styles.recentSection}>
        <ThemedText style={styles.sectionTitle}>Recent Searches</ThemedText>
        <View style={styles.recentList}>
          <TouchableOpacity style={styles.recentItem}>
            <ThemedText style={styles.recentText}>Drake</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.recentItem}>
            <ThemedText style={styles.recentText}>The Weeknd</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.recentItem}>
            <ThemedText style={styles.recentText}>Billie Eilish</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  miniHeader: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: "#000000",
  },
  miniHeaderText: {
    color: "#1DB954",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  miniHeaderTitle: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    lineHeight: 38,
  },
  miniHeaderSubtitle: {
    color: "#B3B3B3",
    fontSize: 16,
    lineHeight: 22,
  },
  searchSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#121212",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    paddingVertical: 12,
  },
  searchButton: {
    backgroundColor: "#1DB954",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  suggestionsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  suggestionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  suggestionCard: {
    backgroundColor: "#121212",
    width: "48%",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#282828",
  },
  suggestionText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  categoriesSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  categoryCard: {
    width: "48%",
    paddingVertical: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  recentSection: {
    paddingHorizontal: 24,
  },
  recentList: {
    gap: 8,
  },
  recentItem: {
    backgroundColor: "#121212",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#1DB954",
  },
  recentText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});