import { Image } from "expo-image";
import React, { useState } from "react";
import { Alert, Dimensions, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const { width } = Dimensions.get("window");

export default function ComponentShowcase() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      Alert.alert("Search Results", `Searching for: "${searchQuery}"`);
    } else {
      Alert.alert("Search", "Please enter a search term");
    }
  };

  const featuredContent = [
    {
      title: "My Chemical Romance",
      subtitle: "Alternative Rock Band",
      description: "Influential rock band known for theatrical performances and concept albums",
      image: require("../../Image/mcr.jpg"),
      type: "artist"
    },
    {
      title: "Joji",
      subtitle: "R&B/Hip-Hop Artist",
      description: "Contemporary artist blending R&B, lo-fi, and alternative hip-hop",
      image: require("../../Image/joji.jpg"),
      type: "artist"
    }
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header Section */}
      <ThemedView style={styles.headerSection}>
        <ThemedText style={styles.welcomeText}>Featured</ThemedText>
        <ThemedText style={styles.mainTitle}>Trending Now</ThemedText>
        <ThemedText style={styles.subtitle}>Discover what's hot in music today</ThemedText>
      </ThemedView>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search featured content..."
            placeholderTextColor="#B3B3B3"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <ThemedText style={styles.searchButtonText}>Search</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Featured Artists */}
      <View style={styles.featuredSection}>
        <ThemedText style={styles.sectionTitle}>Featured Artists This Week</ThemedText>
        <View style={styles.artistsList}>
          {featuredContent.map((item, index) => (
            <View key={index} style={styles.artistCard}>
              <View style={styles.imageContainer}>
                <Image
                  source={item.image}
                  style={styles.artistImage}
                  contentFit="contain"
                />
              </View>
              <View style={styles.artistInfo}>
                <ThemedText style={styles.artistTitle}>{item.title}</ThemedText>
                <ThemedText style={styles.artistSubtitle}>{item.subtitle}</ThemedText>
                <ThemedText style={styles.artistDescription}>{item.description}</ThemedText>
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.primaryButton}>
                    <ThemedText style={styles.primaryButtonText}>Follow</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.secondaryButton}>
                    <ThemedText style={styles.secondaryButtonText}>Listen</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Trending Categories */}
      <View style={styles.trendingSection}>
        <ThemedText style={styles.sectionTitle}>Trending Categories</ThemedText>
        <View style={styles.categoriesGrid}>
          <TouchableOpacity style={styles.trendingCard}>
            <ThemedText style={styles.trendingTitle}>New Releases</ThemedText>
            <ThemedText style={styles.trendingSubtext}>Latest drops from top artists</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trendingCard}>
            <ThemedText style={styles.trendingTitle}>Rising Stars</ThemedText>
            <ThemedText style={styles.trendingSubtext}>Up-and-coming talent</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trendingCard}>
            <ThemedText style={styles.trendingTitle}>Chart Toppers</ThemedText>
            <ThemedText style={styles.trendingSubtext}>Most popular tracks</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trendingCard}>
            <ThemedText style={styles.trendingTitle}>Underground</ThemedText>
            <ThemedText style={styles.trendingSubtext}>Hidden gems to discover</ThemedText>
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
  headerSection: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
    backgroundColor: "#000000",
  },
  welcomeText: {
    color: "#1DB954",
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
  featuredSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  artistsList: {
    gap: 16,
  },
  artistCard: {
    flexDirection: "row",
    backgroundColor: "#121212",
    borderRadius: 12,
    padding: 16,
    alignItems: "flex-start",
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 6,
    overflow: "hidden",
    marginRight: 16,
  },
  artistImage: {
    width: "100%",
    height: "100%",
  },
  artistInfo: {
    flex: 1,
  },
  artistTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  artistSubtitle: {
    color: "#1DB954",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  artistDescription: {
    color: "#B3B3B3",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  primaryButton: {
    backgroundColor: "#1DB954",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#1DB954",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  secondaryButtonText: {
    color: "#1DB954",
    fontSize: 12,
    fontWeight: "bold",
  },
  trendingSection: {
    paddingHorizontal: 24,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  trendingCard: {
    backgroundColor: "#121212",
    width: "48%",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#1DB954",
  },
  trendingTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  trendingSubtext: {
    color: "#B3B3B3",
    fontSize: 12,
    lineHeight: 16,
  },
});