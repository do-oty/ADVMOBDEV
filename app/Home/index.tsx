import ThemedButton from '@/components/ThemedButton';
import ThemedSurface from '@/components/ThemedSurface';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';

export default function WelcomeScreen() {
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
      {/* Green Mini Header */}
      <View style={styles.miniHeader}>
        <ThemedText tone="accent" style={styles.miniHeaderText}>Welcome Back</ThemedText>
        <ThemedText style={styles.miniHeaderTitle}>Get Started</ThemedText>
        <ThemedText tone="muted" style={styles.miniHeaderSubtitle}>Explore what you can do with Spotify</ThemedText>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <ThemedText style={styles.sectionTitle}>What you can do</ThemedText>
        <View style={styles.featuresList}>
          <ThemedSurface style={styles.featureItem} variant="card">
            <Ionicons name="musical-notes" size={32} color="#1DB954" />
            <View style={styles.featureText}>
              <ThemedText style={styles.featureTitle}>Listen to Music</ThemedText>
              <ThemedText style={styles.featureDescription}>Access millions of songs from artists worldwide</ThemedText>
            </View>
          </ThemedSurface>
          <ThemedSurface style={styles.featureItem} variant="card">
            <Ionicons name="library" size={32} color="#1DB954" />
            <View style={styles.featureText}>
              <ThemedText style={styles.featureTitle}>Create Playlists</ThemedText>
              <ThemedText style={styles.featureDescription}>Build your own music collections</ThemedText>
            </View>
          </ThemedSurface>
          <ThemedSurface style={styles.featureItem} variant="card">
            <Ionicons name="search" size={32} color="#1DB954" />
            <View style={styles.featureText}>
              <ThemedText style={styles.featureTitle}>Discover New Music</ThemedText>
              <ThemedText style={styles.featureDescription}>Find your next favorite artist or song</ThemedText>
            </View>
          </ThemedSurface>
        </View>
      </View>

      {/* Getting Started */}
      <View style={styles.gettingStartedSection}>
        <ThemedText style={styles.sectionTitle}>Getting Started</ThemedText>
        <View style={styles.stepsList}>
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <ThemedText style={styles.stepNumberText}>1</ThemedText>
            </View>
            <ThemedText style={styles.stepText}>Swipe right from the left edge to open the menu</ThemedText>
          </View>
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <ThemedText style={styles.stepNumberText}>2</ThemedText>
            </View>
            <ThemedText style={styles.stepText}>Pull down to refresh content on any page</ThemedText>
          </View>
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <ThemedText style={styles.stepNumberText}>3</ThemedText>
            </View>
            <ThemedText style={styles.stepText}>Explore different tabs to discover music</ThemedText>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <ThemedButton title="Get Started" />
        <ThemedButton variant="secondary" title="Learn More" />
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
  featuresSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  featuresList: {
    gap: 16,
  },
  featureItem: { flexDirection: "row", alignItems: "center", borderRadius: 12, padding: 16 },
  featureText: {
    flex: 1,
    marginLeft: 16,
  },
  featureTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  featureDescription: {
    color: "#B3B3B3",
    fontSize: 14,
    lineHeight: 20,
  },
  gettingStartedSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  stepsList: {
    gap: 16,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121212",
    borderRadius: 12,
    padding: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1DB954",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  stepNumberText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  stepText: {
    color: "#FFFFFF",
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  actionsSection: {
    paddingHorizontal: 24,
    gap: 12,
  },
});