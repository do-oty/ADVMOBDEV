import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAccentColor } from '@/hooks/useAccentColor';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface PointOfInterest {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  type: 'music_venue' | 'studio' | 'record_store';
}

const POINTS_OF_INTEREST: PointOfInterest[] = [
  {
    id: '1',
    title: 'Spotify Music Studio',
    description: 'Professional recording studio with state-of-the-art equipment',
    latitude: 37.7749,
    longitude: -122.4194,
    type: 'studio'
  },
  {
    id: '2',
    title: 'Golden Gate Music Hall',
    description: 'Historic music venue hosting live performances',
    latitude: 37.7849,
    longitude: -122.4094,
    type: 'music_venue'
  },
  {
    id: '3',
    title: 'Vinyl Records & More',
    description: 'Vintage record store with rare collections',
    latitude: 37.7649,
    longitude: -122.4294,
    type: 'record_store'
  }
];

export default function MapFinalScreen() {
  const router = useRouter();
  const accent = useAccentColor();
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');

  const handleBack = useCallback(() => {
    router.replace('/Home/HomePage');
  }, [router]);

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'studio':
        return '🎤';
      case 'music_venue':
        return '🎵';
      case 'record_store':
        return '💿';
      default:
        return '📍';
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={textColor} />
        </TouchableOpacity>
        <View style={styles.headerTextWrap}>
          <ThemedText tone="accent" style={styles.miniHeaderText}>Location Services</ThemedText>
          <ThemedText style={styles.title}>Music Map</ThemedText>
        </View>
      </View>

      {/* Map Container */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.7749,
            longitude: -122.4194,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsCompass={true}
          showsScale={true}
        >
          {/* Points of Interest Markers */}
          {POINTS_OF_INTEREST.map((poi) => (
            <Marker
              key={poi.id}
              coordinate={{
                latitude: poi.latitude,
                longitude: poi.longitude,
              }}
              title={poi.title}
              description={poi.description}
            >
              <View style={[styles.customMarker, { backgroundColor: accent }]}>
                <ThemedText style={styles.markerText}>{getMarkerIcon(poi.type)}</ThemedText>
              </View>
            </Marker>
          ))}
        </MapView>

        {/* Map Info */}
        <View style={[styles.mapInfo, { backgroundColor: cardColor }]}>
          <ThemedText style={styles.infoTitle}>Music Venues</ThemedText>
          <ThemedText style={styles.infoText}>Explore nearby music locations</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  headerTextWrap: {
    flex: 1,
  },
  miniHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  customMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  markerText: {
    fontSize: 20,
  },
  mapInfo: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    opacity: 0.8,
  },
});
