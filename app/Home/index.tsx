import { Image } from 'expo-image';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header Section */}
      <ThemedView style={styles.headerSection}>
        <ThemedText style={styles.welcomeText}>Welcome Back</ThemedText>
        <ThemedText style={styles.mainTitle}>Discover Your Sound</ThemedText>
        <ThemedText style={styles.subtitle}>Millions of tracks, endless possibilities</ThemedText>
      </ThemedView>

      {/* Featured Track Section */}
      <View style={styles.featuredSection}>
        <ThemedText style={styles.sectionTitle}>Now Playing</ThemedText>
        <View style={styles.trackCard}>
          <Image
            source={require("../../Image/mbdtf.jpg")}
            style={styles.trackImage}
          />
          <View style={styles.trackInfo}>
            <ThemedText style={styles.trackTitle}>My Beautiful Dark Twisted Fantasy</ThemedText>
            <ThemedText style={styles.trackArtist}>Kanye West</ThemedText>
            <View style={styles.trackControls}>
              <TouchableOpacity style={styles.playButton}>
                <ThemedText style={styles.playButtonText}>Play</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton}>
                <ThemedText style={styles.addButtonText}>Add to Library</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Music Categories */}
      <View style={styles.categoriesSection}>
        <ThemedText style={styles.sectionTitle}>Explore Music</ThemedText>
        <View style={styles.categoriesGrid}>
          <TouchableOpacity style={styles.categoryCard}>
            <ThemedText style={styles.categoryTitle}>Hip Hop</ThemedText>
            <ThemedText style={styles.categorySubtext}>Latest beats and rhymes</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCard}>
            <ThemedText style={styles.categoryTitle}>Rock</ThemedText>
            <ThemedText style={styles.categorySubtext}>Classic and modern rock</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCard}>
            <ThemedText style={styles.categoryTitle}>Pop</ThemedText>
            <ThemedText style={styles.categorySubtext}>Chart-topping hits</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCard}>
            <ThemedText style={styles.categoryTitle}>Indie</ThemedText>
            <ThemedText style={styles.categorySubtext}>Underground discoveries</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <TouchableOpacity style={styles.primaryAction}>
          <ThemedText style={styles.primaryActionText}>Start Listening</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryAction}>
          <ThemedText style={styles.secondaryActionText}>Browse Library</ThemedText>
        </TouchableOpacity>
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
  trackCard: {
    backgroundColor: "#121212",
    borderRadius: 12,
    padding: 20,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  trackImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    lineHeight: 20,
  },
  trackArtist: {
    color: "#B3B3B3",
    fontSize: 14,
    marginBottom: 16,
  },
  trackControls: {
    flexDirection: "row",
    gap: 12,
  },
  playButton: {
    backgroundColor: "#1DB954",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  playButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  addButton: {
    borderWidth: 1,
    borderColor: "#1DB954",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: "#1DB954",
    fontSize: 14,
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
    backgroundColor: "#121212",
    width: "48%",
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#1DB954",
  },
  categoryTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  categorySubtext: {
    color: "#B3B3B3",
    fontSize: 12,
    lineHeight: 16,
  },
  actionsSection: {
    paddingHorizontal: 24,
    gap: 12,
  },
  primaryAction: {
    backgroundColor: "#1DB954",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryActionText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryAction: {
    borderWidth: 1,
    borderColor: "#1DB954",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryActionText: {
    color: "#1DB954",
    fontSize: 16,
    fontWeight: "bold",
  },
});