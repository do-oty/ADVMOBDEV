/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#1DB954';
const tintColorDark = '#1DB954';

export const Colors = {
  light: {
    text: '#0A0A0A',
    background: '#F7F7F8',
    card: '#FFFFFF',
    border: '#E5E7EB',
    mutedText: '#6B7280',
    tint: tintColorLight,
    icon: '#6B7280',
    tabIconDefault: '#6B7280',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#E5E7EB',
    background: '#0B0B0C',
    card: '#121212',
    border: '#2A2A2B',
    mutedText: '#9BA1A6',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
