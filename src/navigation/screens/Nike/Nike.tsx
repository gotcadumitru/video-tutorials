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

const HERO =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&q=80";

const SIZES = ["8", "8.5", "9", "9.5", "10", "10.5", "11", "12"];

const UPCOMING = [
  {
    name: "Dunk Low 'Panda'",
    date: "Jul 18",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&q=80",
  },
  {
    name: "AJ1 High 'Shadow'",
    date: "Jul 25",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80",
  },
  {
    name: "Air Force 1 'Triple'",
    date: "Aug 02",
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80",
  },
];

export default function Nike() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <Text style={styles.logo}>SNKRS</Text>
          <View style={styles.headerIcons}>
            <Ionicons name="search" size={22} color="#fff" />
            <Ionicons name="notifications-outline" size={22} color="#fff" />
          </View>
        </View>

        <View style={styles.dropCard}>
          <Image source={{ uri: HERO }} style={styles.heroImage} />
          <View style={styles.dropInfo}>
            <View style={styles.dropTimer}>
              <Ionicons name="time-outline" size={14} color="#d4ff00" />
              <Text style={styles.dropTimerText}>Drops in 02:14:36</Text>
            </View>
            <Text style={styles.dropName}>Air Max 'Crimson Fade'</Text>
            <Text style={styles.dropPrice}>$215</Text>

            <Text style={styles.sizeLabel}>SELECT SIZE (US)</Text>
            <View style={styles.sizes}>
              {SIZES.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[styles.size, size === "10" && styles.sizeOn]}
                >
                  <Text
                    style={[styles.sizeText, size === "10" && styles.sizeTextOn]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.ctaRow}>
              <TouchableOpacity style={styles.notifyBtn}>
                <Ionicons name="flash" size={17} color="#000" />
                <Text style={styles.notifyText}>Notify Me</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.heartBtn}>
                <Ionicons name="heart-outline" size={21} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Upcoming Drops</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.upcoming}
        >
          {UPCOMING.map((drop) => (
            <View key={drop.name} style={styles.upcomingCard}>
              <Image source={{ uri: drop.image }} style={styles.upcomingImage} />
              <Text style={styles.upcomingName}>{drop.name}</Text>
              <Text style={styles.upcomingDate}>{drop.date}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0d0d0d",
  },
  scroll: {
    paddingBottom: 50,
  },
  header: {
    marginTop: 58,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
    fontStyle: "italic",
    letterSpacing: 1,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 18,
  },
  dropCard: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "#151515",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#232323",
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: 260,
  },
  dropInfo: {
    padding: 20,
  },
  dropTimer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    backgroundColor: "rgba(212,255,0,0.1)",
    borderWidth: 1,
    borderColor: "rgba(212,255,0,0.35)",
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 11,
  },
  dropTimerText: {
    color: "#d4ff00",
    fontSize: 12,
    fontWeight: "800",
  },
  dropName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 12,
  },
  dropPrice: {
    color: "#9ca3af",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 3,
  },
  sizeLabel: {
    color: "#6b7280",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    marginTop: 20,
  },
  sizes: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },
  size: {
    minWidth: 52,
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2e2e2e",
    paddingVertical: 10,
  },
  sizeOn: {
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  sizeText: {
    color: "#e5e7eb",
    fontSize: 13,
    fontWeight: "700",
  },
  sizeTextOn: {
    color: "#000",
  },
  ctaRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 22,
  },
  notifyBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#d4ff00",
    borderRadius: 26,
    paddingVertical: 15,
  },
  notifyText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "900",
  },
  heartBtn: {
    width: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "#2e2e2e",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 30,
    marginHorizontal: 20,
  },
  upcoming: {
    paddingHorizontal: 20,
    paddingTop: 14,
    gap: 14,
  },
  upcomingCard: {
    width: 150,
  },
  upcomingImage: {
    width: 150,
    height: 110,
    borderRadius: 14,
    marginBottom: 8,
  },
  upcomingName: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  upcomingDate: {
    color: "#d4ff00",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
  },
});
