import ThemedButton from '@/components/ThemedButton';
import ThemedInput from '@/components/ThemedInput';
import ThemedSurface from '@/components/ThemedSurface';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAccentColor } from '@/hooks/useAccentColor';
import { loadJSON, saveJSON } from '@/hooks/usePersistentStorage';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Link } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

// Validation functions
const validateUsername = (username: string): string | null => {
  if (username.length < 3) return 'Username must be at least 3 characters';
  if (username.length > 20) return 'Username must be 20 characters or less';
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Username can only contain letters, numbers, and underscores';
  return null;
};

const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return null;
};

const GENRES = ['Pop', 'Rock', 'Jazz', 'Classical', 'Hip-Hop'];

type FormData = {
  username: string;
  email: string;
  genre: string;
};

const ProfilePreview = React.memo(function ProfilePreview({ username, email, genre }: FormData) {
  const accent = useAccentColor();
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const mutedTextColor = useThemeColor({}, 'mutedText');

  const genreImageUrl = `https://via.placeholder.com/100?text=${encodeURIComponent(genre || 'Music')}`;

  return (
    <Animated.View entering={FadeIn} style={styles.previewContainer}>
      <ThemedSurface style={[styles.previewCard, { backgroundColor: cardColor }]}>
        <Image source={{ uri: genreImageUrl }} style={styles.previewImage} />
        <View style={styles.previewInfo}>
          <ThemedText style={[styles.previewUsername, { color: textColor }]}>
            {username || 'Your Username'}
          </ThemedText>
          <ThemedText style={[styles.previewEmail, { color: mutedTextColor }]}>
            {email || 'your.email@example.com'}
          </ThemedText>
          <ThemedText style={[styles.previewGenre, { color: accent }]}>
            {genre || 'Select Genre'}
          </ThemedText>
        </View>
      </ThemedSurface>
    </Animated.View>
  );
});

