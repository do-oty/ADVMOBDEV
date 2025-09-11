import { Image } from 'expo-image';
import { Dimensions, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width } = Dimensions.get("window");

export default function TabTwoScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header Section */}
      <ThemedView style={styles.headerSection}>
        <ThemedText style={styles.welcomeText}>Search</ThemedText>
        <ThemedText style={styles.mainTitle}>Find Your Next Favorite</ThemedText>
        <ThemedText style={styles.subtitle}>Search through millions of tracks and artists</ThemedText>
      </ThemedView>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search artists, songs, albums..."
            placeholderTextColor="#B3B3B3"
          />
          <TouchableOpacity style={styles.searchButton}>
            <ThemedText style={styles.searchButtonText}>Search</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Featured Artist */}
      <View style={styles.featuredSection}>
        <ThemedText style={styles.sectionTitle}>Featured Artist</ThemedText>
        <View style={styles.artistCard}>
          <Image
            source={require("../../Image/kanye.webp")}
            style={styles.artistImage}
          />
          <View style={styles.artistInfo}>
            <ThemedText style={styles.artistName}>Kanye West</ThemedText>
            <ThemedText style={styles.artistGenre}>Hip-Hop, Rap</ThemedText>
            <ThemedText style={styles.artistDescription}>
              Groundbreaking artist known for innovative production and influential albums that have shaped modern hip-hop.
            </ThemedText>
            <TouchableOpacity style={styles.followButton}>
              <ThemedText style={styles.followButtonText}>Follow Artist</ThemedText>
            </TouchableOpacity>
          </View>
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
  artistCard: {
    backgroundColor: "#121212",
    borderRadius: 12,
    padding: 20,
  },
  artistImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  artistInfo: {
    alignItems: "center",
  },
  artistName: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  artistGenre: {
    color: "#1DB954",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  artistDescription: {
    color: "#B3B3B3",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  followButton: {
    backgroundColor: "#1DB954",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
  },
  followButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
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