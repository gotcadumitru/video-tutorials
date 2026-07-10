import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import { Paywall } from "../../../components/Paywall";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type QRType = "url" | "text" | "wifi" | "email";

const TYPES: { id: QRType; icon: string; label: string; lib: "ion" | "mci" }[] = [
  { id: "url", icon: "link", label: "URL", lib: "ion" },
  { id: "text", icon: "document-text", label: "Text", lib: "ion" },
  { id: "wifi", icon: "wifi", label: "WiFi", lib: "mci" },
  { id: "email", icon: "mail", label: "Email", lib: "ion" },
];

export default function QRGenerator() {
  const [type, setType] = useState<QRType>("url");
  const [value, setValue] = useState("");
  const [paywall, setPaywall] = useState(false);

  // 👇 THE JOKE — generate shows the paywall
  const generate = () => {
    if (!value.trim()) return;
    setPaywall(true);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>QRify</Text>
            <Text style={styles.subtitle}>Beautiful QR codes in seconds</Text>
          </View>
          <View style={styles.proPill}>
            <Ionicons name="lock-closed" size={10} color="#22d3ee" />
            <Text style={styles.proPillTxt}>FREE</Text>
          </View>
        </View>

        {/* QR Preview area */}
        <View style={styles.previewCard}>
          <View style={styles.previewBox}>
            <FauxQR />
            <View style={styles.previewOverlay}>
              <MaterialCommunityIcons name="qrcode-scan" size={32} color="#fff" />
              <Text style={styles.previewHint}>Tap generate to see your QR</Text>
            </View>
          </View>
        </View>

        {/* Type selector */}
        <Text style={styles.label}>Type</Text>
        <View style={styles.typeRow}>
          {TYPES.map((t) => {
            const active = t.id === type;
            return (
              <TouchableOpacity
                key={t.id}
                onPress={() => setType(t.id)}
                style={[styles.typeBtn, active && styles.typeBtnActive]}
              >
                {t.lib === "mci" ? (
                  <MaterialCommunityIcons
                    name={t.icon as any}
                    size={20}
                    color={active ? "#000" : "#22d3ee"}
                  />
                ) : (
                  <Ionicons
                    name={t.icon as any}
                    size={20}
                    color={active ? "#000" : "#22d3ee"}
                  />
                )}
                <Text style={[styles.typeTxt, active && styles.typeTxtActive]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Input */}
        <Text style={styles.label}>Content</Text>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={
            type === "url"
              ? "https://yourwebsite.com"
              : type === "wifi"
              ? "Network name"
              : type === "email"
              ? "you@email.com"
              : "Enter any text"
          }
          placeholderTextColor="#3a3a40"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* Style options (visually present, useless without pro) */}
        <Text style={styles.label}>Style</Text>
        <View style={styles.styleRow}>
          {["#22d3ee", "#a855f7", "#10b981", "#f97316", "#ef4444"].map((c, i) => (
            <View key={c} style={styles.colorWrap}>
              <View style={[styles.colorDot, { backgroundColor: c }]}>
                {i > 0 && (
                  <View style={styles.lockOverlay}>
                    <Ionicons name="lock-closed" size={10} color="#fff" />
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          onPress={generate}
          style={[styles.cta, !value && styles.ctaDisabled]}
          disabled={!value}
          activeOpacity={0.85}
        >
          <MaterialCommunityIcons name="qrcode-plus" size={22} color="#000" />
          <Text style={styles.ctaTxt}>Generate QR Code</Text>
        </TouchableOpacity>

        <View style={styles.featurePeek}>
          <Ionicons name="lock-closed" size={12} color="#22d3ee" />
          <Text style={styles.featurePeekTxt}>
            Logo embedding · Custom shapes · Bulk export
          </Text>
        </View>
      </ScrollView>

      <Paywall
        visible={paywall}
        onClose={() => setPaywall(false)}
        appName="QRify"
        tagline="Generate unlimited QR codes with custom styling"
        accent="#22d3ee"
        features={[
          { icon: "qrcode-plus", label: "Unlimited QR generation", lib: "mci" },
          { icon: "palette", label: "Custom colors and shapes", lib: "mci" },
          { icon: "image", label: "Embed your logo", lib: "ion" },
          { icon: "download-outline", label: "Export as PNG, SVG, PDF", lib: "ion" },
          { icon: "block-helper", label: "Remove all ads", lib: "mci" },
        ]}
      />
    </View>
  );
}

function FauxQR() {
  // Static deterministic pattern that looks like a QR code
  const SIZE = 21;
  const seed = (i: number, j: number) =>
    ((i * 17 + j * 31 + i * j * 7) % 7 < 3);

  const cells: boolean[][] = Array.from({ length: SIZE }, (_, i) =>
    Array.from({ length: SIZE }, (_, j) => seed(i, j))
  );

  // finder patterns (corners)
  const drawFinder = (r: number, c: number) => {
    for (let i = 0; i < 7; i++)
      for (let j = 0; j < 7; j++) {
        const edge = i === 0 || i === 6 || j === 0 || j === 6;
        const inner = i >= 2 && i <= 4 && j >= 2 && j <= 4;
        cells[r + i][c + j] = edge || inner;
      }
  };
  drawFinder(0, 0);
  drawFinder(0, SIZE - 7);
  drawFinder(SIZE - 7, 0);

  return (
    <View style={qrStyles.grid}>
      {cells.map((row, i) => (
        <View key={i} style={{ flexDirection: "row" }}>
          {row.map((on, j) => (
            <View
              key={j}
              style={[
                qrStyles.cell,
                { backgroundColor: on ? "#fff" : "transparent" },
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const QR_CELL = 8;
const qrStyles = StyleSheet.create({
  grid: { backgroundColor: "transparent" },
  cell: { width: QR_CELL, height: QR_CELL },
});

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#06141a" },
  scroll: { paddingHorizontal: 22, paddingTop: 60, paddingBottom: 40 },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  brand: { color: "#fff", fontSize: 26, fontWeight: "900", letterSpacing: -1 },
  subtitle: { color: "#6b7280", fontSize: 13, marginTop: 2 },
  proPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "rgba(34,211,238,0.12)",
    borderWidth: 1,
    borderColor: "rgba(34,211,238,0.3)",
  },
  proPillTxt: { color: "#22d3ee", fontSize: 11, fontWeight: "800", letterSpacing: 1 },

  previewCard: {
    marginTop: 24,
    alignItems: "center",
  },
  previewBox: {
    width: SIZE_QR(),
    height: SIZE_QR(),
    backgroundColor: "#0a1f26",
    borderRadius: 18,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#0e2932",
    position: "relative",
    overflow: "hidden",
  },
  previewOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(6,20,26,0.85)",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  previewHint: { color: "#22d3ee", fontSize: 12, fontWeight: "600" },

  label: {
    color: "#6b7280",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 8,
  },
  typeRow: { flexDirection: "row", gap: 6 },
  typeBtn: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#0a1f26",
    borderWidth: 1,
    borderColor: "#0e2932",
  },
  typeBtnActive: { backgroundColor: "#22d3ee", borderColor: "#22d3ee" },
  typeTxt: { color: "#22d3ee", fontSize: 11, fontWeight: "700" },
  typeTxtActive: { color: "#000" },

  input: {
    backgroundColor: "#0a1f26",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#0e2932",
    color: "#fff",
    paddingHorizontal: 14,
    height: 48,
    fontSize: 14,
  },

  styleRow: { flexDirection: "row", gap: 10 },
  colorWrap: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  colorDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  lockOverlay: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#22d3ee",
  },

  cta: {
    marginTop: 24,
    height: 56,
    backgroundColor: "#22d3ee",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#22d3ee",
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  ctaDisabled: { backgroundColor: "#0a1f26", shadowOpacity: 0 },
  ctaTxt: { color: "#000", fontSize: 17, fontWeight: "800" },

  featurePeek: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 14,
  },
  featurePeekTxt: { color: "#22d3ee", fontSize: 11, fontWeight: "600" },
});

function SIZE_QR() {
  return QR_CELL * 21 + 24;
}
