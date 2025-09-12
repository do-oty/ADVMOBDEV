import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword] = useState(false);
  const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const [gender, setGender] = useState('');

  return (
    <View style={styles.container}>
      {/* Logo + Title */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../Image/Spotify_icon.svg.png')}  
          style={styles.logo} 
        />
        <Text style={styles.title}>Spotify</Text>
      </View>

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Full Name */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#666"
        value={fullName}
        onChangeText={setFullName}
      />

      {/* Password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
      />

      {/* Date of Birth */}
      <Text style={styles.dobLabel}>Date Of Birth :</Text>
      <View style={styles.dobContainer}>
        <TextInput
          style={styles.dobInput}
          placeholder="DD"
          placeholderTextColor="#666"
          keyboardType="numeric"
          maxLength={2}
          value={dob.day}
          onChangeText={(text) => setDob({ ...dob, day: text })}
        />
        <TextInput
          style={styles.dobInput}
          placeholder="MM"
          placeholderTextColor="#666"
          keyboardType="numeric"
          maxLength={2}
          value={dob.month}
          onChangeText={(text) => setDob({ ...dob, month: text })}
        />
        <TextInput
          style={styles.dobInput}
          placeholder="YY"
          placeholderTextColor="#666"
          keyboardType="numeric"
          maxLength={2}
          value={dob.year}
          onChangeText={(text) => setDob({ ...dob, year: text })}
        />
      </View>

      {/* Gender */}
      <View style={styles.genderContainer}>
        <TouchableOpacity 
          style={styles.genderOption}
          onPress={() => setGender('male')}
        >
          <View style={[styles.radioCircle, gender === 'male' && styles.radioSelected]} />
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.genderOption}
          onPress={() => setGender('female')}
        >
          <View style={[styles.radioCircle, gender === 'female' && styles.radioSelected]} />
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Social */}
      <Text style={styles.socialText}>Sign Up With</Text>
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
      <Text style={styles.signinText}>
        Already have an account? <Link href="/Signin" style={styles.signinLink}>Sign In</Link>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 15,
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
    marginBottom: 20,
  },
  dobInput: {
    width: '30%',
    height: 56,
    backgroundColor: '#282828',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#404040',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
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
  signUpButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#1DB954',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  signUpText: {
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
  signinText: {
    color: '#B3B3B3',
    fontSize: 14,
  },
  signinLink: {
    color: '#1DB954',
    fontWeight: 'bold',
  },
});