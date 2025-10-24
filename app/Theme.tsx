import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { RootState } from '@/store';
import { setAccent, setMode, setPreset } from '@/store/themeSlice';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';

export default function ThemeScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { mode, accent } = useSelector((s: RootState) => s.theme);
  const progress = useSharedValue(mode === 'dark' ? 1 : 0);
  const [localAccent, setLocalAccent] = useState(accent);

  useEffect(() => {
    progress.value = withTiming(mode === 'dark' ? 1 : 0, { duration: 250 });
  }, [mode, progress]);

  const bgStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], ['#ffffff', '#000000']) as string,
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], ['#000000', '#ffffff']) as string,
  }));

  return (
    <Animated.View style={[styles.container, bgStyle]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.replace('/Home/HomePage' as any)}>
          <Ionicons name="arrow-back" size={22} color={mode === 'light' ? '#000' : '#fff'} />
        </TouchableOpacity>
        <View style={styles.headerTextWrap}>
          <ThemedText tone="accent" style={styles.miniHeaderText}>App Customization</ThemedText>
          <Animated.Text style={[styles.headerTitle, textStyle]}>Theme Settings</Animated.Text>
          <ThemedText style={styles.headerSubtitle}>Switch modes and choose an accent</ThemedText>
        </View>
        <View style={{ width: 38 }} />
      </View>

      {/* Body */}
      <ThemedView style={styles.body}>
        <ThemedText style={styles.sectionTitle}>Mode</ThemedText>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.modePill, mode === 'light' ? { backgroundColor: accent } : styles.modePillInactive]} onPress={() => dispatch(setMode('light'))}>
            <ThemedText style={[styles.modePillText, mode === 'light' ? styles.modePillTextActive : undefined]}>Light</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modePill, mode === 'dark' ? { backgroundColor: accent } : styles.modePillInactive]} onPress={() => dispatch(setMode('dark'))}>
            <ThemedText style={[styles.modePillText, mode === 'dark' ? styles.modePillTextActive : undefined]}>Dark</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modePill, mode === 'custom' ? { backgroundColor: accent } : styles.modePillInactive]} onPress={() => dispatch(setPreset({ mode: 'custom', accent: localAccent }))}>
            <ThemedText style={[styles.modePillText, mode === 'custom' ? styles.modePillTextActive : undefined]}>Custom</ThemedText>
          </TouchableOpacity>
        </View>

        <ThemedText style={styles.sectionTitle}>Accent</ThemedText>
        <View style={styles.paletteRow}>
          {['#1DB954', '#FF6B6B', '#4DA3FF', '#F59E0B'].map((c) => (
            <TouchableOpacity
              key={c}
              style={[styles.accent, { backgroundColor: c, borderColor: c === localAccent ? '#FFFFFF' : 'transparent' }]}
              onPress={() => { setLocalAccent(c); dispatch(setAccent(c)); dispatch(setPreset({ mode: 'custom', accent: c })); }}
            />
          ))}
        </View>

        <ThemedView style={[styles.previewCard, { borderColor: accent }] }>
          <ThemedText style={styles.previewTitle}>Live Preview</ThemedText>
          <View style={styles.previewRow}>
            <TouchableOpacity style={[styles.primary, { backgroundColor: accent }]}>
              <ThemedText style={styles.primaryText}>Primary</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.secondary, { borderColor: accent }]}>
              <ThemedText style={[styles.secondaryText, { color: accent }]}>Secondary</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>

        <ThemedText style={styles.note}>Changes persist and animate between modes.</ThemedText>
      </ThemedView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 8, paddingTop: 60 },
  iconBtn: { padding: 8 },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  headerTextWrap: { flex: 1, paddingLeft: 8 },
  miniHeaderText: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  headerSubtitle: { fontSize: 12, opacity: 0.7 },
  body: { flex: 1, paddingHorizontal: 16, paddingTop: 8, gap: 8, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  sectionTitle: { fontSize: 14, fontWeight: '600', opacity: 0.8, marginTop: 8 },
  buttonRow: { flexDirection: 'row', gap: 12, marginVertical: 8 },
  primary: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  primaryText: { color: '#000', fontWeight: 'bold' },
  secondary: { borderWidth: 1, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  secondaryText: { fontWeight: 'bold' },
  modePill: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  modePillInactive: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
  modePillText: { fontWeight: '600', opacity: 0.9 },
  modePillTextActive: { color: '#000' },
  paletteRow: { flexDirection: 'row', gap: 12, marginVertical: 8 },
  accent: { width: 40, height: 40, borderRadius: 20, borderWidth: 2 },
  previewCard: { marginTop: 8, padding: 16, borderRadius: 12, borderWidth: 1 },
  previewTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  previewRow: { flexDirection: 'row', gap: 12 },
  note: { marginTop: 12, opacity: 0.6 },
});


