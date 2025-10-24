import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { NavigationProvider } from '@/contexts/NavigationContext';
import type { RootState } from '@/store';
import { loadThemeFromStorage, store } from '@/store';
import { setPreset } from '@/store/themeSlice';
import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';

function InnerApp() {
  const dispatch = useDispatch();
  const { mode } = useSelector((s: RootState) => s.theme);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  React.useEffect(() => {
    (async () => {
      const saved = await loadThemeFromStorage();
      if (saved) {
        dispatch(setPreset({ mode: saved.mode, accent: saved.accent }));
      }
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
        <ThemeProvider value={mode === 'light' ? DefaultTheme : DarkTheme}>
          <NavigationProvider>
          <Stack
            initialRouteName="Signin"
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              transitionSpec: {
                open: {
                  animation: 'timing',
                  config: {
                    duration: 300,
                  },
                },
                close: {
                  animation: 'timing',
                  config: {
                    duration: 300,
                  },
                },
              },
              cardStyleInterpolator: ({ current, layouts }: any) => {
                return {
                  cardStyle: {
                    transform: [
                      {
                        translateX: current.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [layouts.screen.width, 0],
                        }),
                      },
                    ],
                  },
                };
              },
            }}
          >
            <Stack.Screen name="Signin" options={{ title: 'Sign In' }} />
            <Stack.Screen 
              name="SignUp" 
              options={{ 
                title: 'Sign Up',
                cardStyleInterpolator: ({ current }: any) => ({
                  cardStyle: {
                    opacity: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  },
                }),
                transitionSpec: {
                  open: {
                    animation: 'timing',
                    config: {
                      duration: 200,
                    },
                  },
                  close: {
                    animation: 'timing',
                    config: {
                      duration: 200,
                    },
                  },
                },
              }} 
            />
            <Stack.Screen name="Home" options={{ title: 'Home' }} />
            <Stack.Screen 
              name="Profile" 
              options={{ 
                title: 'Profile',
                cardStyleInterpolator: ({ current, layouts }: any) => {
                  return {
                    cardStyle: {
                      transform: [
                        {
                          translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                          }),
                        },
                      ],
                    },
                  };
                },
                transitionSpec: {
                  open: {
                    animation: 'timing',
                    config: {
                      duration: 300,
                    },
                  },
                  close: {
                    animation: 'timing',
                    config: {
                      duration: 300,
                    },
                  },
                },
              }} 
            />
            <Stack.Screen name="MapFinal" options={{ title: 'Music Map' }} />
            <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
          </Stack>
          <StatusBar style="auto" />
        </NavigationProvider>
        </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <InnerApp />
      </Provider>
    </GestureHandlerRootView>
  );
}