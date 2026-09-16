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

const GRID = [
  "0123321012332101",
  "1233210123321012",
  "2331102233011023",
  "3210233210123321",
  "1023321123302112",
  "2312013322103231",
  "0133202113230122",
];

const LEVELS = ["#1c1c24", "#3b2d63", "#6d4aab", "#8b5cf6"];

const HABITS = [
  { icon: "meditation", name: "Meditate", streak: 23, week: [1, 1, 1, 1, 1, 1, 0] },
  { icon: "book-open-page-variant", name: "Read 20 pages", streak: 15, week: [1, 1, 0, 1, 1, 1, 0] },
  { icon: "dumbbell", name: "Gym", streak: 9, week: [1, 0, 1, 0, 1, 1, 0] },
  { icon: "water", name: "2L of water", streak: 31, week: [1, 1, 1, 1, 1, 1, 1] },
] as const;

export default function Habits() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Habits</Text>
          <View style={styles.streakPill}>
            <MaterialCommunityIcons name="fire" size={17} color="#f97316" />
            <Text style={styles.streakText}>23</Text>
          </View>
        </View>

        <View style={styles.gridCard}>
          <View style={styles.gridHeader}>
            <Text style={styles.gridTitle}>Last 16 weeks</Text>
            <Text style={styles.gridStat}>87% completion</Text>
          </View>
          <View style={styles.grid}>
            {GRID.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.gridRow}>
                {row.split("").map((cell, cellIndex) => (
                  <View
                    key={cellIndex}
                    style={[
                      styles.cell,
                      { backgroundColor: LEVELS[Number(cell)] },
                    ]}
                  />
                ))}
              </View>
            ))}
          </View>
          <View style={styles.legend}>
            <Text style={styles.legendText}>Less</Text>
            {LEVELS.map((level) => (
              <View key={level} style={[styles.cell, { backgroundColor: level }]} />
            ))}
            <Text style={styles.legendText}>More</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Today</Text>
        {HABITS.map((habit) => (
          <View key={habit.name} style={styles.habit}>
            <View style={styles.habitIcon}>
              <MaterialCommunityIcons
                name={habit.icon}
                size={22}
                color="#8b5cf6"
              />
            </View>
            <View style={styles.habitInfo}>
              <Text style={styles.habitName}>{habit.name}</Text>
              <View style={styles.week}>
                {habit.week.map((day, dayIndex) => (
                  <View
                    key={dayIndex}
                    style={[styles.day, day === 1 && styles.dayDone]}
                  />
                ))}
              </View>
            </View>
            <View style={styles.habitStreak}>
              <MaterialCommunityIcons name="fire" size={14} color="#f97316" />
              <Text style={styles.habitStreakText}>{habit.streak}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0c0c0f",
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 110,
  },
  header: {
    marginTop: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "900",
  },
  streakPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(249,115,22,0.12)",
    borderWidth: 1,
    borderColor: "rgba(249,115,22,0.4)",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  streakText: {
    color: "#f97316",
    fontSize: 15,
    fontWeight: "900",
  },
  gridCard: {
    marginTop: 20,
    backgroundColor: "#131318",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1e1e26",
    padding: 18,
    gap: 12,
  },
  gridHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  gridTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
  },
  gridStat: {
    color: "#8b5cf6",
    fontSize: 13,
    fontWeight: "700",
  },
  grid: {
    gap: 5,
  },
  gridRow: {
    flexDirection: "row",
    gap: 5,
  },
  cell: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 4,
    minWidth: 10,
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 5,
  },
  legendText: {
    color: "#6b7280",
    fontSize: 11,
    marginHorizontal: 3,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "800",
    marginTop: 28,
    marginBottom: 4,
  },
  habit: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#131318",
    borderWidth: 1,
    borderColor: "#1e1e26",
    borderRadius: 18,
    padding: 15,
    marginTop: 10,
  },
  habitIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(139,92,246,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  habitInfo: {
    flex: 1,
    gap: 7,
  },
  habitName: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  week: {
    flexDirection: "row",
    gap: 5,
  },
  day: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#1e1e26",
  },
  dayDone: {
    backgroundColor: "#8b5cf6",
  },
  habitStreak: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  habitStreakText: {
    color: "#f97316",
    fontSize: 14,
    fontWeight: "800",
  },
  fab: {
    position: "absolute",
    right: 22,
    bottom: 34,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#8b5cf6",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#8b5cf6",
    shadowOpacity: 0.5,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
});
