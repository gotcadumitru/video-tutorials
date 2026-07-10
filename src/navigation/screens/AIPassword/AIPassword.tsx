import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AIThinking } from "../../../components/AIThinking";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = LOWER.toUpperCase();
const DIGITS = "0123456789";
const SYMBOLS = "!@#$%^&*";

type Toggle = "upper" | "digits" | "symbols";

export default function AIPassword() {
  const [length, setLength] = useState(16);
  const [toggles, setToggles] = useState<Record<Toggle, boolean>>({
    upper: true,
    digits: true,
    symbols: true,
  });
  const [thinking, setThinking] = useState(false);
  const [result, setResult] = useState("");

  const generate = () => {
    let pool = LOWER;
    if (toggles.upper) pool += UPPER;
    if (toggles.digits) pool += DIGITS;
    if (toggles.symbols) pool += SYMBOLS;
    let pwd = "";
    for (let i = 0; i < length; i++) {
      pwd += pool[Math.floor(Math.random() * pool.length)];
    }
    setThinking(false);
    setTimeout(() => {
      setResult(pwd);
      setThinking(true);
    }, 30);
  };

  const toggle = (k: Toggle) => setToggles((t) => ({ ...t, [k]: !t[k] }));

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#1e293b", "#000"]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.header}>
        <Text style={styles.brand}>PassGPT</Text>
        <View style={styles.aiPill}>
          <MaterialCommunityIcons name="shield-key" size={11} color="#ef4444" />
          <Text style={styles.aiPillTxt}>AI SECURED</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>
        Passwords crafted by AI.{"\n"}1000x more secure than human-generated.
      </Text>

      {/* Length control */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardLabel}>LENGTH</Text>
          <View style={styles.lengthBadge}>
            <Text style={styles.lengthVal}>{length}</Text>
          </View>
        </View>
        <View style={styles.lengthRow}>
          <TouchableOpacity
            onPress={() => setLength(Math.max(8, length - 1))}
            style={styles.lenBtn}
          >
            <Ionicons name="remove" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={styles.lengthBar}>
            <View
              style={[
                styles.lengthFill,
                { width: `${((length - 8) / (64 - 8)) * 100}%` },
              ]}
            />
          </View>
          <TouchableOpacity
            onPress={() => setLength(Math.min(64, length + 1))}
            style={styles.lenBtn}
          >
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Toggles */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>CHARACTER SETS</Text>
        <View style={styles.toggleList}>
          <Toggle label="abc" hint="Lowercase" on disabled />
          <Toggle
            label="ABC"
            hint="Uppercase"
            on={toggles.upper}
            onPress={() => toggle("upper")}
          />
          <Toggle
            label="123"
            hint="Numbers"
            on={toggles.digits}
            onPress={() => toggle("digits")}
          />
          <Toggle
            label="@#$"
            hint="Symbols"
            on={toggles.symbols}
            onPress={() => toggle("symbols")}
          />
        </View>
      </View>

      {/* Output preview */}
      <View style={styles.preview}>
        {thinking ? (
          <AIThinking
            active={thinking}
            steps={[
              { text: "Loading SecureLLM-v3..." },
              { text: "Scanning 14B leaked passwords (HaveIBeenPwned)..." },
              { text: "Avoiding top 100k worst passwords..." },
              { text: "Brainstorming creative character sequences..." },
              { text: "Sampling entropy from atmospheric noise..." },
              { text: "Adding cosmic radiation seasoning..." },
              { text: `Selecting ${length} characters from approved pool...` },
              { text: "Running adversarial attack simulation..." },
              { text: "Estimating crack time: 2.4 quintillion years..." },
              { text: "Validating with NIST SP 800-63B..." },
            ]}
            result={result}
            accent="#ef4444"
            resultSize={18}
            thinkingSize={11}
          />
        ) : (
          <>
            <View style={styles.previewIcon}>
              <MaterialCommunityIcons name="lock-outline" size={20} color="#ef4444" />
            </View>
            <Text style={styles.previewTxt} numberOfLines={1}>
              {result || "your AI-generated password will appear here"}
            </Text>
          </>
        )}
      </View>

      <TouchableOpacity
        onPress={generate}
        style={styles.cta}
        activeOpacity={0.85}
      >
        <LinearGradient
          colors={["#ef4444", "#b91c1c"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <MaterialCommunityIcons name="brain" size={20} color="#fff" />
        <Text style={styles.ctaTxt}>Generate with AI</Text>
      </TouchableOpacity>

    </View>
  );
}

function Toggle({
  label,
  hint,
  on,
  onPress,
  disabled,
}: {
  label: string;
  hint: string;
  on: boolean;
  onPress?: () => void;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.toggle, on && styles.toggleOn, disabled && { opacity: 0.6 }]}
    >
      <Text style={[styles.toggleLbl, on && styles.toggleLblOn]}>{label}</Text>
      <Text style={[styles.toggleHint, on && styles.toggleHintOn]}>{hint}</Text>
    </TouchableOpacity>
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
    backgroundColor: "rgba(239,68,68,0.12)",
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.3)",
  },
  aiPillTxt: { color: "#ef4444", fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  subtitle: { color: "#6b7280", fontSize: 13, marginTop: 8, lineHeight: 18 },

  card: {
    marginTop: 16,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 14,
    padding: 14,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardLabel: { color: "#6b7280", fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  lengthBadge: {
    backgroundColor: "#1e293b",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  lengthVal: { color: "#fff", fontSize: 16, fontWeight: "900" },
  lengthRow: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 12 },
  lenBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#1e293b",
    alignItems: "center",
    justifyContent: "center",
  },
  lengthBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#1e293b",
    overflow: "hidden",
  },
  lengthFill: { height: 6, backgroundColor: "#ef4444", borderRadius: 3 },

  toggleList: { flexDirection: "row", gap: 6, marginTop: 12 },
  toggle: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
    alignItems: "center",
  },
  toggleOn: { backgroundColor: "#7f1d1d", borderColor: "#ef4444" },
  toggleLbl: { color: "#6b7280", fontSize: 14, fontWeight: "800" },
  toggleLblOn: { color: "#fff" },
  toggleHint: { color: "#374151", fontSize: 9, marginTop: 2, fontWeight: "600" },
  toggleHintOn: { color: "#fecaca" },

  preview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 16,
    backgroundColor: "#0f172a",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  previewIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#1e293b",
    alignItems: "center",
    justifyContent: "center",
  },
  previewTxt: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Courier",
  },

  cta: {
    marginTop: 16,
    height: 56,
    borderRadius: 14,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#ef4444",
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  ctaTxt: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
