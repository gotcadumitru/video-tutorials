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
import { Paywall } from "../../../components/Paywall";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ANSWERS = [
  { txt: "It is certain", tone: "yes" },
  { txt: "Without a doubt", tone: "yes" },
  { txt: "Yes — definitely", tone: "yes" },
  { txt: "Most likely", tone: "maybe" },
  { txt: "Signs point to yes", tone: "maybe" },
  { txt: "Ask again later", tone: "maybe" },
  { txt: "Cannot predict now", tone: "maybe" },
  { txt: "Don't count on it", tone: "no" },
  { txt: "My reply is no", tone: "no" },
  { txt: "Very doubtful", tone: "no" },
] as const;

type Answer = (typeof ANSWERS)[number];

const FREE_ASKS = 1;

export default function Magic8Ball() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [asks, setAsks] = useState(0);
  const [shaking, setShaking] = useState(false);
  const [paywall, setPaywall] = useState(false);

  const ask = () => {
    if (!question.trim()) return;
    // 👇 THE JOKE — after 1 free ask, paywall
    if (asks >= FREE_ASKS) {
      setPaywall(true);
      return;
    }
    setShaking(true);
    setAnswer(null);
    setTimeout(() => {
      setAnswer(ANSWERS[Math.floor(Math.random() * ANSWERS.length)]);
      setAsks((a) => a + 1);
      setShaking(false);
    }, 1200);
  };

  const toneColor =
    answer?.tone === "yes"
      ? "#10b981"
      : answer?.tone === "no"
      ? "#ef4444"
      : "#a855f7";

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#1e1b4b", "#0a0118"]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.header}>
        <Text style={styles.brand}>Oracle 8</Text>
        <View style={styles.proPill}>
          <Ionicons name="sparkles" size={10} color="#a855f7" />
          <Text style={styles.proPillTxt}>FREE</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>Ask the ball anything</Text>

      {/* The Ball */}
      <View style={styles.ballWrap}>
        <View style={styles.ballShadow} />
        <View style={[styles.ball, shaking && styles.ballShaking]}>
          <LinearGradient
            colors={["#3f3f5c", "#0a0a14", "#000"]}
            locations={[0, 0.6, 1]}
            style={StyleSheet.absoluteFill}
          />
          {/* highlight */}
          <View style={styles.ballHighlight} />

          {/* triangle window */}
          <View style={styles.triangleWindow}>
            {shaking ? (
              <MaterialCommunityIcons name="dots-horizontal" size={32} color={toneColor} />
            ) : answer ? (
              <Text style={[styles.answerTxt, { color: toneColor }]}>{answer.txt}</Text>
            ) : (
              <View style={styles.eightWrap}>
                <View style={styles.eightCircle}>
                  <Text style={styles.eightTxt}>8</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Input */}
      <View style={styles.inputWrap}>
        <TextInput
          value={question}
          onChangeText={setQuestion}
          placeholder="Will I get rich this year?"
          placeholderTextColor="#4c4670"
          style={styles.input}
          returnKeyType="done"
          onSubmitEditing={ask}
        />
        <TouchableOpacity
          onPress={ask}
          style={styles.cta}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={["#a855f7", "#7c3aed"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <MaterialCommunityIcons name="crystal-ball" size={20} color="#fff" />
          <Text style={styles.ctaTxt}>Ask the ball</Text>
        </TouchableOpacity>
      </View>

      <Paywall
        visible={paywall}
        onClose={() => setPaywall(false)}
        appName="Oracle 8"
        tagline="Unlock your spiritual future"
        accent="#a855f7"
        features={[
          { icon: "crystal-ball", label: "Unlimited questions", lib: "mci" },
          { icon: "star-shooting", label: "Daily horoscope", lib: "mci" },
          { icon: "moon-waning-crescent", label: "Lunar predictions", lib: "mci" },
          { icon: "cards-playing-outline", label: "Tarot card readings", lib: "mci" },
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
    backgroundColor: "rgba(168,85,247,0.15)",
    borderWidth: 1,
    borderColor: "rgba(168,85,247,0.3)",
  },
  proPillTxt: { color: "#a855f7", fontSize: 11, fontWeight: "800", letterSpacing: 1 },
  subtitle: { color: "#6b7280", fontSize: 14, marginTop: 6, textAlign: "center" },

  ballWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
  ballShadow: {
    position: "absolute",
    bottom: 30,
    width: 240,
    height: 22,
    borderRadius: 120,
    backgroundColor: "rgba(0,0,0,0.7)",
    transform: [{ scaleX: 0.85 }],
  },
  ball: {
    width: 280,
    height: 280,
    borderRadius: 140,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#1f1f2e",
  },
  ballShaking: { transform: [{ translateX: 4 }, { rotate: "-3deg" }] },
  ballHighlight: {
    position: "absolute",
    top: 30,
    left: 50,
    width: 80,
    height: 50,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.15)",
    transform: [{ rotate: "-20deg" }],
  },
  triangleWindow: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#0a0118",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "rgba(168,85,247,0.4)",
    padding: 12,
  },
  eightWrap: { alignItems: "center", justifyContent: "center" },
  eightCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  eightTxt: {
    color: "#000",
    fontSize: 44,
    fontWeight: "900",
  },
  answerTxt: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.5,
    lineHeight: 19,
  },

  inputWrap: { marginBottom: 28 },
  input: {
    height: 50,
    backgroundColor: "#1a1530",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2a2545",
    color: "#fff",
    fontSize: 15,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  cta: {
    height: 56,
    borderRadius: 14,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#a855f7",
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  ctaTxt: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
