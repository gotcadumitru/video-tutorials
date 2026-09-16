import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const BARCODE = [
  3, 1, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 1, 2, 4, 3, 1, 2, 1, 3, 2, 1,
  4, 2, 1, 3, 1, 2, 1, 4, 2, 3, 1, 1, 2, 3, 4,
];

const DETAILS = [
  { label: "PASSENGER", value: "D. GOTCA" },
  { label: "SEAT", value: "12A" },
  { label: "GATE", value: "B22" },
  { label: "GROUP", value: "1" },
];

export default function BoardingPass() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} color="#fff" />
        <Text style={styles.headerTitle}>Boarding Pass</Text>
        <Ionicons name="share-outline" size={22} color="#fff" />
      </View>

      <View style={styles.ticket}>
        <View style={styles.ticketTop}>
          <View style={styles.airlineRow}>
            <MaterialCommunityIcons name="airplane" size={20} color="#7dd3fc" />
            <Text style={styles.airline}>ATLAS AIR · AT 214</Text>
            <View style={styles.statusChip}>
              <Text style={styles.statusText}>ON TIME</Text>
            </View>
          </View>

          <View style={styles.route}>
            <View style={styles.city}>
              <Text style={styles.cityCode}>SFO</Text>
              <Text style={styles.cityTime}>10:45 AM</Text>
            </View>
            <View style={styles.flightPath}>
              <View style={styles.pathDot} />
              <View style={styles.pathLine} />
              <MaterialCommunityIcons
                name="airplane"
                size={22}
                color="#7dd3fc"
                style={styles.pathPlane}
              />
              <View style={styles.pathLine} />
              <View style={styles.pathDot} />
            </View>
            <View style={styles.city}>
              <Text style={styles.cityCode}>TYO</Text>
              <Text style={styles.cityTime}>2:20 PM +1</Text>
            </View>
          </View>

          <Text style={styles.duration}>11h 35m · Nonstop · Boeing 787</Text>

          <View style={styles.detailsGrid}>
            {DETAILS.map((detail) => (
              <View key={detail.label} style={styles.detail}>
                <Text style={styles.detailLabel}>{detail.label}</Text>
                <Text style={styles.detailValue}>{detail.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.divider}>
          <View style={[styles.notch, styles.notchLeft]} />
          <View style={styles.dashes}>
            {Array.from({ length: 18 }).map((_, index) => (
              <View key={index} style={styles.dash} />
            ))}
          </View>
          <View style={[styles.notch, styles.notchRight]} />
        </View>

        <View style={styles.ticketBottom}>
          <View style={styles.barcode}>
            {BARCODE.map((bar, index) => (
              <View key={index} style={[styles.bar, { width: bar }]} />
            ))}
          </View>
          <Text style={styles.barcodeText}>AT214 · 12A · SFO→TYO</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.walletBtn}>
        <Ionicons name="wallet-outline" size={19} color="#000" />
        <Text style={styles.walletText}>Add to Apple Wallet</Text>
      </TouchableOpacity>

      <Text style={styles.boardingNote}>Boarding begins at 10:05 AM</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0a0e1a",
  },
  header: {
    marginTop: 58,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
  ticket: {
    marginTop: 26,
    marginHorizontal: 20,
    borderRadius: 22,
    overflow: "hidden",
  },
  ticketTop: {
    backgroundColor: "#141b2e",
    padding: 22,
  },
  airlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  airline: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    flex: 1,
  },
  statusChip: {
    backgroundColor: "rgba(52,211,153,0.14)",
    borderWidth: 1,
    borderColor: "rgba(52,211,153,0.4)",
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  statusText: {
    color: "#34d399",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  route: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
  },
  city: {
    gap: 2,
  },
  cityCode: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "900",
    letterSpacing: 1,
  },
  cityTime: {
    color: "#94a3b8",
    fontSize: 13,
  },
  flightPath: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 4,
  },
  pathDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#7dd3fc",
  },
  pathLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: "rgba(125,211,252,0.4)",
  },
  pathPlane: {
    transform: [{ rotate: "90deg" }],
  },
  duration: {
    color: "#64748b",
    fontSize: 12,
    marginTop: 10,
    textAlign: "center",
  },
  detailsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  detail: {
    gap: 3,
  },
  detailLabel: {
    color: "#64748b",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  detailValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
  divider: {
    backgroundColor: "#141b2e",
    height: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  notch: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#0a0e1a",
  },
  notchLeft: {
    marginLeft: -12,
  },
  notchRight: {
    marginRight: -12,
  },
  dashes: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  dash: {
    width: 10,
    height: 1.5,
    backgroundColor: "#2c3a55",
  },
  ticketBottom: {
    backgroundColor: "#141b2e",
    paddingVertical: 22,
    alignItems: "center",
    gap: 12,
  },
  barcode: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    height: 52,
  },
  bar: {
    height: "100%",
    backgroundColor: "#e2e8f0",
    borderRadius: 1,
  },
  barcodeText: {
    color: "#64748b",
    fontSize: 11,
    letterSpacing: 2,
  },
  walletBtn: {
    marginTop: 28,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#fff",
    borderRadius: 26,
    paddingVertical: 15,
  },
  walletText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "800",
  },
  boardingNote: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 13,
    marginTop: 16,
  },
});
