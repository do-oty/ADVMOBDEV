import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigationContext } from '@/contexts/NavigationContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { clearNavigationState } = useNavigationContext();

  const handleSignOut = async () => {
    try {
      console.log('Profile sign out pressed');
      await clearNavigationState();
      console.log('Navigation state cleared from profile');
      router.push('/Signin');
      console.log('Navigated to Signin from profile');
    } catch (error) {
      console.error('Error signing out from profile:', error);
    }
  };

  const settingsItems = [
    { title: 'Account', icon: 'person', description: 'Manage your account settings' },
    { title: 'Privacy', icon: 'shield-checkmark', description: 'Control your privacy settings' },
    { title: 'Notifications', icon: 'notifications', description: 'Manage notification preferences' },
    { title: 'Playback', icon: 'play-circle', description: 'Audio quality and playback settings' },
    { title: 'Social', icon: 'people', description: 'Connect with friends and followers' },
    { title: 'Devices', icon: 'phone-portrait', description: 'Manage connected devices' },
    { title: 'Storage', icon: 'folder', description: 'Manage offline downloads' },
    { title: 'About', icon: 'information-circle', description: 'App version and legal info' },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <ThemedText style={styles.title}>Profile & Settings</ThemedText>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImage}>
            <Image 
              source={require('@/Image/profile.gif')} 
              style={styles.profileImageContent}
              resizeMode="cover"
            />
          </View>
          <ThemedText style={styles.profileName}>not_a_cat</ThemedText>
          <ThemedText style={styles.profileEmail}>not_a_cat@gmail.com</ThemedText>
        </View>

        {/* Settings Items */}
        <View style={styles.settingsContainer}>
          {settingsItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.settingItem}
              activeOpacity={0.7}
            >
              <View style={styles.settingIcon}>
                <Ionicons name={item.icon as any} size={24} color="#1DB954" />
              </View>
              <View style={styles.settingInfo}>
                <ThemedText style={styles.settingTitle}>{item.title}</ThemedText>
                <ThemedText style={styles.settingDescription}>{item.description}</ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut} activeOpacity={0.7}>
          <Ionicons name="log-out" size={24} color="#FF6B6B" />
          <ThemedText style={styles.logoutText}>Sign Out</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#282828',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#282828',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  profileImageContent: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#B3B3B3',
  },
  settingsContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#121212',
    borderRadius: 12,
  },
  settingIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#B3B3B3',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    marginTop: 32,
    marginBottom: 40,
    paddingVertical: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
    marginLeft: 8,
  },
});
