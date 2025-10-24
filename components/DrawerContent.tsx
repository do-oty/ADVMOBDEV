import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export default function DrawerContent() {
  const router = useRouter();

  const menuItems = [
    { title: 'Home', icon: 'home', route: '/Home/HomePage' },
    { title: 'Search', icon: 'search', route: '/Home/explore' },
    { title: 'Your Library', icon: 'library', route: '/Home/ComponentShowcase' },
    { title: 'Liked Songs', icon: 'heart', route: '/Home/index' },
    { title: 'Recently Played', icon: 'time', route: '/Home/HomePage' },
    { title: 'Profile & Settings', icon: 'person', route: '/Profile' },
    { title: 'Camera', icon: 'camera', route: '/Camera' },
    { title: 'Map', icon: 'map', route: '/MapFinal' },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Image 
            source={require('@/Image/Spotify_icon.svg.png')} 
            style={styles.spotifyIcon}
            resizeMode="contain"
          />
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => router.replace(item.route as any)}
              activeOpacity={0.7}
            >
              <Ionicons name={item.icon as any} size={24} color="#FFFFFF" />
              <ThemedText style={styles.menuText}>{item.title}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Playlists Section */}
        <View style={styles.playlistSection}>
          <ThemedText style={styles.sectionTitle}>Playlists</ThemedText>
          {['My Playlist 1', 'My Playlist 2', 'Favorites', 'Workout Mix'].map((playlist, index) => (
            <TouchableOpacity
              key={index}
              style={styles.playlistItem}
              onPress={() => router.push('/Home/HomePage' as any)}
              activeOpacity={0.7}
            >
              <Ionicons name="musical-notes" size={20} color="#B3B3B3" />
              <ThemedText style={styles.playlistText}>{playlist}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#282828',
    alignItems: 'center',
  },
  spotifyIcon: {
    width: 120,
    height: 40,
  },
  menuContainer: {
    paddingVertical: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  menuText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 15,
    fontWeight: '500',
  },
  playlistSection: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#282828',
  },
  sectionTitle: {
    fontSize: 14,
    color: '#B3B3B3',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  playlistText: {
    fontSize: 14,
    color: '#B3B3B3',
    marginLeft: 15,
  },
});
