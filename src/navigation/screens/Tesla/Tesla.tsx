import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const CAR =
  "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1000&q=80";

const CONTROLS = [
  { icon: "lock-closed-outline", label: "Lock" },
  { icon: "flash-outline", label: "Charge" },
  { icon: "snow-outline", label: "Climate" },
  { icon: "car-outline", label: "Frunk" },
  { icon: "cube-outline", label: "Trunk" },
] as const;

const ROWS = [
  { icon: "location-outline", label: "Location", value: "Parked · Ocean Ave" },
  { icon: "time-outline", label: "Schedule", value: "Departure 8:00 AM" },
  { icon: "shield-checkmark-outline", label: "Security", value: "Sentry on" },
] as const;

export default function Tesla() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.model}>Model S</Text>
            <View style={styles.statusRow}>
              <Ionicons name="battery-half" size={16} color="#34d399" />
              <Text style={styles.range}>287 mi</Text>
              <Text style={styles.status}>· Unlocked</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
            <Ionicons name="person-outline" size={18} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        <Image source={{ uri: CAR }} style={styles.car} />

        <View style={styles.batteryBar}>
          <View style={styles.batteryFill} />
        </View>
        <Text style={styles.batteryLabel}>76% · Charging complete at 2:40 AM</Text>

        <View style={styles.controls}>
          {CONTROLS.map((control) => (
            <TouchableOpacity key={control.label} style={styles.control}>
              <View style={styles.controlBtn}>
                <Ionicons name={control.icon} size={22} color="#e5e7eb" />
              </View>
              <Text style={styles.controlLabel}>{control.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.climateCard}>
          <View>
            <Text style={styles.climateLabel}>INTERIOR</Text>
            <Text style={styles.climateTemp}>72°F</Text>
            <Text style={styles.climateSub}>Climate is on</Text>
          </View>
          <View style={styles.tempControls}>
            <TouchableOpacity style={styles.tempBtn}>
              <Ionicons name="remove" size={22} color="#e5e7eb" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tempBtn, styles.tempBtnOn]}>
              <MaterialCommunityIcons name="fan" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tempBtn}>
              <Ionicons name="add" size={22} color="#e5e7eb" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rows}>
          {ROWS.map((row) => (
            <TouchableOpacity key={row.label} style={styles.row}>
              <Ionicons name={row.icon} size={21} color="#9ca3af" />
              <Text style={styles.rowLabel}>{row.label}</Text>
              <Text style={styles.rowValue}>{row.value}</Text>
              <Ionicons name="chevron-forward" size={17} color="#4b5563" />
            </TouchableOpacity>
          ))}
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
    paddingBottom: 50,
  },
  header: {
    marginTop: 58,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  model: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 4,
  },
  range: {
    color: "#34d399",
    fontSize: 14,
    fontWeight: "600",
  },
  status: {
    color: "#9ca3af",
    fontSize: 14,
  },
  profileBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#141414",
    alignItems: "center",
    justifyContent: "center",
  },
  car: {
    width: "100%",
    height: 210,
    marginTop: 10,
  },
  batteryBar: {
    marginTop: 16,
    marginHorizontal: 22,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#1f2937",
    overflow: "hidden",
  },
  batteryFill: {
    width: "76%",
    height: "100%",
    borderRadius: 3,
    backgroundColor: "#34d399",
  },
  batteryLabel: {
    color: "#6b7280",
    fontSize: 12,
    marginTop: 8,
    marginHorizontal: 22,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    marginTop: 26,
  },
  control: {
    alignItems: "center",
    gap: 8,
  },
  controlBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "#1f1f1f",
    alignItems: "center",
    justifyContent: "center",
  },
  controlLabel: {
    color: "#9ca3af",
    fontSize: 11,
    fontWeight: "600",
  },
  climateCard: {
    marginTop: 26,
    marginHorizontal: 22,
    backgroundColor: "#0f0f0f",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1c1c1c",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  climateLabel: {
    color: "#6b7280",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
  },
  climateTemp: {
    color: "#fff",
    fontSize: 38,
    fontWeight: "300",
    marginTop: 4,
  },
  climateSub: {
    color: "#3e6ae1",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 2,
  },
  tempControls: {
    flexDirection: "row",
    gap: 10,
  },
  tempBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#181818",
    alignItems: "center",
    justifyContent: "center",
  },
  tempBtnOn: {
    backgroundColor: "#3e6ae1",
  },
  rows: {
    marginTop: 26,
    marginHorizontal: 22,
    backgroundColor: "#0f0f0f",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1c1c1c",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: "#1c1c1c",
  },
  rowLabel: {
    color: "#e5e7eb",
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
  },
  rowValue: {
    color: "#6b7280",
    fontSize: 13,
  },
});
