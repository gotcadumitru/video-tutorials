import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Paywall } from "../../../components/Paywall";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Flashlight() {
  const [on, setOn] = useState(false);
  const [paywall, setPaywall] = useState(false);
  const [torchReady, setTorchReady] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const toggle = async () => {
    // 👇 THE JOKE — turning the light ON is free, but turning it OFF is premium
    if (on) {
      setPaywall(true);
      return;
    }
    if (!permission?.granted) {
      const res = await requestPermission();
      if (!res?.granted) return;
    }
    setOn(true);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* Full-size camera that actually drives the device torch, hidden behind
          the opaque gradient below so the session runs but no preview shows. */}
      {on && (
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          enableTorch={torchReady}
          onCameraReady={() => setTorchReady(true)}
        />
      )}

      <LinearGradient
        colors={on ? ["#2a1d05", "#0a0a14"] : ["#1a1a2e", "#0a0a14"]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.header}>
        <Text style={styles.brand}>Lumen</Text>
      </View>

      <Text style={styles.subtitle}>The world's brightest flashlight</Text>

      <View style={styles.lampWrap}>
        <View style={styles.lampStack}>
          {on && (
            <View style={styles.glowOuter}>
              <View style={styles.glowInner} />
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={toggle}
            style={[styles.lamp, on && styles.lampOn]}
          >
            <MaterialCommunityIcons
              name="flashlight"
              size={92}
              color={on ? "#b45309" : "#3f3f46"}
            />
          </TouchableOpacity>
        </View>

        <Text style={[styles.status, on && styles.statusOn]}>
          {on ? "ON" : "OFF"}
        </Text>
        <Text style={[styles.hint, on && styles.hintOn]}>
          {on ? "Tap to turn off" : "Tap to turn on"}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.power, on && styles.powerOn]}
        onPress={toggle}
        activeOpacity={0.85}
      >
        {!on && (
          <LinearGradient
            colors={["#fbbf24", "#f59e0b"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        )}
        <Ionicons name="power" size={22} color={on ? "#fbbf24" : "#111"} />
        <Text style={[styles.powerTxt, on && styles.powerTxtOn]}>
          {on ? "Turn Off" : "Turn On"}
        </Text>
      </TouchableOpacity>

      <Paywall
        visible={paywall}
        onClose={() => setPaywall(false)}
        appName="Lumen"
        tagline="Unlock the off switch and so much more"
        accent="#fbbf24"
        features={[
          { icon: "power", label: "Turn the flashlight off", lib: "mci" },
          { icon: "flash", label: "Strobe & SOS modes", lib: "mci" },
          { icon: "brightness-7", label: "Adjustable brightness", lib: "mci" },
          { icon: "block-helper", label: "Remove all ads", lib: "mci" },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 60,
    backgroundColor: "#0a0a14",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: { color: "#fff", fontSize: 26, fontWeight: "900", letterSpacing: -1 },

  subtitle: { color: "#6b7280", fontSize: 14, marginTop: 6 },

  lampWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
  lampStack: {
    width: 320,
    height: 320,
    alignItems: "center",
    justifyContent: "center",
  },
  glowOuter: {
    ...StyleSheet.absoluteFill,
    borderRadius: 160,
    backgroundColor: "rgba(251,191,36,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  glowInner: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(251,191,36,0.18)",
  },
  lamp: {
    width: 170,
    height: 170,
    borderRadius: 85,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 2,
    borderColor: "#27272a",
  },
  lampOn: {
    backgroundColor: "#fde68a",
    borderColor: "#f59e0b",
    shadowColor: "#fbbf24",
    shadowOpacity: 0.7,
    shadowRadius: 30,
    elevation: 12,
  },
  status: {
    marginTop: 28,
    color: "#3f3f46",
    fontSize: 40,
    fontWeight: "900",
    letterSpacing: 4,
  },
  statusOn: { color: "#fbbf24" },
  hint: { color: "#52525b", fontSize: 13, marginTop: 4 },
  hintOn: { color: "#d97706" },

  power: {
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 28,
    shadowColor: "#fbbf24",
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  powerOn: {
    backgroundColor: "rgba(251,191,36,0.1)",
    borderWidth: 1,
    borderColor: "rgba(251,191,36,0.4)",
    shadowOpacity: 0,
    elevation: 0,
  },
  powerTxt: { color: "#000", fontSize: 17, fontWeight: "800" },
  powerTxtOn: { color: "#fbbf24" },
});
