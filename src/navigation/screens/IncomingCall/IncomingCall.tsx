import React from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const CALLER =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80";

export default function IncomingCall() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Image
        source={{ uri: CALLER }}
        style={StyleSheet.absoluteFill}
        blurRadius={45}
      />
      <View style={styles.dim} />

      <View style={styles.caller}>
        <Image source={{ uri: CALLER }} style={styles.avatar} />
        <Text style={styles.name}>Mom</Text>
        <Text style={styles.subtitle}>mobile</Text>
      </View>

      <View style={styles.bottom}>
        <View style={styles.secondaryRow}>
          <TouchableOpacity style={styles.secondary}>
            <View style={styles.secondaryBtn}>
              <Ionicons name="alarm-outline" size={22} color="#fff" />
            </View>
            <Text style={styles.secondaryLabel}>Remind Me</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondary}>
            <View style={styles.secondaryBtn}>
              <Ionicons name="chatbubble-outline" size={22} color="#fff" />
            </View>
            <Text style={styles.secondaryLabel}>Message</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.answerRow}>
          <View style={styles.answer}>
            <TouchableOpacity style={[styles.answerBtn, styles.decline]}>
              <Ionicons
                name="call"
                size={30}
                color="#fff"
                style={styles.declineIcon}
              />
            </TouchableOpacity>
            <Text style={styles.answerLabel}>Decline</Text>
          </View>
          <View style={styles.answer}>
            <TouchableOpacity style={[styles.answerBtn, styles.accept]}>
              <Ionicons name="call" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.answerLabel}>Accept</Text>
          </View>
        </View>

        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },
  dim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  caller: {
    marginTop: 110,
    alignItems: "center",
    gap: 4,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  name: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "500",
  },
  subtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 17,
  },
  bottom: {
    marginTop: "auto",
    paddingHorizontal: 50,
    paddingBottom: 12,
    gap: 40,
  },
  secondaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  secondary: {
    alignItems: "center",
    gap: 8,
  },
  secondaryBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryLabel: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
  },
  answerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  answer: {
    alignItems: "center",
    gap: 10,
  },
  answerBtn: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  decline: {
    backgroundColor: "#ff3b30",
  },
  declineIcon: {
    transform: [{ rotate: "135deg" }],
  },
  accept: {
    backgroundColor: "#34c759",
  },
  answerLabel: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
  },
  homeIndicator: {
    alignSelf: "center",
    width: 140,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
});
