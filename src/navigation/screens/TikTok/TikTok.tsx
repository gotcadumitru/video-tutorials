import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

const VIDEO_BG =
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=900&q=80";
const AVATAR =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80";
const ALBUM =
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80";

const ACTIONS = [
  { icon: "heart", count: "328.7K", color: "#fe2c55" },
  { icon: "chatbubble-ellipses", count: "4,912", color: "#fff" },
  { icon: "bookmark", count: "23.4K", color: "#fff" },
  { icon: "arrow-redo", count: "18.2K", color: "#fff" },
] as const;

export default function TikTok() {
  const { width, height } = useWindowDimensions();
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 6000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spin]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={{ uri: VIDEO_BG }} style={[styles.video, { width, height: height - 64 }]}>
        <LinearGradient
          colors={["rgba(0,0,0,0.55)", "transparent"]}
          style={styles.topFade}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.bottomFade}
        />

        <View style={styles.topBar}>
          <TouchableOpacity>
            <Ionicons name="tv-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.tabs}>
            <Text style={styles.tabMuted}>Following</Text>
            <View style={styles.tabActiveWrap}>
              <Text style={styles.tabActive}>For You</Text>
              <View style={styles.tabIndicator} />
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.rail}>
          <View style={styles.avatarWrap}>
            <Image source={{ uri: AVATAR }} style={styles.avatar} />
            <View style={styles.followBadge}>
              <Ionicons name="add" size={14} color="#fff" />
            </View>
          </View>

          {ACTIONS.map((action) => (
            <TouchableOpacity key={action.icon} style={styles.action}>
              <Ionicons name={action.icon} size={34} color={action.color} />
              <Text style={styles.actionCount}>{action.count}</Text>
            </TouchableOpacity>
          ))}

          <Animated.View style={[styles.disc, { transform: [{ rotate }] }]}>
            <Image source={{ uri: ALBUM }} style={styles.discArt} />
          </Animated.View>
        </View>

        <View style={styles.meta}>
          <Text style={styles.username}>@luna.creates</Text>
          <Text style={styles.caption}>
            golden hour in the city never gets old ✨ #sunset #citylife #fyp
          </Text>
          <View style={styles.soundRow}>
            <Ionicons name="musical-notes" size={14} color="#fff" />
            <Text style={styles.soundText}>Neon Dreams · Midnight Pulse</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.tabBar}>
        <View style={styles.tabItem}>
          <Ionicons name="home" size={24} color="#fff" />
          <Text style={styles.tabLabelActive}>Home</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons name="people-outline" size={24} color="#8a8a8a" />
          <Text style={styles.tabLabel}>Friends</Text>
        </View>
        <View style={styles.createBtn}>
          <View style={[styles.createGlow, styles.createGlowLeft]} />
          <View style={[styles.createGlow, styles.createGlowRight]} />
          <View style={styles.createCore}>
            <Ionicons name="add" size={22} color="#000" />
          </View>
        </View>
        <View style={styles.tabItem}>
          <Ionicons name="chatbox-ellipses-outline" size={24} color="#8a8a8a" />
          <Text style={styles.tabLabel}>Inbox</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="#8a8a8a" />
          <Text style={styles.tabLabel}>Profile</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },
  video: {},
  topFade: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  bottomFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 280,
  },
  topBar: {
    marginTop: 58,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tabs: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  tabMuted: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 16,
    fontWeight: "600",
  },
  tabActiveWrap: {
    alignItems: "center",
  },
  tabActive: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
  tabIndicator: {
    marginTop: 5,
    width: 28,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#fff",
  },
  rail: {
    position: "absolute",
    right: 10,
    bottom: 96,
    alignItems: "center",
    gap: 20,
  },
  avatarWrap: {
    marginBottom: 2,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  followBadge: {
    position: "absolute",
    bottom: -9,
    alignSelf: "center",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fe2c55",
    alignItems: "center",
    justifyContent: "center",
  },
  action: {
    alignItems: "center",
    gap: 3,
  },
  actionCount: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  disc: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#1c1c1c",
    borderWidth: 6,
    borderColor: "#2e2e2e",
    alignItems: "center",
    justifyContent: "center",
  },
  discArt: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  meta: {
    position: "absolute",
    left: 16,
    right: 84,
    bottom: 24,
    gap: 8,
  },
  username: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
  },
  caption: {
    color: "rgba(255,255,255,0.92)",
    fontSize: 14,
    lineHeight: 20,
  },
  soundRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  soundText: {
    color: "#fff",
    fontSize: 13,
  },
  tabBar: {
    height: 64,
    backgroundColor: "#000",
    borderTopWidth: 0.5,
    borderTopColor: "#262626",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 8,
  },
  tabItem: {
    alignItems: "center",
    gap: 3,
    width: 56,
  },
  tabLabel: {
    color: "#8a8a8a",
    fontSize: 10,
    fontWeight: "600",
  },
  tabLabelActive: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  createBtn: {
    width: 48,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  createGlow: {
    position: "absolute",
    width: 42,
    height: 30,
    borderRadius: 9,
  },
  createGlowLeft: {
    left: 0,
    backgroundColor: "#25f4ee",
  },
  createGlowRight: {
    right: 0,
    backgroundColor: "#fe2c55",
  },
  createCore: {
    width: 42,
    height: 30,
    borderRadius: 9,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
