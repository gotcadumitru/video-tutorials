import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const PROFILE =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80";

const STATS = [
  { label: "MOVE", value: "520", goal: "/500 CAL", color: "#fa114f" },
  { label: "EXERCISE", value: "42", goal: "/30 MIN", color: "#92e82a" },
  { label: "STAND", value: "11", goal: "/12 HRS", color: "#00d3f9" },
];

export default function AppleFitness() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.date}>SATURDAY, JUL 12</Text>
            <Text style={styles.title}>Summary</Text>
          </View>
          <Image source={{ uri: PROFILE }} style={styles.profile} />
        </View>

        <View style={styles.ringsCard}>
          <View style={styles.rings}>
            <View style={[styles.ring, styles.ringMove]} />
            <View style={[styles.ring, styles.ringExercise]} />
            <View style={[styles.ring, styles.ringStand]} />
          </View>
          <View style={styles.stats}>
            {STATS.map((stat) => (
              <View key={stat.label}>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={[styles.statValue, { color: stat.color }]}>
                  {stat.value}
                  <Text style={styles.statGoal}>{stat.goal}</Text>
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.tile}>
            <Text style={styles.tileLabel}>Steps</Text>
            <Text style={styles.tileValue}>11,482</Text>
          </View>
          <View style={styles.tile}>
            <Text style={styles.tileLabel}>Distance</Text>
            <Text style={styles.tileValue}>
              5.2 <Text style={styles.tileUnit}>MI</Text>
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Workouts</Text>
        <View style={styles.workout}>
          <View style={styles.workoutIcon}>
            <MaterialCommunityIcons name="run" size={24} color="#92e82a" />
          </View>
          <View style={styles.workoutInfo}>
            <Text style={styles.workoutName}>Outdoor Run</Text>
            <Text style={styles.workoutMeta}>3.11 MI · 28:14 · 321 CAL</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#48484a" />
        </View>

        <Text style={styles.sectionTitle}>Trends</Text>
        <View style={styles.trends}>
          <View style={styles.trend}>
            <Ionicons name="arrow-up" size={15} color="#92e82a" />
            <Text style={styles.trendText}>Move is up 12% this week</Text>
          </View>
          <View style={styles.trend}>
            <Ionicons name="arrow-up" size={15} color="#92e82a" />
            <Text style={styles.trendText}>Longest streak: 23 days</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  header: {
    marginTop: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  date: {
    color: "#8e8e93",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "800",
  },
  profile: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  ringsCard: {
    marginTop: 22,
    backgroundColor: "#1c1c1e",
    borderRadius: 22,
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rings: {
    width: 160,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  ring: {
    position: "absolute",
    borderRadius: 100,
  },
  ringMove: {
    width: 160,
    height: 160,
    borderWidth: 15,
    borderColor: "#fa114f",
  },
  ringExercise: {
    width: 118,
    height: 118,
    borderWidth: 15,
    borderColor: "#92e82a",
  },
  ringStand: {
    width: 76,
    height: 76,
    borderWidth: 15,
    borderColor: "#00d3f9",
  },
  stats: {
    gap: 14,
  },
  statLabel: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800",
  },
  statGoal: {
    fontSize: 15,
  },
  grid: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  tile: {
    flex: 1,
    backgroundColor: "#1c1c1e",
    borderRadius: 18,
    padding: 16,
    gap: 4,
  },
  tileLabel: {
    color: "#8e8e93",
    fontSize: 13,
    fontWeight: "600",
  },
  tileValue: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
  },
  tileUnit: {
    fontSize: 15,
    color: "#8e8e93",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 26,
  },
  workout: {
    marginTop: 12,
    backgroundColor: "#1c1c1e",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  workoutIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(146,232,42,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  workoutInfo: {
    flex: 1,
    gap: 2,
  },
  workoutName: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  workoutMeta: {
    color: "#8e8e93",
    fontSize: 13,
  },
  trends: {
    marginTop: 12,
    backgroundColor: "#1c1c1e",
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },
  trend: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  trendText: {
    color: "#e5e7eb",
    fontSize: 14,
  },
});
