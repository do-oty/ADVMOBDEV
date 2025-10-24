import ThemedSurface from "@/components/ThemedSurface";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from '@expo/vector-icons';
import { Image } from "expo-image";
import React, { useState } from "react";
import { Alert, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

export default function ComponentShowcase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      Alert.alert("Search Results", `Searching for: "${searchQuery}"`);
    } else {
      Alert.alert("Search", "Please enter a search term");
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
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
      {/* Green Mini Header */}
      <View style={styles.miniHeader}>
        <ThemedText tone="accent" style={styles.miniHeaderText}>Music Discovery</ThemedText>
        <ThemedText style={styles.miniHeaderTitle}>Explore & Discover</ThemedText>
        <ThemedText tone="muted" style={styles.miniHeaderSubtitle}>Find new music that matches your taste</ThemedText>
      </View>

      {/* Discovery Filters */}
      <View style={styles.filtersSection}>
        <ThemedText style={styles.sectionTitle}>Discovery Filters</ThemedText>
        <View style={styles.filtersRow}>
          <ThemedSurface withBorder style={styles.filterChip}><ThemedText style={styles.filterText}>For You</ThemedText></ThemedSurface>
          <ThemedSurface withBorder style={styles.filterChip}><ThemedText style={styles.filterText}>New & Noteworthy</ThemedText></ThemedSurface>
          <ThemedSurface withBorder style={styles.filterChip}><ThemedText style={styles.filterText}>Trending</ThemedText></ThemedSurface>
        </View>
      </View>

      {/* New Releases */}
      <View style={styles.newReleasesSection}>
        <ThemedText style={styles.sectionTitle}>New Releases</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <View style={styles.releaseCard}>
            <Image
              source={require("../../Image/mbdtf.jpg")}
              style={styles.releaseImage}
            />
            <ThemedText style={styles.releaseTitle}>My Beautiful Dark Twisted Fantasy</ThemedText>
            <ThemedText style={styles.releaseArtist}>Kanye West</ThemedText>
            <ThemedText style={styles.releaseDate}>Released 2 days ago</ThemedText>
          </View>
          <View style={styles.releaseCard}>
            <Image
              source={require("../../Image/mcr.jpg")}
              style={styles.releaseImage}
            />
            <ThemedText style={styles.releaseTitle}>The Black Parade</ThemedText>
            <ThemedText style={styles.releaseArtist}>My Chemical Romance</ThemedText>
            <ThemedText style={styles.releaseDate}>Released 1 week ago</ThemedText>
          </View>
          <View style={styles.releaseCard}>
            <Image
              source={require("../../Image/joji.jpg")}
              style={styles.releaseImage}
            />
            <ThemedText style={styles.releaseTitle}>Nectar</ThemedText>
            <ThemedText style={styles.releaseArtist}>Joji</ThemedText>
            <ThemedText style={styles.releaseDate}>Released 3 days ago</ThemedText>
          </View>
        </ScrollView>
      </View>

      {/* Trending Now */}
      <View style={styles.trendingSection}>
        <ThemedText style={styles.sectionTitle}>Trending Now</ThemedText>
        <View style={styles.trendingList}>
          <ThemedSurface style={styles.trendingItem} variant="card">
            <View style={styles.trendingNumber}>
              <ThemedText style={styles.trendingNumberText}>1</ThemedText>
            </View>
            <Image
              source={require("../../Image/mbdtf.jpg")}
              style={styles.trendingImage}
            />
            <View style={styles.trendingInfo}>
              <ThemedText style={styles.trendingTitle}>Power</ThemedText>
              <ThemedText style={styles.trendingArtist}>Kanye West</ThemedText>
            </View>
            <Ionicons name="ellipsis-horizontal" size={20} color="#B3B3B3" />
          </ThemedSurface>
          <ThemedSurface style={styles.trendingItem} variant="card">
            <View style={styles.trendingNumber}>
              <ThemedText style={styles.trendingNumberText}>2</ThemedText>
            </View>
            <Image
              source={require("../../Image/mcr.jpg")}
              style={styles.trendingImage}
            />
            <View style={styles.trendingInfo}>
              <ThemedText style={styles.trendingTitle}>Welcome to the Black Parade</ThemedText>
              <ThemedText style={styles.trendingArtist}>My Chemical Romance</ThemedText>
            </View>
            <Ionicons name="ellipsis-horizontal" size={20} color="#B3B3B3" />
          </ThemedSurface>
          <ThemedSurface style={styles.trendingItem} variant="card">
            <View style={styles.trendingNumber}>
              <ThemedText style={styles.trendingNumberText}>3</ThemedText>
            </View>
            <Image
              source={require("../../Image/joji.jpg")}
              style={styles.trendingImage}
            />
            <View style={styles.trendingInfo}>
              <ThemedText style={styles.trendingTitle}>Glimpse of Us</ThemedText>
              <ThemedText style={styles.trendingArtist}>Joji</ThemedText>
            </View>
            <Ionicons name="ellipsis-horizontal" size={20} color="#B3B3B3" />
          </ThemedSurface>
        </View>
      </View>

      {/* Discover by Mood */}
      <View style={styles.categoriesSection}>
        <ThemedText style={styles.sectionTitle}>Discover by Mood</ThemedText>
        <View style={styles.categoriesGrid}>
          <TouchableOpacity style={styles.categoryCard}>
            <Ionicons name="sunny" size={32} color="#FFD700" />
            <ThemedText style={styles.categoryTitle}>Happy</ThemedText>
            <ThemedText style={styles.categorySubtext}>Upbeat and energetic</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCard}>
            <Ionicons name="moon" size={32} color="#9370DB" />
            <ThemedText style={styles.categoryTitle}>Chill</ThemedText>
            <ThemedText style={styles.categorySubtext}>Relaxing and mellow</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCard}>
            <Ionicons name="flame" size={32} color="#FF4500" />
            <ThemedText style={styles.categoryTitle}>Workout</ThemedText>
            <ThemedText style={styles.categorySubtext}>High energy tracks</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCard}>
            <Ionicons name="heart" size={32} color="#FF69B4" />
            <ThemedText style={styles.categoryTitle}>Romantic</ThemedText>
            <ThemedText style={styles.categorySubtext}>Love songs and ballads</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search by Genre */}
      <View style={styles.genreSection}>
        <ThemedText style={styles.sectionTitle}>Search by Genre</ThemedText>
        <View style={styles.genreGrid}>
          <ThemedSurface style={[styles.genreCard, { backgroundColor: "#1DB954" }]}>
            <ThemedText style={styles.genreTitle}>Hip Hop</ThemedText>
          </ThemedSurface>
          <ThemedSurface style={[styles.genreCard, { backgroundColor: "#E22134" }]}>
            <ThemedText style={styles.genreTitle}>Rock</ThemedText>
          </ThemedSurface>
          <ThemedSurface style={[styles.genreCard, { backgroundColor: "#FF6B35" }]}>
            <ThemedText style={styles.genreTitle}>Pop</ThemedText>
          </ThemedSurface>
          <ThemedSurface style={[styles.genreCard, { backgroundColor: "#8E44AD" }]}>
            <ThemedText style={styles.genreTitle}>Electronic</ThemedText>
          </ThemedSurface>
          <ThemedSurface style={[styles.genreCard, { backgroundColor: "#F39C12" }]}>
            <ThemedText style={styles.genreTitle}>Jazz</ThemedText>
          </ThemedSurface>
          <ThemedSurface style={[styles.genreCard, { backgroundColor: "#2ECC71" }]}>
            <ThemedText style={styles.genreTitle}>Alternative</ThemedText>
          </ThemedSurface>
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
  miniHeader: { paddingTop: 60, paddingHorizontal: 24, paddingBottom: 24 },
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
  filtersSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  filtersRow: {
    flexDirection: "row",
    gap: 12,
  },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  filterText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  newReleasesSection: {
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
  releaseCard: {
    width: 160,
    marginRight: 16,
  },
  releaseImage: {
    width: 160,
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  releaseTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  releaseArtist: {
    color: "#B3B3B3",
    fontSize: 12,
    marginBottom: 2,
  },
  releaseDate: {
    color: "#1DB954",
    fontSize: 11,
  },
  trendingSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  trendingList: {
    gap: 12,
  },
  trendingItem: { flexDirection: "row", alignItems: "center", borderRadius: 8, padding: 12 },
  trendingNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#1DB954",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  trendingNumberText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  trendingImage: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 12,
  },
  trendingInfo: {
    flex: 1,
  },
  trendingTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  trendingArtist: {
    color: "#B3B3B3",
    fontSize: 12,
  },
  categoriesSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  genreSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  genreGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  genreCard: {
    width: "48%",
    paddingVertical: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  genreTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  categoryCard: {
    backgroundColor: "#121212",
    width: "48%",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  categoryTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 4,
  },
  categorySubtext: {
    color: "#B3B3B3",
    fontSize: 12,
    textAlign: "center",
  },
});