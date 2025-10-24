import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import ThemedButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { loadJSON, saveJSON } from '@/hooks/usePersistentStorage';

type PlaylistState = {
  songs: string[];
  history: string[][];
  future: string[][];
  input: string;
};

type Action =
  | { type: 'setInput'; value: string }
  | { type: 'add' }
  | { type: 'remove'; index: number }
  | { type: 'clear' }
  | { type: 'undo' }
  | { type: 'redo' }
  | { type: 'hydrate'; state: PlaylistState };

const initialState: PlaylistState = { songs: [], history: [], future: [], input: '' };

function reducer(state: PlaylistState, action: Action): PlaylistState {
  switch (action.type) {
    case 'hydrate':
      return action.state;
    case 'setInput':
      return { ...state, input: action.value };
    case 'add': {
      const name = state.input.trim();
      if (!name) return state;
      const next = { songs: [...state.songs, name], history: [...state.history, state.songs], future: [], input: '' };
      return next;
    }
    case 'remove': {
      const nextSongs = state.songs.filter((_, i) => i !== action.index);
      return { songs: nextSongs, history: [...state.history, state.songs], future: [], input: state.input };
    }
    case 'clear':
      return { songs: [], history: [...state.history, state.songs], future: [], input: state.input };
    case 'undo': {
      if (state.history.length === 0) return state;
      const prev = state.history[state.history.length - 1];
      const newHistory = state.history.slice(0, -1);
      return { songs: prev, history: newHistory, future: [state.songs, ...state.future], input: state.input };
    }
    case 'redo': {
      if (state.future.length === 0) return state;
      const [next, ...rest] = state.future;
      return { songs: next, history: [...state.history, state.songs], future: rest, input: state.input };
    }
    default:
      return state;
  }
}

export default function PlaylistBuilder() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const saved = await loadJSON<PlaylistState>('playlist_state', initialState);
      dispatch({ type: 'hydrate', state: saved });
    })();
  }, []);

  useEffect(() => {
    void saveJSON('playlist_state', state);
  }, [state]);

  const addSong = useCallback(() => dispatch({ type: 'add' }), []);
  const clear = useCallback(() => dispatch({ type: 'clear' }), []);
  const undo = useCallback(() => dispatch({ type: 'undo' }), []);
  const redo = useCallback(() => dispatch({ type: 'redo' }), []);

  const renderRightActions = (onRemove: () => void) => (
    <View style={styles.swipeActions}>
      <TouchableOpacity style={styles.removeBtn} onPress={onRemove}>
        <ThemedText style={styles.removeText}>Remove</ThemedText>
      </TouchableOpacity>
    </View>
  );

  const Row = React.memo(function Row({ title, index }: { title: string; index: number }) {
    return (
      <Swipeable renderRightActions={() => renderRightActions(() => dispatch({ type: 'remove', index }))}>
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.songRow}>
          <ThemedText style={styles.songText}>{title}</ThemedText>
          <TouchableOpacity style={styles.removeBtn} onPress={() => dispatch({ type: 'remove', index })}>
            <ThemedText style={styles.removeText}>Remove</ThemedText>
          </TouchableOpacity>
        </Animated.View>
      </Swipeable>
    );
  });

  const renderItem = useCallback(({ item, index }: ListRenderItemInfo<string>) => (
    <Row title={item} index={index} />
  ), []);

  const keyExtractor = useCallback((item: string, index: number) => `${item}-${index}` , []);

  const canUndo = state.history.length > 0;
  const canRedo = state.future.length > 0;

  const historyCount = useMemo(() => state.history.length, [state.history.length]);

  const isEmpty = state.songs.length === 0;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText tone="accent" style={styles.miniHeaderText}>Playlist Creation</ThemedText>
        <ThemedText style={styles.title}>Create a Playlist</ThemedText>
        <ThemedText tone="muted" style={styles.subtitle}>Add songs and manage history with undo/redo</ThemedText>
      </View>
      <View style={styles.row}>
        <TextInput
          placeholder="Enter song name"
          placeholderTextColor="#888"
          value={state.input}
          onChangeText={(t) => dispatch({ type: 'setInput', value: t })}
          style={styles.input}
        />
        <ThemedButton title="Add" onPress={addSong} />
      </View>

      <View style={styles.actions}>
        <ThemedButton variant="secondary" title="Clear" onPress={clear} />
        <ThemedButton variant="secondary" title="Undo" onPress={undo} disabled={!canUndo} />
        <ThemedButton variant="secondary" title="Redo" onPress={redo} disabled={!canRedo} />
      </View>

      {isEmpty && (
        <View style={styles.emptyWrap}>
          <ThemedText style={styles.emptyTitle}>No songs yet</ThemedText>
          <ThemedText style={styles.emptySubtitle}>Add your first song to get started</ThemedText>
        </View>
      )}

      <FlatList
        data={state.songs}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <ThemedText style={styles.meta}>History entries: {historyCount}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
  header: { marginBottom: 8, paddingHorizontal: 24 },
  miniHeaderText: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  iconBtn: { padding: 8 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  subtitle: { color: '#B3B3B3', marginBottom: 16 },
  row: { flexDirection: 'row', gap: 8, marginBottom: 12, paddingHorizontal: 24 },
  input: { flex: 1, backgroundColor: '#121212', color: '#fff', paddingHorizontal: 12, borderRadius: 8, height: 44 },
  primary: { backgroundColor: '#1DB954', paddingHorizontal: 16, justifyContent: 'center', borderRadius: 8 },
  primaryText: { color: '#000', fontWeight: 'bold' },
  actions: { flexDirection: 'row', gap: 8, marginBottom: 12, paddingHorizontal: 24 },
  secondary: { borderColor: '#1DB954', borderWidth: 1, paddingHorizontal: 16, height: 40, justifyContent: 'center', borderRadius: 8 },
  disabled: { opacity: 0.4 },
  secondaryText: { color: '#1DB954', fontWeight: 'bold' },
  list: { gap: 8, paddingBottom: 16, paddingHorizontal: 24 },
  emptyWrap: { alignItems: 'center', paddingVertical: 24 },
  emptyTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '600', marginBottom: 4 },
  emptySubtitle: { color: '#B3B3B3' },
  songRow: { backgroundColor: '#121212', padding: 12, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  songText: { color: '#fff' },
  swipeActions: { justifyContent: 'center', alignItems: 'flex-end' },
  removeBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, borderWidth: 1, borderColor: '#b00', backgroundColor: '#220000' },
  removeText: { color: '#ff6b6b', fontWeight: '600' },
  meta: { color: '#888', marginTop: 8, paddingHorizontal: 24 },
});


