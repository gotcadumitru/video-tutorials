import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

type Profile = {
  name: string;
  age: number;
  bio: string;
  distance: string;
  job: string;
  city: string;
  passions: string[];
  photo: string;
  photoCount: number;
  activePhoto: number;
};

const TOP: Profile = {
  name: "Amelia",
  age: 27,
  bio: "Photographer chasing storms · golden hour evangelist",
  distance: "2 miles away",
  job: "Senior Photographer at Verge",
  city: "Brooklyn, NY",
  passions: ["Film cameras", "Hiking", "Vinyl", "Pasta"],
  photo:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=80",
  photoCount: 5,
  activePhoto: 2,
};

const BEHIND: Profile[] = [
  {
    name: "Maya",
    age: 26,
    bio: "",
    distance: "",
    job: "",
    city: "",
    passions: [],
    photoCount: 0,
    activePhoto: 0,
    photo:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=900&q=80",
  },
  {
    name: "Eva",
    age: 29,
    bio: "",
    distance: "",
    job: "",
    city: "",
    passions: [],
    photoCount: 0,
    activePhoto: 0,
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=80",
  },
];

export default function Tinder() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* Top header */}
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={32} color="#71767b" />
        <View style={styles.flameWrap}>
          <MaterialCommunityIcons name="fire" size={32} color="#FE3C72" />
        </View>
        <Ionicons name="chatbubble-ellipses" size={28} color="#71767b" />
      </View>

      <View style={styles.tabs}>
        <Text style={styles.tabActive}>Discover</Text>
        <Text style={styles.tabInactive}>Picks</Text>
        <Text style={styles.tabInactive}>Likes</Text>
      </View>

      {/* Card stack */}
      <View style={styles.stack}>
        {BEHIND.slice().reverse().map((p, i) => (
          <View
            key={p.name}
            style={[
              styles.cardBehind,
              {
                transform: [
                  { scale: 1 - (BEHIND.length - i) * 0.04 },
                  { translateY: (BEHIND.length - i) * 8 },
                ],
                opacity: 0.5 - (BEHIND.length - i) * 0.15,
              },
            ]}
          >
            <Image source={{ uri: p.photo }} style={styles.cardImg} />
          </View>
        ))}

        <View style={styles.card}>
          <ImageBackground source={{ uri: TOP.photo }} style={styles.cardImgBg}>
            {/* photo indicators */}
            <View style={styles.photoBars}>
              {Array.from({ length: TOP.photoCount }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.photoBar,
                    { backgroundColor: i === TOP.activePhoto ? "#fff" : "rgba(255,255,255,0.4)" },
                  ]}
                />
              ))}
            </View>

            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.85)"]}
              locations={[0.55, 1]}
              style={StyleSheet.absoluteFill}
            />

            <View style={styles.cardBody}>
              <View style={styles.distancePill}>
                <Ionicons name="location" size={11} color="#fff" />
                <Text style={styles.distanceTxt}>{TOP.distance}</Text>
              </View>

              <View style={styles.nameRow}>
                <Text style={styles.name}>{TOP.name}</Text>
                <Text style={styles.age}>{TOP.age}</Text>
                <View style={styles.verifiedBlue}>
                  <Ionicons name="checkmark" size={11} color="#fff" />
                </View>
              </View>

              <View style={styles.metaRow}>
                <Ionicons name="briefcase-outline" size={13} color="#fff" />
                <Text style={styles.metaTxt}>{TOP.job}</Text>
              </View>
              <View style={styles.metaRow}>
                <Ionicons name="home-outline" size={13} color="#fff" />
                <Text style={styles.metaTxt}>{TOP.city}</Text>
              </View>

              <Text style={styles.bio}>{TOP.bio}</Text>

              <View style={styles.passionRow}>
                {TOP.passions.map((p) => (
                  <View key={p} style={styles.passionPill}>
                    <Text style={styles.passionTxt}>{p}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity style={styles.infoBtn}>
                <Ionicons name="information-circle" size={28} color="#fff" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </View>

      {/* Action buttons */}
      <View style={styles.actions}>
        <ActionBtn icon="refresh" color="#FFC629" lib="ion" size={24} />
        <ActionBtn icon="close" color="#FE5268" lib="ion" size={32} big />
        <ActionBtn icon="star" color="#1CE0FF" lib="ion" size={26} />
        <ActionBtn icon="heart" color="#3DD774" lib="ion" size={32} big />
        <ActionBtn icon="flash" color="#A75DFF" lib="ion" size={24} />
      </View>
    </View>
  );
}

function ActionBtn({
  icon,
  color,
  lib = "ion",
  size = 24,
  big,
}: {
  icon: string;
  color: string;
  lib?: "ion" | "mci";
  size?: number;
  big?: boolean;
}) {
  return (
    <TouchableOpacity style={[styles.actionBtn, big && styles.actionBig]}>
      {lib === "mci" ? (
        <MaterialCommunityIcons name={icon as any} size={size} color={color} />
      ) : (
        <Ionicons name={icon as any} size={size} color={color} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 6,
  },
  flameWrap: { alignItems: "center" },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 22,
    paddingBottom: 10,
  },
  tabActive: { color: "#fff", fontSize: 17, fontWeight: "800" },
  tabInactive: { color: "#71767b", fontSize: 17, fontWeight: "600" },

  stack: {
    flex: 1,
    paddingHorizontal: 14,
    paddingBottom: 12,
  },
  cardBehind: {
    position: "absolute",
    left: 14,
    right: 14,
    top: 0,
    bottom: 12,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#222",
  },
  card: {
    flex: 1,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#222",
    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  cardImg: { width: "100%", height: "100%" },
  cardImgBg: { flex: 1, justifyContent: "space-between" },
  photoBars: {
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  photoBar: {
    flex: 1,
    height: 3,
    borderRadius: 2,
  },
  cardBody: { padding: 18 },
  distancePill: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  distanceTxt: { color: "#fff", fontSize: 12, fontWeight: "600" },
  nameRow: { flexDirection: "row", alignItems: "flex-end", gap: 8 },
  name: { color: "#fff", fontSize: 32, fontWeight: "800" },
  age: { color: "#fff", fontSize: 28, fontWeight: "300", marginBottom: 2 },
  verifiedBlue: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#1d9bf0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  metaTxt: { color: "#fff", fontSize: 14 },
  bio: { color: "#fff", fontSize: 14, marginTop: 10, lineHeight: 18 },
  passionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 12,
  },
  passionPill: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  passionTxt: { color: "#fff", fontSize: 12, fontWeight: "600" },
  infoBtn: { position: "absolute", right: 14, bottom: 14 },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    paddingBottom: 28,
    paddingTop: 12,
  },
  actionBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0f0f0f",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1f1f1f",
  },
  actionBig: { width: 64, height: 64, borderRadius: 32 },
});
