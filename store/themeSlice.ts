import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark' | 'custom';

export type ThemeState = {
  mode: ThemeMode;
  accent: string;
};

const initialState: ThemeState = {
  mode: 'dark',
  accent: '#1DB954',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
    },
    setAccent(state, action: PayloadAction<string>) {
      state.accent = action.payload;
    },
    setPreset(state, action: PayloadAction<{ mode: ThemeMode; accent: string }>) {
      state.mode = action.payload.mode;
      state.accent = action.payload.accent;
    },
  },
});

export const { setMode, setAccent, setPreset } = themeSlice.actions;
export default themeSlice.reducer;