export default function SignUpScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [genre, setGenre] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword] = useState(false);
  const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const [gender, setGender] = useState('');

  // Validation states
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [genreError, setGenreError] = useState<string | null>(null);

  // Animation values
  const usernameShake = useSharedValue(0);
  const emailShake = useSharedValue(0);
  const genreShake = useSharedValue(0);

  const accent = useAccentColor();
  const textColor = useThemeColor({}, 'text');
  const mutedTextColor = useThemeColor({}, 'mutedText');
  const borderColor = useThemeColor({}, 'border');

  // Load cached form data on mount
  useEffect(() => {
    const loadCachedData = async () => {
      const cached = await loadJSON<FormData>('profile_form_cache', { username: '', email: '', genre: '' });
      setUsername(cached.username);
      setEmail(cached.email);
      setGenre(cached.genre);
    };
    void loadCachedData();
  }, []);

  // Cache form data on change
  useEffect(() => {
    const cacheData = async () => {
      await saveJSON('profile_form_cache', { username, email, genre });
    };
    void cacheData();
  }, [username, email, genre]);

  // Real-time validation handlers
  const handleUsernameChange = useCallback((text: string) => {
    setUsername(text);
    const error = validateUsername(text);
    setUsernameError(error);
    if (error) {
      usernameShake.value = withRepeat(
        withSequence(
          withTiming(10, { duration: 50 }),
          withTiming(-10, { duration: 50 }),
          withTiming(10, { duration: 50 }),
          withTiming(0, { duration: 50 })
        ),
        1,
        false
      );
    }
  }, [usernameShake]);

  const handleEmailChange = useCallback((text: string) => {
    setEmail(text);
    const error = validateEmail(text);
    setEmailError(error);
    if (error) {
      emailShake.value = withRepeat(
        withSequence(
          withTiming(10, { duration: 50 }),
          withTiming(-10, { duration: 50 }),
          withTiming(10, { duration: 50 }),
          withTiming(0, { duration: 50 })
        ),
        1,
        false
      );
    }
  }, [emailShake]);

  const handleGenreSelect = useCallback((selectedGenre: string) => {
    setGenre(selectedGenre);
    setGenreError(null);
  }, []);

  // Animated styles for shake effects
  const usernameAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: usernameShake.value }],
  }));

  const emailAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: emailShake.value }],
  }));

  const genreAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: genreShake.value }],
  }));

  // Form submission
  const handleSubmit = useCallback(async () => {
    const usernameErr = validateUsername(username);
    const emailErr = validateEmail(email);
    const genreErr = !genre ? 'Please select a genre' : null;

    setUsernameError(usernameErr);
    setEmailError(emailErr);
    setGenreError(genreErr);

    if (usernameErr || emailErr || genreErr) {
      // Shake animations for errors
      if (usernameErr) usernameShake.value = withRepeat(withSequence(withTiming(10, { duration: 50 }), withTiming(-10, { duration: 50 }), withTiming(0, { duration: 50 })), 2, false);
      if (emailErr) emailShake.value = withRepeat(withSequence(withTiming(10, { duration: 50 }), withTiming(-10, { duration: 50 }), withTiming(0, { duration: 50 })), 2, false);
      if (genreErr) genreShake.value = withRepeat(withSequence(withTiming(10, { duration: 50 }), withTiming(-10, { duration: 50 }), withTiming(0, { duration: 50 })), 2, false);
      return;
    }

    // Clear cache and reset form on successful submission
    await saveJSON('profile_form_cache', { username: '', email: '', genre: '' });
    setUsername('');
    setEmail('');
    setGenre('');
    setUsernameError(null);
    setEmailError(null);
    setGenreError(null);
    
    // Show success message
    alert('Profile created successfully!');
  }, [username, email, genre, usernameShake, emailShake, genreShake]);

  const isFormValid = useMemo(() => {
    return username.length >= 3 && 
           email.includes('@') && 
           genre.length > 0 && 
           !usernameError && 
           !emailError && 
           !genreError;
  }, [username, email, genre, usernameError, emailError, genreError]);

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Logo + Title */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../Image/Spotify_icon.svg.png')}  
            style={styles.logo} 
          />
          <ThemedText style={styles.title}>Spotify</ThemedText>
        </View>

        {/* Profile Creation Form */}
        <View style={styles.formSection}>
          <ThemedText style={styles.sectionTitle}>Create Your Profile</ThemedText>
          
          {/* Username */}
          <View style={styles.inputContainer}>
            <Animated.View style={usernameAnimatedStyle}>
              <ThemedInput 
                placeholder="Username (3-20 characters)" 
                value={username} 
                onChangeText={handleUsernameChange}
                containerStyle={[styles.input, usernameError && styles.inputError]}
              />
            </Animated.View>
            {usernameError && (
              <Animated.View entering={FadeIn} style={styles.errorContainer}>
                <ThemedText style={styles.errorText}>{usernameError}</ThemedText>
              </Animated.View>
            )}
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Animated.View style={emailAnimatedStyle}>
              <ThemedInput 
                placeholder="Email Address" 
                value={email} 
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                containerStyle={[styles.input, emailError && styles.inputError]}
              />
            </Animated.View>
            {emailError && (
              <Animated.View entering={FadeIn} style={styles.errorContainer}>
                <ThemedText style={styles.errorText}>{emailError}</ThemedText>
              </Animated.View>
            )}
          </View>

          {/* Genre Selection */}
          <View style={styles.inputContainer}>
            <ThemedText style={styles.genreLabel}>Favorite Genre</ThemedText>
            <Animated.View style={[styles.genreContainer, genreAnimatedStyle]}>
              {GENRES.map((genreOption) => (
                <TouchableOpacity
                  key={genreOption}
                  style={[
                    styles.genreOption,
                    genre === genreOption && styles.genreSelected,
                    { borderColor: genre === genreOption ? accent : borderColor }
                  ]}
                  onPress={() => handleGenreSelect(genreOption)}
                >
                  <ThemedText style={[
                    styles.genreText,
                    { color: genre === genreOption ? accent : textColor }
                  ]}>
                    {genreOption}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </Animated.View>
            {genreError && (
              <Animated.View entering={FadeIn} style={styles.errorContainer}>
                <ThemedText style={styles.errorText}>{genreError}</ThemedText>
              </Animated.View>
            )}
          </View>

          {/* Profile Preview */}
          {(username || email || genre) && (
            <ProfilePreview username={username} email={email} genre={genre} />
          )}

          {/* Submit Button */}
          <ThemedButton 
            title="Create Profile" 
            onPress={handleSubmit}
            style={[styles.submitButton, !isFormValid && styles.submitButtonDisabled]}
            disabled={!isFormValid}
          />
        </View>

        {/* Original Form Fields (Password, DOB, Gender) */}
        <View style={styles.originalFormSection}>
          <ThemedText style={styles.sectionTitle}>Additional Information</ThemedText>
          
          {/* Password */}
          <ThemedInput placeholder="Password" secureTextEntry={!showPassword} value={password} onChangeText={setPassword} containerStyle={styles.input} />

          {/* Date of Birth */}
          <ThemedText style={styles.dobLabel}>Date Of Birth :</ThemedText>
          <View style={styles.dobContainer}>
            <ThemedInput style={{ textAlign: 'center' }} containerStyle={{ width: '30%' }} placeholder="DD" keyboardType="numeric" maxLength={2} value={dob.day} onChangeText={(text) => setDob({ ...dob, day: text })} />
            <ThemedInput style={{ textAlign: 'center' }} containerStyle={{ width: '30%' }} placeholder="MM" keyboardType="numeric" maxLength={2} value={dob.month} onChangeText={(text) => setDob({ ...dob, month: text })} />
            <ThemedInput style={{ textAlign: 'center' }} containerStyle={{ width: '30%' }} placeholder="YY" keyboardType="numeric" maxLength={2} value={dob.year} onChangeText={(text) => setDob({ ...dob, year: text })} />
          </View>

          {/* Gender */}
          <View style={styles.genderContainer}>
            <TouchableOpacity 
              style={styles.genderOption}
              onPress={() => setGender('male')}
            >
              <View style={[styles.radioCircle, gender === 'male' && styles.radioSelected]} />
              <ThemedText style={styles.genderText}>Male</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.genderOption}
              onPress={() => setGender('female')}
            >
              <View style={[styles.radioCircle, gender === 'female' && styles.radioSelected]} />
              <ThemedText style={styles.genderText}>Female</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Social */}
        <View style={styles.socialSection}>
          <ThemedText style={styles.socialText}>Sign Up With</ThemedText>
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image 
                source={require('../Image/fb_icon.png')} 
                style={styles.socialIcon} 
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image 
                source={require('../Image/google_icon.png')} 
                style={styles.socialIcon} 
              />
            </TouchableOpacity>
          </View>

          {/* Already have account */}
          <ThemedText style={styles.signinText}>
            Already have an account? <Link href="/Signin" style={styles.signinLink}>Sign In</Link>
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { 
    paddingHorizontal: 24, 
    paddingTop: 60, 
    paddingBottom: 40,
    minHeight: '100%'
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 12,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  
  // Form sections
  formSection: {
    marginBottom: 24,
  },
  originalFormSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  
  // Input styling
  inputContainer: {
    marginBottom: 12,
  },
  input: {
    width: '100%',
    marginBottom: 4,
  },
  inputError: {
    borderColor: '#FF6B6B',
    borderWidth: 2,
  },
  
  // Error styling
  errorContainer: {
    marginTop: 4,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    fontWeight: '500',
  },
  
  // Genre selection
  genreLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#666666',
  },
  genreSelected: {
    backgroundColor: 'rgba(29, 185, 84, 0.1)',
  },
  genreText: {
    fontSize: 14,
    fontWeight: '500',
  },
  
  // Profile preview
  previewContainer: {
    marginVertical: 16,
  },
  previewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  previewImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  previewInfo: {
    flex: 1,
  },
  previewUsername: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  previewEmail: {
    fontSize: 12,
    marginBottom: 2,
  },
  previewGenre: {
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Submit button
  submitButton: {
    width: '100%',
    height: 48,
    borderRadius: 24,
    marginTop: 16,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  
  // Original form fields
  dobLabel: {
    color: '#1DB954',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginLeft: 5,
  },
  dobContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#666666',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioSelected: {
    backgroundColor: '#1DB954',
    borderColor: '#1DB954',
  },
  genderText: {
    color: '#1DB954',
    fontSize: 16,
  },
  
  // Social section
  socialSection: {
    alignItems: 'center',
    marginTop: 16,
  },
  socialText: {
    color: '#1DB954',
    marginBottom: 16,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 24,
  },
  socialButton: {
    width: 50,
    height: 50,
    backgroundColor: '#282828',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
  signinText: {
    color: '#B3B3B3',
    fontSize: 14,
  },
  signinLink: {
    color: '#1DB954',
    fontWeight: 'bold',
  },
});