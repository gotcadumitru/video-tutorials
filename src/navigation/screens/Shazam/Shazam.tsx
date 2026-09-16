import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const RECENTS = [
  {
    title: "Neon Skyline",
    artist: "Midnight Pulse",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80",
  },
  {
    title: "Static Love",
    artist: "Nova Ray",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80",
  },
  {
    title: "Afterglow",
    artist: "Echo Delta",
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&q=80",
  },
];

export default function Shazam() {
  const pulseA = useRef(new Animated.Value(0)).current;
  const pulseB = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const run = (value: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.timing(value, {
          toValue: 1,
          duration: 2200,
          delay,
          useNativeDriver: true,
        })
      ).start();
    run(pulseA, 0);
    run(pulseB, 1100);
  }, [pulseA, pulseB]);

  const ringStyle = (value: Animated.Value) => ({
    opacity: value.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0] }),
    transform: [
      {
        scale: value.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.9],
        }),
      },
    ],
  });

  return (
    <LinearGradient colors={["#03102e", "#062463", "#0b45b8"]} style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="person-outline" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shazam</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="settings-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.center}>
        <Animated.View style={[styles.ring, ringStyle(pulseA)]} />
        <Animated.View style={[styles.ring, ringStyle(pulseB)]} />
        <TouchableOpacity style={styles.button}>
          <MaterialCommunityIcons name="waveform" size={72} color="#0b45b8" />
        </TouchableOpacity>
      </View>
      <Text style={styles.hint}>Tap to Shazam</Text>

      <View style={styles.sheet}>
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>Recent Shazams</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recents}
        >
          {RECENTS.map((song) => (
            <View key={song.title} style={styles.songCard}>
              <Image source={{ uri: song.image }} style={styles.songArt} />
              <Text style={styles.songTitle}>{song.title}</Text>
              <Text style={styles.songArtist}>{song.artist}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    marginTop: 58,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  center: {
    marginTop: 70,
    alignItems: "center",
    justifyContent: "center",
    height: 220,
  },
  ring: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  button: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 14,
  },
  hint: {
    marginTop: 26,
    textAlign: "center",
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  sheet: {
    marginTop: "auto",
    backgroundColor: "rgba(2,10,32,0.85)",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingTop: 20,
    paddingBottom: 40,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  sheetTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
  seeAll: {
    color: "#6ea8ff",
    fontSize: 13,
    fontWeight: "600",
  },
  recents: {
    paddingHorizontal: 20,
    paddingTop: 14,
    gap: 14,
  },
  songCard: {
    width: 110,
    gap: 3,
  },
  songArt: {
    width: 110,
    height: 110,
    borderRadius: 14,
    marginBottom: 5,
  },
  songTitle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  songArtist: {
    color: "#8fa3c8",
    fontSize: 12,
  },
});
