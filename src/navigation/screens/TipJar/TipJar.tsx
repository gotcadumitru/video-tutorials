import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Paywall } from "../../../components/Paywall";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const PERCENTS = [10, 15, 18, 20, 25];

export default function TipJar() {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState(18);
  const [split, setSplit] = useState(1);
  const [paywall, setPaywall] = useState(false);

  // 👇 THE JOKE — calculate shows the paywall
  const calculate = () => setPaywall(true);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.brand}>TipJar</Text>
        <View style={styles.proPill}>
          <Ionicons name="lock-closed" size={10} color="#10b981" />
          <Text style={styles.proPillTxt}>FREE</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>Calculate your tip in seconds</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Bill amount</Text>
        <View style={styles.billRow}>
          <Text style={styles.currency}>$</Text>
          <TextInput
            value={bill}
            onChangeText={setBill}
            placeholder="0.00"
            placeholderTextColor="#3a3a40"
            keyboardType="decimal-pad"
            style={styles.billInput}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Tip percentage</Text>
        <View style={styles.percentRow}>
          {PERCENTS.map((p) => (
            <TouchableOpacity
              key={p}
              onPress={() => setTip(p)}
              style={[styles.percentBtn, tip === p && styles.percentActive]}
            >
              <Text style={[styles.percentTxt, tip === p && styles.percentTxtActive]}>
                {p}%
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.sliderHint}>
          <Text style={styles.label}>Selected</Text>
          <Text style={styles.selectedPct}>{tip}%</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Split between</Text>
        <View style={styles.splitRow}>
          <TouchableOpacity
            onPress={() => setSplit(Math.max(1, split - 1))}
            style={styles.splitBtn}
          >
            <Ionicons name="remove" size={22} color="#fff" />
          </TouchableOpacity>
          <View style={styles.splitDisplay}>
            <MaterialCommunityIcons name="account-group" size={20} color="#10b981" />
            <Text style={styles.splitTxt}>{split} {split === 1 ? "person" : "people"}</Text>
          </View>
          <TouchableOpacity onPress={() => setSplit(split + 1)} style={styles.splitBtn}>
            <Ionicons name="add" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.cta} onPress={calculate} activeOpacity={0.85}>
        <Text style={styles.ctaTxt}>Calculate Tip</Text>
        <Ionicons name="arrow-forward" size={20} color="#000" />
      </TouchableOpacity>

      <Text style={styles.foot}>Try Pro for advanced split modes</Text>

      <Paywall
        visible={paywall}
        onClose={() => setPaywall(false)}
        appName="TipJar"
        tagline="Tipping made effortless. For real this time."
        accent="#10b981"
        features={[
          { icon: "calculator-variant", label: "See your tip amount", lib: "mci" },
          { icon: "account-group", label: "Custom per-person amounts", lib: "mci" },
          { icon: "history", label: "Save and recall past bills", lib: "mci" },
          { icon: "globe-outline", label: "Currency conversion", lib: "ion" },
          { icon: "block-helper", label: "Remove ads", lib: "mci" },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0a0f0c", paddingHorizontal: 22, paddingTop: 60 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  brand: { color: "#fff", fontSize: 26, fontWeight: "900", letterSpacing: -1 },
  proPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "rgba(16,185,129,0.12)",
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.3)",
  },
  proPillTxt: { color: "#10b981", fontSize: 11, fontWeight: "800", letterSpacing: 1 },
  subtitle: { color: "#6b7280", fontSize: 14, marginTop: 6, marginBottom: 22 },

  card: {
    backgroundColor: "#11201a",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#1a2a23",
  },
  label: { color: "#6b7280", fontSize: 11, fontWeight: "700", letterSpacing: 1 },
  billRow: { flexDirection: "row", alignItems: "baseline", marginTop: 8 },
  currency: { color: "#10b981", fontSize: 38, fontWeight: "300" },
  billInput: {
    flex: 1,
    color: "#fff",
    fontSize: 38,
    fontWeight: "300",
    marginLeft: 6,
    padding: 0,
  },

  percentRow: { flexDirection: "row", gap: 6, marginTop: 10 },
  percentBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#0a1610",
    borderWidth: 1,
    borderColor: "#1a2a23",
    alignItems: "center",
  },
  percentActive: { backgroundColor: "#10b981", borderColor: "#10b981" },
  percentTxt: { color: "#fff", fontSize: 14, fontWeight: "700" },
  percentTxtActive: { color: "#000" },
  sliderHint: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  selectedPct: { color: "#10b981", fontSize: 22, fontWeight: "900" },

  splitRow: { flexDirection: "row", alignItems: "center", marginTop: 10, gap: 12 },
  splitBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#0a1610",
    borderWidth: 1,
    borderColor: "#1a2a23",
    alignItems: "center",
    justifyContent: "center",
  },
  splitDisplay: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  splitTxt: { color: "#fff", fontSize: 18, fontWeight: "700" },

  cta: {
    backgroundColor: "#10b981",
    height: 56,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 6,
    shadowColor: "#10b981",
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  ctaTxt: { color: "#000", fontSize: 17, fontWeight: "800" },
  foot: { color: "#374151", fontSize: 11, textAlign: "center", marginTop: 16 },
});
