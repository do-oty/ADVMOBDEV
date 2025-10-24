import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

type Props = TextInputProps & {
  containerStyle?: object;
};

export default function ThemedInput({ style, containerStyle, placeholderTextColor, ...rest }: Props) {
  const backgroundColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const textColor = useThemeColor({}, 'text');
  const placeholder = placeholderTextColor ?? useThemeColor({}, 'mutedText');

  return (
    <View style={[styles.container, { backgroundColor, borderColor }, containerStyle]}>
      <TextInput
        style={[styles.input, { color: textColor }, style]}
        placeholderTextColor={placeholder}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
  },
});


