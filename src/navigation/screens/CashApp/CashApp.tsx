import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const KEYPAD = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  [".", "0", "⌫"],
];

export default function CashApp() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <View style={styles.profile}>
          <Text style={styles.profileInitial}>D</Text>
        </View>
        <View style={styles.balancePill}>
          <Text style={styles.balanceText}>Balance: $326.40</Text>
        </View>
        <TouchableOpacity style={styles.scanBtn}>
          <Ionicons name="qr-code-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.amountZone}>
        <Text style={styles.amount}>$74.50</Text>
        <View style={styles.noteChip}>
          <Text style={styles.noteText}>For concert tickets 🎫</Text>
        </View>
      </View>

      <View style={styles.keypad}>
        {KEYPAD.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.keypadRow}>
            {row.map((key) => (
              <TouchableOpacity key={key} style={styles.key}>
                <Text style={styles.keyText}>{key}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.ctaRow}>
        <TouchableOpacity style={styles.ctaSecondary}>
          <Text style={styles.ctaSecondaryText}>Request</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ctaPrimary}>
          <Text style={styles.ctaPrimaryText}>Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0c0c0c",
  },
  header: {
    marginTop: 58,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profile: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#00d632",
    alignItems: "center",
    justifyContent: "center",
  },
  profileInitial: {
    color: "#000",
    fontSize: 16,
    fontWeight: "900",
  },
  balancePill: {
    backgroundColor: "#181818",
    borderRadius: 18,
    paddingVertical: 9,
    paddingHorizontal: 16,
  },
  balanceText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  scanBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#181818",
    alignItems: "center",
    justifyContent: "center",
  },
  amountZone: {
    alignItems: "center",
    marginTop: 60,
    gap: 16,
  },
  amount: {
    color: "#fff",
    fontSize: 72,
    fontWeight: "800",
    letterSpacing: -2,
  },
  noteChip: {
    backgroundColor: "#181818",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  noteText: {
    color: "#9ca3af",
    fontSize: 13,
    fontWeight: "600",
  },
  keypad: {
    marginTop: "auto",
    paddingHorizontal: 30,
    gap: 6,
  },
  keypadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  key: {
    width: 96,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  keyText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "600",
  },
  ctaRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 44,
  },
  ctaSecondary: {
    flex: 1,
    backgroundColor: "#181818",
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: "center",
  },
  ctaSecondaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
  ctaPrimary: {
    flex: 1,
    backgroundColor: "#00d632",
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: "center",
  },
  ctaPrimaryText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "800",
  },
});
