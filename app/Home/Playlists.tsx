import ThemedSurface from '@/components/ThemedSurface';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Playlist {
  id: string;
  name: string;
  songCount: number;
  duration: string;
  image: string;
}

const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'My Favorites',
    songCount: 25,
    duration: '1h 23m',
    image: 'musical-notes'
  },
  {
    id: '2',
    name: 'Workout Mix',
    songCount: 18,
    duration: '1h 5m',
    image: 'fitness'
  },
  {
    id: '3',
    name: 'Chill Vibes',
    songCount: 32,
    duration: '2h 15m',
    image: 'leaf'
  },
  {
    id: '4',
    name: 'Road Trip',
    songCount: 45,
    duration: '3h 2m',
    image: 'car'
  },
  {
    id: '5',
    name: 'Party Hits',
    songCount: 28,
    duration: '1h 45m',
    image: 'musical-note'
  },
  {
    id: '6',
    name: 'Study Focus',
    songCount: 20,
    duration: '1h 30m',
    image: 'book'
  }
];

export default function PlaylistsScreen() {
  const router = useRouter();
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handlePlaylistPress = (playlist: Playlist) => {
    setSelectedPlaylist(playlist.id);
    
    // Haptic feedback simulation
    setTimeout(() => {
      Alert.alert(
        'Playlist Selected',
        `You selected "${playlist.name}" with ${playlist.songCount} songs`,
        [
          {
            text: 'View Details',
            onPress: () => {
              // Navigate to playlist details
              router.push('/Home/HomePage' as any);
            }
          },
          {
            text: 'Play Now',
            onPress: () => {
              // Start playing playlist
              router.push('/Home/HomePage' as any);
            }
          },
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => setSelectedPlaylist(null)
          }
        ]
      );
    }, 100);
  };

  const PlaylistItem = ({ playlist }: { playlist: Playlist }) => (
    <TouchableOpacity
      style={[
        styles.playlistItem,
        selectedPlaylist === playlist.id && styles.selectedPlaylist
      ]}
      onPress={() => handlePlaylistPress(playlist)}
      activeOpacity={0.7}
    >
      <View style={styles.playlistImage}>
        <Ionicons 
          name={playlist.image as any} 
          size={32} 
          color={selectedPlaylist === playlist.id ? "#1DB954" : "#B3B3B3"} 
        />
      </View>
      <View style={styles.playlistInfo}>
        <ThemedText style={[
          styles.playlistName,
          selectedPlaylist === playlist.id && styles.selectedText
        ]}>
          {playlist.name}
        </ThemedText>
        <ThemedText style={styles.playlistDetails}>
          {playlist.songCount} songs • {playlist.duration}
        </ThemedText>
      </View>
      <Ionicons 
        name="chevron-forward" 
        size={20} 
        color={selectedPlaylist === playlist.id ? "#1DB954" : "#666"} 
      />
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
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
          <ThemedText tone="accent" style={styles.miniHeaderText}>Music Library</ThemedText>
          <ThemedText style={styles.miniHeaderTitle}>Your Playlists</ThemedText>
          <ThemedText tone="muted" style={styles.miniHeaderSubtitle}>Tap any playlist to view details or start playing</ThemedText>
        </View>

        {/* Playlists List */}
        <View style={styles.playlistsContainer}>
          {mockPlaylists.map((playlist) => (
            <ThemedSurface key={playlist.id} style={styles.playlistItem} withBorder>
              <PlaylistItem playlist={playlist} />
            </ThemedSurface>
          ))}
        </View>

        {/* Add Playlist Button */}
        <TouchableOpacity style={styles.addButton} activeOpacity={0.8} onPress={() => router.push('/Home/PlaylistBuilder' as any)}>
          <Ionicons name="add" size={24} color="#1DB954" />
          <ThemedText style={styles.addButtonText}>Create New Playlist</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: {
    flex: 1,
  },
  miniHeader: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#000000',
  },
  miniHeaderText: {
    color: '#1DB954',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  miniHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 38,
  },
  miniHeaderSubtitle: {
    color: '#B3B3B3',
    fontSize: 16,
    lineHeight: 22,
  },
  playlistsContainer: {
    paddingHorizontal: 24,
  },
  playlistItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 16, marginBottom: 8, borderRadius: 12 },
  selectedPlaylist: {
    backgroundColor: '#1A1A1A',
    borderColor: '#1DB954',
  },
  playlistImage: {
    width: 50,
    height: 50,
    backgroundColor: '#282828',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  playlistInfo: {
    flex: 1,
  },
  playlistName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  selectedText: {
    color: '#1DB954',
  },
  playlistDetails: {
    fontSize: 14,
    color: '#B3B3B3',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    marginTop: 20,
    marginBottom: 40,
    paddingVertical: 16,
    backgroundColor: '#121212',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1DB954',
    borderStyle: 'dashed',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1DB954',
    marginLeft: 8,
  },
});
