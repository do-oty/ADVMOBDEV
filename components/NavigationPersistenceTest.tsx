import { useNavigationContext } from '@/contexts/NavigationContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';

export default function NavigationPersistenceTest() {
  const { currentScreen, drawerOpen, clearNavigationState, isReady } = useNavigationContext();
  const [savedState, setSavedState] = useState<string>('');

  const handleTestPersistence = async () => {
    try {
      // Get the saved state from AsyncStorage
      const savedStateData = await AsyncStorage.getItem('navigation_state');
      setSavedState(savedStateData || 'No saved state found');
      
      const stateInfo = savedStateData ? JSON.parse(savedStateData) : null;
      
      Alert.alert(
        'Navigation State (Expo Router)',
        `App Ready: ${isReady ? 'Yes' : 'No'}\nCurrent Screen: ${currentScreen}\nDrawer Open: ${drawerOpen ? 'Yes' : 'No'}\n\nSaved State:\n${savedStateData ? JSON.stringify(stateInfo, null, 2) : 'None'}`,
        [
          {
            text: 'Clear State',
            onPress: async () => {
              await clearNavigationState();
              setSavedState('');
              Alert.alert('Success', 'Navigation state cleared!');
            }
          },
          { text: 'OK' }
        ]
      );
    } catch (error) {
      Alert.alert('Error', `Failed to read saved state: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleTestPersistence} accessibilityLabel={savedState ? 'State loaded' : 'No state loaded'}>
        <ThemedText style={styles.buttonText}>Test Navigation Persistence</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    backgroundColor: '#1DB954',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
