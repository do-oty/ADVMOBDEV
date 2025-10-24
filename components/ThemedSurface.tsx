import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { View, type ViewProps } from 'react-native';

export type ThemedSurfaceProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: 'card' | 'background';
  withBorder?: boolean;
};

export default function ThemedSurface({ style, lightColor, darkColor, variant = 'card', withBorder = false, ...rest }: ThemedSurfaceProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, variant === 'card' ? 'card' : 'background');
  const borderColor = useThemeColor({}, 'border');
  return <View style={[{ backgroundColor }, withBorder ? { borderWidth: 1, borderColor } : undefined, style]} {...rest} />;
}


