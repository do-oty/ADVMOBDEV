import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { Image as RNImage, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Grayscale, Sepia } from 'react-native-color-matrix-image-filters';

export default function CameraScreen() {
  const router = useRouter();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [filter, setFilter] = useState<'none'|'grayscale'|'sepia'>('none');
  const [intensity, setIntensity] = useState<number>(0.5);
  const [facing, setFacing] = useState<'front'|'back'>('back');

  const handleCapture = useCallback(async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    if (photo?.uri) setPhotoUri(photo.uri);
  }, []);

  const handleRotate = useCallback(async () => {
    if (!photoUri) return;
    const result = await ImageManipulator.manipulateAsync(photoUri, [{ rotate: 90 }], { compress: 1, format: ImageManipulator.SaveFormat.JPEG });
    setPhotoUri(result.uri);
  }, [photoUri]);

  const handleCrop = useCallback(async () => {
    if (!photoUri) return;
    const result = await ImageManipulator.manipulateAsync(photoUri, [{ crop: { originX: 0, originY: 0, width: 300, height: 300 } }], { compress: 1, format: ImageManipulator.SaveFormat.JPEG });
    setPhotoUri(result.uri);
  }, [photoUri]);

  const renderPreview = () => {
    if (!photoUri) return null;
    const img = (
      <RNImage source={{ uri: photoUri }} style={styles.preview} resizeMode="contain" />
    );
    if (filter === 'grayscale') {
      return <Grayscale amount={intensity}>{img}</Grayscale>;
    }
    if (filter === 'sepia') {
      return <Sepia amount={intensity}>{img}</Sepia>;
    }
    return img;
  };

  const renderContent = () => {
    if (!permission) {
      return <ThemedView style={styles.container} />;
    }
    if (!permission.granted) {
      return (
        <ThemedView style={styles.center}>
          <ThemedText style={styles.text}>We need your permission to show the camera</ThemedText>
          <TouchableOpacity style={styles.primary} onPress={requestPermission}>
            <ThemedText style={styles.primaryText}>Grant Permission</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      );
    }
    return (
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.replace('/Home/HomePage' as any)}>
            <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <ThemedText tone="accent" style={styles.miniHeaderText}>Photo Capture</ThemedText>
            <ThemedText style={styles.title}>Camera</ThemedText>
          </View>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setFacing((p) => (p === 'back' ? 'front' : 'back'))}>
            <Ionicons name="camera-reverse" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {!photoUri && (
          <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
        )}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.secondary} onPress={() => setFilter('none')}>
            <ThemedText style={styles.secondaryText}>None</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondary} onPress={() => setFilter('grayscale')}>
            <ThemedText style={styles.secondaryText}>Grayscale</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondary} onPress={() => setFilter('sepia')}>
            <ThemedText style={styles.secondaryText}>Sepia</ThemedText>
          </TouchableOpacity>
        </View>
        <View style={styles.sliderRow}>
          <ThemedText style={styles.label}>Intensity</ThemedText>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={intensity}
            onValueChange={setIntensity}
            minimumTrackTintColor="#1DB954"
            maximumTrackTintColor="#333"
          />
        </View>
        <View style={styles.actionRow}>
          {!photoUri ? (
            <TouchableOpacity style={styles.primary} onPress={handleCapture}>
              <ThemedText style={styles.primaryText}>Capture</ThemedText>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity style={styles.secondary} onPress={handleRotate}>
                <ThemedText style={styles.secondaryText}>Rotate</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondary} onPress={handleCrop}>
                <ThemedText style={styles.secondaryText}>Crop</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primary} onPress={() => setPhotoUri(null)}>
                <ThemedText style={styles.primaryText}>New</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondary} onPress={() => router.replace('/Home/HomePage' as any)}>
                <ThemedText style={styles.secondaryText}>Close</ThemedText>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.previewWrap}>{renderPreview()}</View>
      </ThemedView>
    );
  };

  return renderContent();
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingTop: 12 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 12, paddingBottom: 8 },
  miniHeaderText: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  iconBtn: { padding: 8 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' },
  text: { color: '#fff', marginBottom: 12 },
  camera: { flex: 1 },
  controls: { flexDirection: 'row', justifyContent: 'space-around', padding: 12, backgroundColor: '#111' },
  sliderRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingBottom: 8 },
  label: { color: '#fff', marginRight: 8 },
  slider: { flex: 1 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-around', padding: 12, backgroundColor: '#111' },
  primary: { backgroundColor: '#1DB954', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  primaryText: { color: '#000', fontWeight: 'bold' },
  secondary: { borderColor: '#1DB954', borderWidth: 1, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  secondaryText: { color: '#1DB954', fontWeight: 'bold' },
  previewWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  preview: { width: '90%', height: '90%' },
});


