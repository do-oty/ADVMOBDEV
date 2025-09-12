import { useNavigationContext } from '@/contexts/NavigationContext';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
    Extrapolate,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
import DrawerContent from './DrawerContent';

const { width: screenWidth } = Dimensions.get('window');
const DRAWER_WIDTH = screenWidth * 0.8;

interface CustomDrawerProps {
  children: React.ReactNode;
}

export default function CustomDrawer({ children }: CustomDrawerProps) {
  const translateX = useSharedValue(0);
  const { drawerOpen, setDrawerOpen } = useNavigationContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(drawerOpen);

  const openDrawer = () => {
    setIsDrawerOpen(true);
    setDrawerOpen(true);
    translateX.value = withTiming(DRAWER_WIDTH, { duration: 300 });
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setDrawerOpen(false);
    translateX.value = withTiming(0, { duration: 300 });
  };

  const onGestureEvent = (event: any) => {
    const { translationX } = event.nativeEvent;
    if (translationX > 0) {
      // Swiping right - open drawer
      translateX.value = Math.min(translationX, DRAWER_WIDTH);
    } else if (isDrawerOpen && translationX < 0) {
      // Swiping left when drawer is open - close drawer
      translateX.value = Math.max(DRAWER_WIDTH + translationX, 0);
    }
  };

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationX, velocityX } = event.nativeEvent;
      
      if (translationX > 50 || velocityX > 500) {
        // Swipe right - open drawer
        runOnJS(openDrawer)();
      } else if (translationX < -50 || velocityX < -500) {
        // Swipe left - close drawer
        runOnJS(closeDrawer)();
      } else {
        // Snap back to current state
        if (isDrawerOpen) {
          runOnJS(openDrawer)();
        } else {
          runOnJS(closeDrawer)();
        }
      }
    }
  };

  const drawerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const mainContentStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [0, DRAWER_WIDTH],
      [1, 0.95],
      Extrapolate.CLAMP
    );

    const borderRadius = interpolate(
      translateX.value,
      [0, DRAWER_WIDTH],
      [0, 12],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { scale },
      ],
      borderRadius,
      overflow: 'hidden',
    };
  });

  return (
    <View style={styles.container}>
      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <View style={styles.overlay} onTouchEnd={closeDrawer} />
      )}
      
      {/* Drawer Content */}
      <Animated.View style={[styles.drawer, drawerStyle]}>
        <DrawerContent />
      </Animated.View>

      {/* Main Content */}
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
        activeOffsetX={[-10, 10]}
      >
        <Animated.View style={[styles.mainContent, mainContentStyle]}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: -DRAWER_WIDTH,
    width: DRAWER_WIDTH,
    height: '100%',
    zIndex: 2,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
