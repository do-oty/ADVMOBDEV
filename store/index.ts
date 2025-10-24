import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import themeReducer, { ThemeState } from './themeSlice';

const THEME_KEY = 'theme_settings_v1';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

store.subscribe(() => {
  const state = store.getState() as { theme: ThemeState };
  void AsyncStorage.setItem(THEME_KEY, JSON.stringify(state.theme));
});

export async function loadThemeFromStorage() {
  const saved = await AsyncStorage.getItem(THEME_KEY);
  if (!saved) return null;
  try {
    return JSON.parse(saved) as ThemeState;
  } catch {
    return null;
  }
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


