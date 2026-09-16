import React, { useEffect, useRef } from "react";
import {
  Animated,
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

const SPACE_BG =
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80";

const WAVE_HEIGHTS = [10, 22, 14, 30, 18, 26, 12, 20, 8];

const SUGGESTIONS = [
  "Summarize my emails",
  "Play focus music",
  "Remind me at 5 PM",
];

export default function AIVoice() {
  const ringA = useRef(new Animated.Value(0)).current;
  const ringB = useRef(new Animated.Value(0)).current;
  const breathe = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const ring = (value: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.timing(value, {
          toValue: 1,
          duration: 2400,
          delay,
          useNativeDriver: true,
        })
      ).start();

    ring(ringA, 0);
    ring(ringB, 1200);

    Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(breathe, {
          toValue: 0,
          duration: 1600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [ringA, ringB, breathe]);

  const ringStyle = (value: Animated.Value) => ({
    opacity: value.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0] }),
    transform: [
      {
        scale: value.interpolate({ inputRange: [0, 1], outputRange: [1, 2] }),
      },
    ],
  });

  const coreScale = breathe.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08],
  });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{ uri: SPACE_BG }}
        style={StyleSheet.absoluteFill}
        imageStyle={styles.bgImage}
      />
      <LinearGradient
        colors={["rgba(5,4,12,0.75)", "rgba(5,4,12,0.92)", "#05040c"]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.header}>
        <View style={styles.brand}>
          <Ionicons name="sparkles" size={20} color="#a78bfa" />
          <Text style={styles.brandName}>Nova</Text>
        </View>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="settings-outline" size={20} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      <View style={styles.orbZone}>
        <Animated.View style={[styles.ring, ringStyle(ringA)]} />
        <Animated.View style={[styles.ring, ringStyle(ringB)]} />
        <Animated.View
          style={[styles.coreWrap, { transform: [{ scale: coreScale }] }]}
        >
          <LinearGradient
            colors={["#8b5cf6", "#6366f1", "#22d3ee"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.core}
          >
            <MaterialCommunityIcons name="waveform" size={44} color="#fff" />
          </LinearGradient>
        </Animated.View>
      </View>

      <Text style={styles.status}>Listening…</Text>

      <View style={styles.transcript}>
        <View style={styles.userBubble}>
          <Text style={styles.userText}>
            "What does my day look like tomorrow?"
          </Text>
        </View>
        <View style={styles.novaBubble}>
          <View style={styles.novaHeader}>
            <Ionicons name="sparkles" size={13} color="#a78bfa" />
            <Text style={styles.novaName}>Nova</Text>
          </View>
          <Text style={styles.novaText}>
            You have 3 meetings, a gym session at 7 AM, and a free afternoon.
            Want me to block time for deep work?
          </Text>
          <View style={styles.wave}>
            {WAVE_HEIGHTS.map((bar, index) => (
              <View key={index} style={[styles.waveBar, { height: bar }]} />
            ))}
          </View>
        </View>
      </View>

      <View style={styles.suggestions}>
        {SUGGESTIONS.map((suggestion) => (
          <TouchableOpacity key={suggestion} style={styles.chip}>
            <Text style={styles.chipText}>{suggestion}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.sideBtn}>
          <MaterialCommunityIcons
            name="keyboard-outline"
            size={22}
            color="#9ca3af"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <LinearGradient
            colors={["#8b5cf6", "#22d3ee"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.micBtn}
          >
            <Ionicons name="mic" size={30} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sideBtn}>
          <Ionicons name="close" size={22} color="#9ca3af" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#05040c",
  },
  bgImage: {
    opacity: 0.55,
  },
  header: {
    marginTop: 58,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  brandName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  orbZone: {
    marginTop: 34,
    height: 190,
    alignItems: "center",
    justifyContent: "center",
  },
  ring: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 1.5,
    borderColor: "#8b5cf6",
  },
  coreWrap: {
    shadowColor: "#8b5cf6",
    shadowOpacity: 0.8,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 0 },
    elevation: 20,
  },
  core: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignItems: "center",
    justifyContent: "center",
  },
  status: {
    marginTop: 22,
    textAlign: "center",
    color: "#c4b5fd",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  transcript: {
    marginTop: 26,
    paddingHorizontal: 22,
    gap: 12,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 18,
    borderTopRightRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    maxWidth: "85%",
  },
  userText: {
    color: "#e5e7eb",
    fontSize: 14,
  },
  novaBubble: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(139,92,246,0.12)",
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.35)",
    borderRadius: 18,
    borderTopLeftRadius: 6,
    padding: 14,
    maxWidth: "92%",
    gap: 8,
  },
  novaHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  novaName: {
    color: "#a78bfa",
    fontSize: 12,
    fontWeight: "700",
  },
  novaText: {
    color: "#f3f4f6",
    fontSize: 14,
    lineHeight: 21,
  },
  wave: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  waveBar: {
    width: 3.5,
    borderRadius: 2,
    backgroundColor: "#22d3ee",
  },
  suggestions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 22,
    marginTop: "auto",
  },
  chip: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    borderRadius: 18,
    paddingVertical: 9,
    paddingHorizontal: 14,
  },
  chipText: {
    color: "#d1d5db",
    fontSize: 13,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 34,
    marginTop: 24,
    marginBottom: 44,
  },
  sideBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  micBtn: {
    width: 74,
    height: 74,
    borderRadius: 37,
    alignItems: "center",
    justifyContent: "center",
  },
});
