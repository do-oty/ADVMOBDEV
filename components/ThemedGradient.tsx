import { useThemeColor } from '@/hooks/useThemeColor';
import type { RootState } from '@/store';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { useSelector } from 'react-redux';

type Props = ViewProps & {
  intensity?: number; // 0..1 - how much accent blends into background
  direction?: 'vertical' | 'horizontal';
};

export default function ThemedGradient({ style, intensity = 0.25, direction = 'vertical', ...rest }: Props) {
  const accent = useSelector((s: RootState) => s.theme.accent) || '#1DB954';
  const background = useThemeColor({}, 'background');
  const colors = [background, blend(background, accent, intensity)];
  const start = direction === 'vertical' ? { x: 0, y: 0 } : { x: 0, y: 0 };
  const end = direction === 'vertical' ? { x: 0, y: 1 } : { x: 1, y: 0 };
  return <LinearGradient colors={colors} start={start} end={end} style={[styles.fill, style]} {...rest} />;
}

function blend(bgHex: string, accentHex: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(bgHex);
  const [r2, g2, b2] = hexToRgb(accentHex);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

const styles = StyleSheet.create({
  fill: { width: '100%', height: '100%' },
});


