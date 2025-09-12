import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePathname, useRouter } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface NavigationContextType {
  currentScreen: string;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  navigateToScreen: (screen: string) => void;
  isReady: boolean;
  clearNavigationState: () => Promise<void>;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const NAVIGATION_STATE_KEY = 'navigation_state';

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentScreen, setCurrentScreen] = useState('Signin');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Save navigation state to AsyncStorage
  const saveNavigationState = async (screen: string, drawerOpen: boolean = false) => {
    try {
      const state = {
        screen,
        drawerOpen,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state));
      console.log('Saved navigation state:', state);
    } catch (error) {
      console.error('Failed to save navigation state:', error);
    }
  };

  // Clear navigation state
  const clearNavigationState = async () => {
    try {
      await AsyncStorage.removeItem(NAVIGATION_STATE_KEY);
      console.log('Cleared navigation state');
    } catch (error) {
      console.error('Failed to clear navigation state:', error);
    }
  };

  // Restore navigation state on app launch
  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedState = await AsyncStorage.getItem(NAVIGATION_STATE_KEY);
        if (savedState) {
          const state = JSON.parse(savedState);
          const now = Date.now();
          
          // Check if state is still valid (24 hours)
          if (now - state.timestamp < 24 * 60 * 60 * 1000) {
            console.log('Restoring navigation state:', state);
            
            // Only restore if not on Signin screen and not expired
            if (state.screen !== 'Signin' && state.screen !== 'SignUp' && !state.screen.startsWith('/Signin') && !state.screen.startsWith('/SignUp')) {
              // Navigate to the saved screen (full path)
              router.replace(state.screen as any);
              setCurrentScreen(state.screen);
              setDrawerOpen(state.drawerOpen);
            }
          } else {
            // State expired, clear it
            await clearNavigationState();
          }
        }
      } catch (error) {
        console.error('Failed to restore navigation state:', error);
      } finally {
        setIsReady(true);
      }
    };

    restoreState();
  }, []);

  // Update current screen when pathname changes
  useEffect(() => {
    if (pathname && isReady) {
      const mainScreen = pathname.split('/')[1] || 'Signin';
      setCurrentScreen(mainScreen);
      
      // Don't save state for Signin/SignUp screens (user signed out)
      if (mainScreen !== 'Signin' && mainScreen !== 'SignUp') {
        // Save the full path for proper restoration
        saveNavigationState(pathname, drawerOpen);
      }
    }
  }, [pathname, drawerOpen, isReady]);

  const navigateToScreen = (screen: string) => {
    setCurrentScreen(screen);
    const fullPath = screen.startsWith('/') ? screen : `/${screen}`;
    saveNavigationState(fullPath, drawerOpen);
    router.push(fullPath as any);
  };

  const handleSetDrawerOpen = (open: boolean) => {
    setDrawerOpen(open);
    saveNavigationState(pathname, open);
  };

  return (
    <NavigationContext.Provider
      value={{
        currentScreen,
        drawerOpen,
        setDrawerOpen: handleSetDrawerOpen,
        navigateToScreen,
        isReady,
        clearNavigationState,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationContext() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigationContext must be used within a NavigationProvider');
  }
  return context;
}
