import { Link, useRouter } from "expo-router";
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SpotifyLoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      {/* Spotify Logo */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../Image/Spotify_icon.svg.png')}
          style={styles.logo} 
        />
        <Text style={styles.title}>Spotify</Text>
      </View>

      {/* Username */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#666"
        value={username}
        onChangeText={setUsername}
      />

      {/* Password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Forgot Password */}
      <TouchableOpacity style={styles.forgotWrapper} activeOpacity={0.7}>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton} onPress={() => router.push("/Home/HomePage")}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
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
  input: {
    width: '100%',
    height: 56,
    backgroundColor: '#282828',
    borderRadius: 8,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#404040',
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
  signInButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#1DB954',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  signInText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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