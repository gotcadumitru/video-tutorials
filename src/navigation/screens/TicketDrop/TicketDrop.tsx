import React from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

const HERO =
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80";

const SEAT_ROWS = [
  "ooxoooooxooo",
  "oooooxoooooo",
  "oxoooooooxoo",
  "ooooossooooo",
  "oooxoooooooo",
  "xooooooxooox",
  "ooooxooooooo",
];

const TIERS = [
  { name: "Floor", price: "$189", selected: true },
  { name: "Lower Bowl", price: "$129", selected: false },
  { name: "Upper", price: "$79", selected: false },
  { name: "VIP", price: "$349", selected: false },
];

export default function TicketDrop() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <ImageBackground source={{ uri: HERO }} style={styles.hero}>
          <LinearGradient
            colors={["rgba(0,0,0,0.3)", "transparent", "#0a0a0a"]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.heroTop}>
            <TouchableOpacity style={styles.backBtn}>
              <Ionicons name="chevron-back" size={22} color="#fff" />
            </TouchableOpacity>
            <View style={styles.livePill}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE DROP</Text>
            </View>
          </View>
          <View style={styles.heroInfo}>
            <Text style={styles.tour}>WORLD TOUR 2026</Text>
            <Text style={styles.artist}>MIDNIGHT PULSE</Text>
            <View style={styles.venueRow}>
              <Ionicons name="location-outline" size={14} color="#9ca3af" />
              <Text style={styles.venue}>
                Arena Nova · Sat, Aug 22 · 8:00 PM
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.timerBar}>
          <Ionicons name="time-outline" size={18} color="#b6ff3c" />
          <Text style={styles.timerLabel}>Tickets held for</Text>
          <Text style={styles.timerValue}>04:59</Text>
        </View>

        <View style={styles.seatCard}>
          <View style={styles.stage}>
            <Text style={styles.stageText}>S T A G E</Text>
          </View>

          <View style={styles.seatGrid}>
            {SEAT_ROWS.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.seatRow}>
                {row.split("").map((seat, seatIndex) => (
                  <View
                    key={seatIndex}
                    style={[
                      styles.seat,
                      seat === "x" && styles.seatTaken,
                      seat === "s" && styles.seatYours,
                    ]}
                  />
                ))}
              </View>
            ))}
          </View>

          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={styles.seat} />
              <Text style={styles.legendText}>Available</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.seat, styles.seatTaken]} />
              <Text style={styles.legendText}>Taken</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.seat, styles.seatYours]} />
              <Text style={styles.legendText}>Your seats</Text>
            </View>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tiers}
        >
          {TIERS.map((tier) => (
            <TouchableOpacity
              key={tier.name}
              style={[styles.tier, tier.selected && styles.tierOn]}
            >
              <Text
                style={[styles.tierName, tier.selected && styles.tierNameOn]}
              >
                {tier.name}
              </Text>
              <Text
                style={[styles.tierPrice, tier.selected && styles.tierNameOn]}
              >
                {tier.price}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      <View style={styles.checkoutBar}>
        <View>
          <Text style={styles.checkoutMeta}>2 × Floor · Row D</Text>
          <Text style={styles.checkoutPrice}>
            $412.50 <Text style={styles.checkoutFees}>incl. fees</Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn}>
          <Ionicons name="flash" size={17} color="#0a0a0a" />
          <Text style={styles.checkoutBtnText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  scroll: {
    paddingBottom: 120,
  },
  hero: {
    height: 320,
    justifyContent: "space-between",
  },
  heroTop: {
    marginTop: 56,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  livePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 16,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#ff3b30",
  },
  liveText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },
  heroInfo: {
    paddingHorizontal: 20,
    paddingBottom: 18,
    gap: 5,
  },
  tour: {
    color: "#b6ff3c",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 3,
  },
  artist: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 1,
  },
  venueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  venue: {
    color: "#9ca3af",
    fontSize: 13,
  },
  timerBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 20,
    marginTop: 18,
    backgroundColor: "#141414",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#222",
  },
  timerLabel: {
    color: "#9ca3af",
    fontSize: 13,
    flex: 1,
  },
  timerValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1,
  },
  seatCard: {
    marginHorizontal: 20,
    marginTop: 14,
    backgroundColor: "#121212",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1f1f1f",
    padding: 18,
    alignItems: "center",
  },
  stage: {
    width: "70%",
    backgroundColor: "#1d1d1d",
    borderRadius: 30,
    paddingVertical: 8,
    alignItems: "center",
  },
  stageText: {
    color: "#6b7280",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 3,
  },
  seatGrid: {
    marginTop: 18,
    gap: 8,
  },
  seatRow: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
  seat: {
    width: 15,
    height: 15,
    borderRadius: 5,
    backgroundColor: "#3d3d3d",
  },
  seatTaken: {
    backgroundColor: "#1c1c1c",
  },
  seatYours: {
    backgroundColor: "#b6ff3c",
    shadowColor: "#b6ff3c",
    shadowOpacity: 0.8,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  },
  legend: {
    flexDirection: "row",
    gap: 18,
    marginTop: 18,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendText: {
    color: "#9ca3af",
    fontSize: 12,
  },
  tiers: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 10,
  },
  tier: {
    backgroundColor: "#141414",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#242424",
    alignItems: "center",
    gap: 2,
  },
  tierOn: {
    borderColor: "#b6ff3c",
    backgroundColor: "rgba(182,255,60,0.08)",
  },
  tierName: {
    color: "#e5e7eb",
    fontSize: 13,
    fontWeight: "700",
  },
  tierNameOn: {
    color: "#b6ff3c",
  },
  tierPrice: {
    color: "#9ca3af",
    fontSize: 12,
  },
  checkoutBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 34,
    backgroundColor: "rgba(10,10,10,0.97)",
    borderTopWidth: 1,
    borderTopColor: "#1f1f1f",
  },
  checkoutMeta: {
    color: "#9ca3af",
    fontSize: 12,
  },
  checkoutPrice: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 2,
  },
  checkoutFees: {
    color: "#6b7280",
    fontSize: 12,
    fontWeight: "400",
  },
  checkoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "#b6ff3c",
    borderRadius: 26,
    paddingVertical: 14,
    paddingHorizontal: 26,
  },
  checkoutBtnText: {
    color: "#0a0a0a",
    fontSize: 15,
    fontWeight: "800",
  },
});
