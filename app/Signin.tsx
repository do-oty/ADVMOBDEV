import ThemedButton from '@/components/ThemedButton';
import ThemedInput from '@/components/ThemedInput';
import { ThemedView } from '@/components/ThemedView';
import { Link, useRouter } from "expo-router";
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SpotifyLoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  return (
    <ThemedView style={styles.container}>
      {/* Spotify Logo */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../Image/Spotify_icon.svg.png')}
          style={styles.logo} 
        />
        <Text style={styles.title}>Spotify</Text>
      </View>

      {/* Username */}
      <ThemedInput placeholder="Username" value={username} onChangeText={setUsername} containerStyle={{ marginBottom: 16, width: '100%' }} />

      {/* Password */}
      <ThemedInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} containerStyle={{ marginBottom: 16, width: '100%' }} />

      {/* Forgot Password */}
      <TouchableOpacity style={styles.forgotWrapper} activeOpacity={0.7}>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <ThemedButton title="Sign In" onPress={() => router.push("/Home/HomePage")} style={{ width: '100%', height: 56, borderRadius: 28 }} />

      {/* Social Logins */}
      <Text style={styles.socialText}>Be Correct With</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
          <Image 
            source={require('../Image/fb_icon.png')} 
            style={styles.socialIcon} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
          <Image 
            source={require('../Image/google_icon.png')} 
            style={styles.socialIcon} 
          />
        </TouchableOpacity>
      </View>

      {/* Sign Up Link */}
      <Text style={styles.signupText}>
        Don&apos;t have an account? <Link href="/SignUp" style={styles.signupLink}>Sign Up</Link>
      </Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  
  forgotWrapper: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 40,
  },
  forgotText: {
    color: '#B3B3B3',
    fontSize: 14,
  },
  
  socialText: {
    color: '#1DB954',
    marginBottom: 20,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 40,
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
  signupText: {
    color: '#B3B3B3',
    fontSize: 14,
  },
  signupLink: {
    color: '#1DB954',
    fontWeight: 'bold',
  },
});