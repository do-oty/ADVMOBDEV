import { createDrawerNavigator } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Drawer = createDrawerNavigator();

function ProfileScreen() {
  const user = {
    name: "Not a cat",
    email: "not_a_cat@gmail.com",
    profilePic: require("../../Image/profile.gif"),
  };

  return (
    <View style={styles.profileContainer}>
      <Image source={user.profilePic} style={styles.profile} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
    </View>
  );
}

function SettingsScreen() {
  const router = useRouter();

  return (
    <View style={styles.center}>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => router.replace("/Signin")}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

function PlaylistScreen() {
  const playlists = [
    {
      id: "1",
      title: "The Black Parade",
      artist: "My Chemical Romance",
      cover: require("../../Image/mcr.jpg"),
    },
    {
      id: "2",
      title: "My Beautiful Dark Twisted Fantasy",
      artist: "Kanye West",
      cover: require("../../Image/mbdtf.jpg"),
    },
    {
      id: "3",
      title: "In Tongues",
      artist: "Joji",
      cover: require("../../Image/joji.jpg"),
    },
    {
      id: "4",
      title: "The College Dropout",
      artist: "Kanye West",
      cover: require("../../Image/kanye.webp"),
    },
    {
      id: "5",
      title: "Late Registration",
      artist: "Kanye West",
      cover: require("../../Image/lopt.jpg"),
    },
    {
      id: "6",
      title: "Graduation",
      artist: "Kanye West",
      cover: require("../../Image/graduation.jpg"),
    },
    {
      id: "7",
      title: "808s & Heartbreak",
      artist: "Kanye West",
      cover: require("../../Image/Ye.jpg"),
    },
    {
      id: "8",
      title: "Yeezus",
      artist: "Kanye West",
      cover: require("../../Image/nectar.jpg"),
    },
  ];

  return (
    <View style={styles.center}>
      <Text style={styles.playlistHeader}>Your Library</Text>
      <Text style={styles.playlistSubheader}>Recently played albums</Text>
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.playlistCardAlt}>
            <View style={styles.playlistImageContainer}>
              <Image source={item.cover} style={styles.playlistCover} />
            </View>
            <View style={styles.playlistInfo}>
              <Text style={styles.playlistTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.playlistArtist} numberOfLines={1}>{item.artist}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.playlistGrid}
      />
    </View>
  );
}

export default function HomePage() {
  return (
    <Drawer.Navigator
      initialRouteName="Profile"
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#000000",
          width: 290,
          borderTopRightRadius: 40,
          borderBottomRightRadius: 40,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          shadowColor: "#1DB954",
          shadowOpacity: 0.3,
          shadowRadius: 10,
          elevation: 10,
        },
        drawerActiveTintColor: "#1DB954",
        drawerInactiveTintColor: "#b0b0b0",
        drawerActiveBackgroundColor: "#121212",
        drawerLabelStyle: {
          fontSize: 20,
          fontWeight: "900",
          letterSpacing: 1,
          marginLeft: -10,
        },
        headerStyle: {
          backgroundColor: "#000000",
          borderBottomWidth: 0,
          shadowColor: "transparent",
        },
        headerTintColor: "#1DB954",
        headerTitleAlign: "center",
      }}
    >
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Your Library" component={PlaylistScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 20,
  },
  profile: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 20,
    borderWidth: 4,
    borderColor: "#1DB954",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: "#B3B3B3",
    textAlign: "center",
    marginBottom: 30,
  },
  logoutButton: {
    marginTop: 40,
    padding: 15,
    backgroundColor: "#1DB954",
    borderRadius: 25,
    alignItems: "center",
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  playlistHeader: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "left",
  },
  playlistSubheader: {
    fontSize: 14,
    color: "#B3B3B3",
    marginBottom: 20,
    textAlign: "left",
  },
  playlistGrid: {
    paddingBottom: 20,
  },
  playlistCardAlt: {
    flex: 1,
    margin: 8,
    backgroundColor: "#282828",
    borderRadius: 8,
    padding: 12,
    maxWidth: '45%',
  },
  playlistImageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  playlistCover: {
    width: '100%',
    height: '100%',
  },
  playlistInfo: {
    flex: 1,
  },
  playlistTitle: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 4,
  },
  playlistArtist: {
    fontSize: 12,
    color: "#B3B3B3",
  },
});