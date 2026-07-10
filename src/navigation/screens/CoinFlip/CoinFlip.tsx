import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Paywall } from "../../../components/Paywall";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const FREE_FLIPS = 3;

export default function CoinFlip() {
  const [side, setSide] = useState<"heads" | "tails">("heads");
  const [flips, setFlips] = useState(0);
  const [history, setHistory] = useState<("H" | "T")[]>([]);
  const [paywall, setPaywall] = useState(false);
  const [flipping, setFlipping] = useState(false);

  const flip = () => {
    // 👇 THE JOKE — after 3 free flips, hit the paywall
    if (flips >= FREE_FLIPS) {
      setPaywall(true);
      return;
    }
    setFlipping(true);
    setTimeout(() => {
      const next = Math.random() < 0.5 ? "heads" : "tails";
      setSide(next);
      const letter: "H" | "T" = next === "heads" ? "H" : "T";
      setHistory((h) => [letter, ...h].slice(0, 10));
      setFlips((f) => f + 1);
      setFlipping(false);
    }, 500);
  };

  const reset = () => {
    setFlips(0);
    setHistory([]);
  };

  const flipsLeft = Math.max(0, FREE_FLIPS - flips);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#1a1a2e", "#0a0a14"]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.header}>
        <Text style={styles.brand}>FlipCoin</Text>
        <View style={styles.proPill}>
          <Ionicons name="lock-closed" size={10} color="#fbbf24" />
          <Text style={styles.proPillTxt}>FREE · {flipsLeft} LEFT</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>The world's most premium coin</Text>

      {/* Coin */}
      <View style={styles.coinWrap}>
        <View style={styles.coinShadow} />
        <View style={[styles.coin, flipping && styles.coinFlipping]}>
          <LinearGradient
            colors={
              side === "heads"
                ? ["#fde047", "#fbbf24", "#d97706"]
                : ["#fde047", "#f59e0b", "#92400e"]
            }
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.coinInner}>
            {side === "heads" ? (
              <FontAwesome5 name="crown" size={64} color="#78350f" />
            ) : (
              <MaterialCommunityIcons name="star-circle" size={84} color="#78350f" />
            )}
            <Text style={styles.coinLabel}>{side.toUpperCase()}</Text>
          </View>
        </View>
      </View>

      {/* History */}
      <View style={styles.historyWrap}>
        <Text style={styles.historyLabel}>RECENT</Text>
        <View style={styles.historyRow}>
          {Array.from({ length: 10 }).map((_, i) => {
            const v = history[i];
            return (
              <View
                key={i}
                style={[
                  styles.historyDot,
                  v === "H" && { backgroundColor: "#fbbf24" },
                  v === "T" && { backgroundColor: "#a855f7" },
                ]}
              >
                {v && <Text style={styles.historyDotTxt}>{v}</Text>}
              </View>
            );
          })}
        </View>
      </View>

      {/* Action */}
      <TouchableOpacity
        style={styles.cta}
        onPress={flip}
        disabled={flipping}
        activeOpacity={0.85}
      >
        <LinearGradient
          colors={["#fbbf24", "#f59e0b"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <MaterialCommunityIcons name="rotate-360" size={22} color="#000" />
        <Text style={styles.ctaTxt}>{flipping ? "Flipping..." : "Flip Coin"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={reset} style={styles.resetBtn}>
        <Text style={styles.resetTxt}>Reset count</Text>
      </TouchableOpacity>

      <Paywall
        visible={paywall}
        onClose={() => setPaywall(false)}
        appName="FlipCoin"
        tagline="Unlock unlimited flips and so much more"
        accent="#fbbf24"
        features={[
          { icon: "infinity", label: "Unlimited coin flips", lib: "mci" },
          { icon: "hand-coin", label: "50+ premium coin designs", lib: "mci" },
          { icon: "history", label: "Full flip history", lib: "mci" },
          { icon: "chart-bar", label: "Heads/tails statistics", lib: "mci" },
          { icon: "block-helper", label: "Remove ads", lib: "mci" },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: 22, paddingTop: 60 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  brand: { color: "#fff", fontSize: 26, fontWeight: "900", letterSpacing: -1 },
  proPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "rgba(251,191,36,0.12)",
    borderWidth: 1,
    borderColor: "rgba(251,191,36,0.3)",
  },
  proPillTxt: { color: "#fbbf24", fontSize: 11, fontWeight: "800", letterSpacing: 1 },
  subtitle: { color: "#6b7280", fontSize: 14, marginTop: 6, textAlign: "center" },

  coinWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  coinShadow: {
    position: "absolute",
    bottom: 50,
    width: 180,
    height: 16,
    borderRadius: 90,
    backgroundColor: "rgba(0,0,0,0.6)",
    transform: [{ scaleX: 0.85 }],
  },
  coin: {
    width: 220,
    height: 220,
    borderRadius: 110,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#fde047",
    shadowColor: "#fbbf24",
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 10,
  },
  coinFlipping: { transform: [{ scaleX: 0.1 }] },
  coinInner: { flex: 1, alignItems: "center", justifyContent: "center" },
  coinLabel: {
    color: "#78350f",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 3,
    marginTop: 8,
  },

  historyWrap: { alignItems: "center", marginBottom: 24 },
  historyLabel: { color: "#6b7280", fontSize: 10, fontWeight: "800", letterSpacing: 2, marginBottom: 8 },
  historyRow: { flexDirection: "row", gap: 6 },
  historyDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#1a1a2e",
    borderWidth: 1,
    borderColor: "#27272a",
    alignItems: "center",
    justifyContent: "center",
  },
  historyDotTxt: { color: "#000", fontSize: 10, fontWeight: "900" },

  cta: {
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#fbbf24",
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  ctaTxt: { color: "#000", fontSize: 17, fontWeight: "800" },

  resetBtn: { alignItems: "center", marginTop: 16, marginBottom: 28 },
  resetTxt: { color: "#6b7280", fontSize: 13, textDecorationLine: "underline" },
});
