import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const PATH = [
  { type: "done", offset: 0 },
  { type: "done", offset: -70 },
  { type: "chest", offset: -110 },
  { type: "done", offset: -70 },
  { type: "current", offset: 0 },
  { type: "locked", offset: 70 },
  { type: "locked", offset: 110 },
  { type: "trophy", offset: 70 },
] as const;

export default function Duolingo() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.statsBar}>
        <View style={styles.stat}>
          <MaterialCommunityIcons name="fire" size={26} color="#ff9600" />
          <Text style={[styles.statText, { color: "#ff9600" }]}>47</Text>
        </View>
        <View style={styles.stat}>
          <MaterialCommunityIcons
            name="diamond-stone"
            size={24}
            color="#1cb0f6"
          />
          <Text style={[styles.statText, { color: "#1cb0f6" }]}>2,340</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="heart" size={24} color="#ff4b4b" />
          <Text style={[styles.statText, { color: "#ff4b4b" }]}>5</Text>
        </View>
      </View>

      <View style={styles.unitBanner}>
        <View style={styles.unitInfo}>
          <Text style={styles.unitKicker}>SECTION 2 · UNIT 3</Text>
          <Text style={styles.unitTitle}>Order food at a café</Text>
        </View>
        <View style={styles.unitDivider} />
        <MaterialCommunityIcons
          name="notebook-outline"
          size={26}
          color="#fff"
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.path}
      >
        {PATH.map((node, index) => (
          <View
            key={index}
            style={[styles.nodeWrap, { transform: [{ translateX: node.offset }] }]}
          >
            {node.type === "current" && (
              <View style={styles.startBubble}>
                <Text style={styles.startText}>START</Text>
                <View style={styles.startArrow} />
              </View>
            )}

            {node.type === "done" && (
              <View style={[styles.node, styles.nodeDone]}>
                <Ionicons name="checkmark-sharp" size={30} color="#fff" />
              </View>
            )}
            {node.type === "current" && (
              <View style={styles.nodeRing}>
                <View style={[styles.node, styles.nodeDone]}>
                  <Ionicons name="star" size={30} color="#fff" />
                </View>
              </View>
            )}
            {node.type === "locked" && (
              <View style={[styles.node, styles.nodeLocked]}>
                <Ionicons name="lock-closed" size={24} color="#52656d" />
              </View>
            )}
            {node.type === "chest" && (
              <MaterialCommunityIcons
                name="treasure-chest"
                size={64}
                color="#ffc800"
              />
            )}
            {node.type === "trophy" && (
              <View style={[styles.node, styles.nodeLocked]}>
                <Ionicons name="trophy" size={28} color="#52656d" />
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.tabBar}>
        <MaterialCommunityIcons name="home-variant" size={30} color="#58cc02" />
        <MaterialCommunityIcons name="dumbbell" size={28} color="#49c0f8" />
        <MaterialCommunityIcons name="shield" size={28} color="#ffc800" />
        <MaterialCommunityIcons
          name="treasure-chest"
          size={28}
          color="#ff9600"
        />
        <MaterialCommunityIcons name="store" size={28} color="#ce82ff" />
        <Ionicons name="person-circle-outline" size={30} color="#1cb0f6" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#131f24",
    paddingTop: 56,
  },
  statsBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 26,
    paddingBottom: 14,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statText: {
    fontSize: 17,
    fontWeight: "800",
  },
  unitBanner: {
    marginHorizontal: 16,
    backgroundColor: "#58cc02",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 14,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  unitInfo: {
    flex: 1,
    gap: 3,
  },
  unitKicker: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
  },
  unitTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
  },
  unitDivider: {
    width: 1.5,
    height: 36,
    backgroundColor: "rgba(255,255,255,0.35)",
  },
  path: {
    alignItems: "center",
    paddingVertical: 30,
    gap: 26,
    paddingBottom: 60,
  },
  nodeWrap: {
    alignItems: "center",
  },
  node: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  nodeDone: {
    backgroundColor: "#58cc02",
    borderBottomWidth: 6,
    borderBottomColor: "#3f9404",
  },
  nodeLocked: {
    backgroundColor: "#37464f",
    borderBottomWidth: 6,
    borderBottomColor: "#2a343b",
  },
  nodeRing: {
    padding: 7,
    borderRadius: 46,
    borderWidth: 5,
    borderColor: "#58cc02",
  },
  startBubble: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  startText: {
    color: "#58cc02",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1,
  },
  startArrow: {
    position: "absolute",
    bottom: -7,
    alignSelf: "center",
    width: 14,
    height: 14,
    backgroundColor: "#fff",
    transform: [{ rotate: "45deg" }],
  },
  tabBar: {
    height: 66,
    borderTopWidth: 2,
    borderTopColor: "#37464f",
    backgroundColor: "#131f24",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
