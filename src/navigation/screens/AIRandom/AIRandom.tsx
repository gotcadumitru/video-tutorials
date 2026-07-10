import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AIThinking } from "../../../components/AIThinking";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AIRandom() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [thinking, setThinking] = useState(false);
  const [result, setResult] = useState("");

  const generate = () => {
    const lo = parseInt(min) || 0;
    const hi = parseInt(max) || 100;
    if (hi < lo) return;
    const n = Math.floor(Math.random() * (hi - lo + 1)) + lo;
    setThinking(false);
    setTimeout(() => {
      setResult(n.toString());
      setThinking(true);
    }, 30);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#022c22", "#000"]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.header}>
        <Text style={styles.brand}>RandomAI</Text>
        <View style={styles.aiPill}>
          <MaterialCommunityIcons name="atom" size={10} color="#10b981" />
          <Text style={styles.aiPillTxt}>QUANTUM AI</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>
        The world's first AI-powered{"\n"}random number generator
      </Text>

      <View style={styles.previewCard}>
        <Text style={styles.previewLabel}>NEXT NUMBER</Text>
        <View style={styles.previewBox}>
          {thinking ? (
            <AIThinking
              active={thinking}
              steps={[
                { text: "Initializing quantum entropy provider..." },
                { text: "Establishing connection to CERN data feed..." },
                { text: "Reading cosmic microwave background radiation..." },
                { text: "Calibrating Heisenberg uncertainty modules..." },
                { text: "Sampling 10,000 photons from quantum vacuum..." },
                { text: "Running 50,000 Monte Carlo simulations..." },
                { text: "Cross-referencing Las Vegas casino datasets..." },
                { text: `AI considering range (min=${min}, max=${max})...` },
                { text: "Filtering bias from human-influenced numbers..." },
                { text: "Quantum-7 reaching consensus..." },
              ]}
              result={result}
              accent="#10b981"
              resultSize={84}
            />
          ) : (
            <>
              <MaterialCommunityIcons name="brain" size={48} color="#10b981" />
              <Text style={styles.previewHint}>Tap to generate</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.rangeRow}>
        <View style={styles.rangeBox}>
          <Text style={styles.rangeLabel}>MIN</Text>
          <TextInput
            value={min}
            onChangeText={setMin}
            keyboardType="number-pad"
            style={styles.rangeInput}
          />
        </View>
        <View style={styles.divider}>
          <Ionicons name="remove" size={16} color="#374151" />
        </View>
        <View style={styles.rangeBox}>
          <Text style={styles.rangeLabel}>MAX</Text>
          <TextInput
            value={max}
            onChangeText={setMax}
            keyboardType="number-pad"
            style={styles.rangeInput}
          />
        </View>
      </View>

      <TouchableOpacity onPress={generate} style={styles.cta} activeOpacity={0.85}>
        <LinearGradient
          colors={["#10b981", "#059669"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <MaterialCommunityIcons name="brain" size={20} color="#000" />
        <Text style={styles.ctaTxt}>Ask AI for a number</Text>
      </TouchableOpacity>

      <View style={styles.poweredBy}>
        <Text style={styles.poweredTxt}>
          Powered by <Text style={{ color: "#10b981" }}>Quantum-7</Text> · 1.4T params
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: 22, paddingTop: 60 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  brand: { color: "#fff", fontSize: 28, fontWeight: "900", letterSpacing: -1 },
  aiPill: {
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
  aiPillTxt: { color: "#10b981", fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  subtitle: { color: "#6b7280", fontSize: 13, marginTop: 8, lineHeight: 18 },

  previewCard: { marginTop: 28, alignItems: "center" },
  previewLabel: { color: "#374151", fontSize: 10, fontWeight: "800", letterSpacing: 2, marginBottom: 10 },
  previewBox: {
    width: 200,
    height: 200,
    borderRadius: 16,
    backgroundColor: "#0a1d14",
    borderWidth: 1,
    borderColor: "#0f2e21",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  previewHint: { color: "#10b981", fontSize: 13, fontWeight: "600" },

  rangeRow: { flexDirection: "row", alignItems: "center", marginTop: 28, gap: 8 },
  rangeBox: {
    flex: 1,
    backgroundColor: "#0a1d14",
    borderWidth: 1,
    borderColor: "#0f2e21",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  rangeLabel: { color: "#374151", fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  rangeInput: { color: "#fff", fontSize: 26, fontWeight: "700", padding: 0, marginTop: 2 },
  divider: { paddingHorizontal: 4 },

  cta: {
    marginTop: 20,
    height: 56,
    borderRadius: 14,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#10b981",
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  ctaTxt: { color: "#000", fontSize: 16, fontWeight: "800" },
  poweredBy: { alignItems: "center", marginTop: 16, marginBottom: 28 },
  poweredTxt: { color: "#374151", fontSize: 11 },
});
