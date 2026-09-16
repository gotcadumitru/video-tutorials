import React from "react";
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const NIGHT_SKY =
  "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=900&q=80";

const SOUNDS = [
  { icon: "weather-pouring", name: "Rain", active: false },
  { icon: "waves", name: "Ocean", active: true },
  { icon: "fire", name: "Fireplace", active: false },
  { icon: "pine-tree", name: "Forest", active: false },
  { icon: "waveform", name: "White Noise", active: false },
  { icon: "weather-lightning", name: "Thunder", active: false },
] as const;

export default function Sleep() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{ uri: NIGHT_SKY }}
        style={StyleSheet.absoluteFill}
        imageStyle={styles.bgImage}
      />
      <LinearGradient
        colors={["rgba(8,10,32,0.55)", "rgba(8,10,32,0.9)", "#080a20"]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Sleep Sounds</Text>
        <View style={styles.timerChip}>
          <Ionicons name="moon" size={13} color="#a5b4fc" />
          <Text style={styles.timerText}>45 min</Text>
        </View>
      </View>

      <View style={styles.moonZone}>
        <View style={styles.moonGlowOuter} />
        <View style={styles.moonGlowInner} />
        <View style={styles.moon}>
          <MaterialCommunityIcons
            name="moon-waning-crescent"
            size={54}
            color="#e0e7ff"
          />
        </View>
      </View>
      <Text style={styles.nowPlaying}>Ocean Waves · playing</Text>

      <View style={styles.grid}>
        {SOUNDS.map((sound) => (
          <TouchableOpacity
            key={sound.name}
            style={[styles.soundCard, sound.active && styles.soundCardOn]}
          >
            <MaterialCommunityIcons
              name={sound.icon}
              size={26}
              color={sound.active ? "#a5b4fc" : "#8e94b8"}
            />
            <Text
              style={[styles.soundName, sound.active && styles.soundNameOn]}
            >
              {sound.name}
            </Text>
            {sound.active && (
              <Ionicons name="pause-circle" size={20} color="#a5b4fc" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.player}>
        <Ionicons name="volume-low" size={19} color="#8e94b8" />
        <View style={styles.volumeTrack}>
          <View style={styles.volumeFill} />
          <View style={styles.volumeThumb} />
        </View>
        <Ionicons name="volume-high" size={19} color="#8e94b8" />
        <TouchableOpacity style={styles.playBtn}>
          <Ionicons name="pause" size={24} color="#080a20" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#080a20",
  },
  bgImage: {
    opacity: 0.7,
  },
  header: {
    marginTop: 58,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
  },
  timerChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(165,180,252,0.12)",
    borderWidth: 1,
    borderColor: "rgba(165,180,252,0.35)",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  timerText: {
    color: "#a5b4fc",
    fontSize: 13,
    fontWeight: "700",
  },
  moonZone: {
    marginTop: 40,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  moonGlowOuter: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(165,180,252,0.07)",
  },
  moonGlowInner: {
    position: "absolute",
    width: 118,
    height: 118,
    borderRadius: 59,
    backgroundColor: "rgba(165,180,252,0.12)",
  },
  moon: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "rgba(165,180,252,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },
  nowPlaying: {
    textAlign: "center",
    color: "#a5b4fc",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginTop: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingHorizontal: 22,
    marginTop: 30,
  },
  soundCard: {
    width: "47%",
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 14,
  },
  soundCardOn: {
    backgroundColor: "rgba(165,180,252,0.12)",
    borderColor: "rgba(165,180,252,0.5)",
  },
  soundName: {
    color: "#c7cbe3",
    fontSize: 14,
    fontWeight: "700",
    flex: 1,
  },
  soundNameOn: {
    color: "#fff",
  },
  player: {
    marginTop: "auto",
    marginBottom: 44,
    marginHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  volumeTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.15)",
    flexDirection: "row",
    alignItems: "center",
  },
  volumeFill: {
    width: "60%",
    height: "100%",
    borderRadius: 2,
    backgroundColor: "#a5b4fc",
  },
  volumeThumb: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#fff",
    marginLeft: -7,
  },
  playBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#a5b4fc",
    alignItems: "center",
    justifyContent: "center",
  },
});
