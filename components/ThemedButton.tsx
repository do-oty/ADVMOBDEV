import type { RootState } from '@/store';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useSelector } from 'react-redux';

type Props = TouchableOpacityProps & {
  variant?: 'primary' | 'secondary';
  title: string;
};

export default function ThemedButton({ variant = 'primary', title, style, ...rest }: Props) {
  const accent = useSelector((s: RootState) => s.theme.accent) || '#1DB954';
  const isPrimary = variant === 'primary';
  return (
    <TouchableOpacity
      style={[
        styles.base,
        isPrimary ? [styles.primary, { backgroundColor: accent }] : [styles.secondary, { borderColor: accent }],
        style,
      ]}
      {...rest}
    >
      <Text style={[styles.text, isPrimary ? styles.textOnPrimary : { color: accent }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  primary: {},
  secondary: { borderWidth: 1 },
  text: { fontWeight: 'bold' },
  textOnPrimary: { color: '#000' },
});


