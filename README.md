![ss1](https://github.com/do-oty/ADVMOBDEV/blob/main/ss1.png)
![ss2](https://github.com/do-oty/ADVMOBDEV/blob/main/ss2.png)
![ss3](https://github.com/do-oty/ADVMOBDEV/blob/main/ss3.png)
![ss4](https://github.com/do-oty/ADVMOBDEV/blob/main/ss4.png)
![ss5](https://github.com/do-oty/ADVMOBDEV/blob/main/ss5.png)
![ss6](https://github.com/do-oty/ADVMOBDEV/blob/main/ss6.png)
![ss7](https://github.com/do-oty/ADVMOBDEV/blob/main/ss7.png)
![ss8](https://github.com/do-oty/ADVMOBDEV/blob/main/ss8.png)
![ss9](https://github.com/do-oty/ADVMOBDEV/blob/main/ss9.png)

# Advanced Mobile Development - Week 4-6 Implementation

This React Native application demonstrates advanced mobile development concepts including state management, animations, theming, device features, and location services. The app is built using Expo with React Native and implements all required activities from Weeks 4-6.

## Week 4 Activities

### Activity 1: Spotify Playlist Builder App
**Implementation:** `app/Home/PlaylistBuilder.tsx`

**Features:**
- State Management: Uses `useReducer` for complex playlist state (songs, history, future, input)
- Song Management: Add, remove, clear playlist with undo/redo functionality
- Animations: `react-native-reanimated` with `FadeIn`/`FadeOut` for smooth list updates
- Swipe-to-Delete: `react-native-gesture-handler` Swipeable component for intuitive song removal
- State Persistence: `AsyncStorage` integration for playlist and history persistence across app restarts
- Performance Optimization: `React.memo` for song list components to prevent unnecessary re-renders
- Themed UI: Consistent with app's design system using `ThemedButton`, `ThemedText`, `ThemedView`

### Activity 2: Spotify Profile Creation Form
**Implementation:** `app/SignUp.tsx` (Enhanced existing signup form)

**Features:**
- Real-time Validation: Username (3-20 alphanumeric/underscores), Email (valid format), Genre (predefined list)
- Dynamic Error Messages: Instant feedback with field-specific validation
- Animations: Shake effects on validation failure using `react-native-reanimated`
- Form Caching: `AsyncStorage` integration for auto-fill on app reload
- Dynamic Profile Preview: Real-time preview with genre-specific placeholder images
- Fade-in Animations: Smooth transitions for preview section using `react-native-reanimated`
- Performance Optimization: `React.memo` for preview component

## Week 5 Activities

### Activity 1: Theme Switcher
**Implementation:** `app/Theme.tsx`, Redux store, themed components

**Features:**
- Redux Store: Redux Toolkit for theme state management (light/dark/custom modes)
- Animated Transitions: Color interpolation animations using `react-native-reanimated`
- Custom Theme Options: Color picker for accent colors with live preview
- Theme Persistence: `AsyncStorage` integration for settings persistence
- Comprehensive Theming: All UI elements themed including backgrounds, text, cards, buttons
- Accent Color System: Dynamic accent colors affecting buttons, tab bars, and UI elements

### Activity 2: Camera with Filters
**Implementation:** `app/Camera.tsx`

**Features:**
- Camera Integration: `expo-camera` with capture and toggle functionality
- Real-time Filters: Grayscale and sepia filters using `react-native-color-matrix-image-filters`
- Filter Intensity: Sliders for adjusting filter strength using `@react-native-community/slider`
- Image Editing: Crop and rotate tools using `expo-image-manipulator`
- Performance Optimization: `React.memo` for filter previews
- Themed UI: Consistent design with app's theme system

## Week 6 Activities

### Activity 2: Location-Based Map Features
**Implementation:** `app/MapFinal.tsx`

**Features:**
- Map Integration: `react-native-maps` with custom markers
- Music Venues: Custom markers for music-related points of interest
- Interactive Markers: Tap-to-view details with venue information
- Custom Styling: Themed markers with accent colors
- Map Controls: Zoom and navigation functionality
- No API Key Required: Uses default map tiles for immediate functionality

## Architecture & Technical Implementation

### State Management
- Redux Toolkit: Theme management with persistence
- useReducer: Complex playlist state management
- useState: Local component state
- AsyncStorage: Persistent data storage

### Navigation
- Expo Router: File-based routing system
- Stack Navigation: Screen transitions with custom animations
- Drawer Navigation: Custom drawer with pan gestures
- Tab Navigation: Bottom tab bar with themed styling

### Animations
- react-native-reanimated: Smooth animations and transitions
- react-native-gesture-handler: Gesture recognition and handling
- Custom Animations: Shake effects, fade transitions, color interpolation

### Theming System
- Comprehensive Theming: All UI components support light/dark/custom themes
- Accent Colors: Dynamic color system affecting buttons, tabs, and UI elements
- Themed Components: `ThemedView`, `ThemedText`, `ThemedButton`, `ThemedSurface`, `ThemedInput`
- Color Interpolation: Smooth transitions between theme modes

### Performance Optimizations
- React.memo: Component memoization for expensive operations
- useCallback: Memoized functions to prevent unnecessary re-renders
- Optimized Rendering: Efficient list rendering and state updates

## Key Features

### User Interface
- Modern Design: Clean, Spotify-inspired interface
- Responsive Layout: Adaptive design for different screen sizes
- Gesture Support: Swipe-to-delete, pan gestures, touch interactions
- Accessibility: Proper touch targets and visual feedback

### Data Persistence
- Playlist Storage: Automatic saving of playlist state
- Theme Settings: Persistent theme preferences
- Form Caching: Auto-fill functionality for user convenience
- Navigation State: Restored navigation state on app restart

### Device Integration
- Camera Access: Full camera functionality with filters
- Location Services: Map integration with venue markers
- Haptic Feedback: Touch feedback for interactions
- Platform Optimization: iOS and Android compatibility

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- React Native development environment

### Installation
```bash
npm install
npx expo start
```

### Key Dependencies
- `react-native-reanimated` - Animations
- `react-native-gesture-handler` - Gesture recognition
- `react-native-maps` - Map functionality
- `expo-camera` - Camera integration
- `@reduxjs/toolkit` - State management
- `@react-native-community/slider` - UI controls

## Screenshots

*Add your new screenshots below the existing ones to showcase the implemented features*

## Future Enhancements
- Real-time location tracking
- Advanced geofencing capabilities
- Social features integration
- Offline playlist support
- Advanced camera filters
- Custom map styling

---

**Note**: This implementation demonstrates advanced React Native concepts including state management, animations, theming, device integration, and location services. All features are production-ready and follow React Native best practices.