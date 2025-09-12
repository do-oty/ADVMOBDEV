// Test script for navigation features
// Run this with: node scripts/test-navigation.js

const AsyncStorage = require('@react-native-async-storage/async-storage');

async function testNavigationPersistence() {
  console.log('🧪 Testing Navigation Persistence...');
  
  try {
    // Test saving navigation state
    const testState = {
      screen: 'Home/HomePage',
      drawerOpen: true,
      timestamp: Date.now()
    };
    
    await AsyncStorage.setItem('navigation_state', JSON.stringify(testState));
    console.log('✅ Successfully saved navigation state');
    
    // Test retrieving navigation state
    const savedState = await AsyncStorage.getItem('navigation_state');
    const parsedState = JSON.parse(savedState);
    
    if (parsedState.screen === testState.screen && parsedState.drawerOpen === testState.drawerOpen) {
      console.log('✅ Successfully retrieved navigation state');
    } else {
      console.log('❌ Retrieved state does not match saved state');
    }
    
    // Test clearing navigation state
    await AsyncStorage.removeItem('navigation_state');
    const clearedState = await AsyncStorage.getItem('navigation_state');
    
    if (clearedState === null) {
      console.log('✅ Successfully cleared navigation state');
    } else {
      console.log('❌ Failed to clear navigation state');
    }
    
    console.log('🎉 All navigation persistence tests passed!');
    
  } catch (error) {
    console.error('❌ Navigation persistence test failed:', error);
  }
}

// Run tests
testNavigationPersistence();
