import React from "react";
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const VIEWFINDER =
  "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=900&q=80";
const AVATAR =
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&q=80";

const LENSES = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
];

export default function Snapchat() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={{ uri: VIEWFINDER }} style={styles.camera}>
        <View style={styles.topBar}>
          <View style={styles.topLeft}>
            <Image source={{ uri: AVATAR }} style={styles.profile} />
            <View style={styles.searchBtn}>
              <Ionicons name="search" size={20} color="#fff" />
            </View>
          </View>
          <View style={styles.toolRail}>
            <TouchableOpacity style={styles.tool}>
              <Ionicons name="camera-reverse-outline" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tool}>
              <Ionicons name="flash-off" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tool}>
              <MaterialCommunityIcons
                name="music-note"
                size={22}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tool}>
              <MaterialCommunityIcons
                name="moon-waning-crescent"
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.shutterZone}>
          <TouchableOpacity>
            <Ionicons name="images-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <View style={styles.shutter} />
          <View style={styles.lenses}>
            {LENSES.map((lens) => (
              <Image key={lens} source={{ uri: lens }} style={styles.lens} />
            ))}
          </View>
        </View>
      </ImageBackground>

      <View style={styles.tabBar}>
        <View style={styles.tabItem}>
          <Ionicons name="location-outline" size={24} color="#9ca3af" />
          <Text style={styles.tabLabel}>Map</Text>
        </View>
        <View style={styles.tabItem}>
          <View>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color="#9ca3af"
            />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </View>
          <Text style={styles.tabLabel}>Chat</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons name="camera" size={26} color="#fffc00" />
          <Text style={[styles.tabLabel, styles.tabLabelOn]}>Snap</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons name="people-outline" size={24} color="#9ca3af" />
          <Text style={styles.tabLabel}>Stories</Text>
        </View>
        <View style={styles.tabItem}>
          <Ionicons name="play-outline" size={24} color="#9ca3af" />
          <Text style={styles.tabLabel}>Spotlight</Text>
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
  camera: {
    flex: 1,
  },
  topBar: {
    marginTop: 58,
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topLeft: {
    flexDirection: "row",
    gap: 10,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.6)",
  },
  searchBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  toolRail: {
    backgroundColor: "rgba(0,0,0,0.35)",
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 8,
    gap: 16,
    alignItems: "center",
  },
  tool: {
    alignItems: "center",
  },
  shutterZone: {
    marginTop: "auto",
    marginBottom: 18,
    paddingHorizontal: 34,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  shutter: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 5.5,
    borderColor: "#fff",
  },
  lenses: {
    flexDirection: "row",
    gap: 6,
  },
  lens: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.7)",
  },
  tabBar: {
    height: 74,
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 10,
  },
  tabItem: {
    alignItems: "center",
    gap: 3,
  },
  tabLabel: {
    color: "#9ca3af",
    fontSize: 10,
    fontWeight: "700",
  },
  tabLabelOn: {
    color: "#fffc00",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: "#00a2ff",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
  },
});
