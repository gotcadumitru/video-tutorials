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
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type Move = "rock" | "paper" | "scissors";

const MOVES: { id: Move; icon: string; label: string }[] = [
  { id: "rock", icon: "hand-rock", label: "Rock" },
  { id: "paper", icon: "hand-paper", label: "Paper" },
  { id: "scissors", icon: "hand-scissors", label: "Scissors" },
];

function beats(a: Move, b: Move): "win" | "lose" | "draw" {
  if (a === b) return "draw";
  if (
    (a === "rock" && b === "scissors") ||
    (a === "paper" && b === "rock") ||
    (a === "scissors" && b === "paper")
  )
    return "win";
  return "lose";
}

function counter(m: Move): Move {
  if (m === "rock") return "paper";
  if (m === "paper") return "scissors";
  return "rock";
}

export default function AIRockPaperScissors() {
  const [yourMove, setYourMove] = useState<Move | null>(null);
  const [aiMove, setAiMove] = useState<Move | null>(null);
  const [score, setScore] = useState({ you: 0, ai: 0 });
  const [thinking, setThinking] = useState(false);
  const [result, setResult] = useState<"win" | "lose" | "draw" | null>(null);

  const play = (m: Move) => {
    setYourMove(m);
    // AI "predicts" your move (just random + occasionally counters)
    const ai: Move = Math.random() < 0.4 ? counter(m) : (MOVES[Math.floor(Math.random() * 3)].id);
    const r = beats(m, ai);
    setThinking(false);
    setTimeout(() => {
      setAiMove(ai);
      setResult(r);
      setThinking(true);
    }, 30);
  };

  const handleDone = () => {
    if (result === "win") setScore((s) => ({ ...s, you: s.you + 1 }));
    else if (result === "lose") setScore((s) => ({ ...s, ai: s.ai + 1 }));
  };

  const aiLabel = aiMove ? aiMove.toUpperCase() : "";
  const resultTxt =
    result === "win" ? "You win!" : result === "lose" ? "AI wins!" : "Draw";

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#1a1a2e", "#000"]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.header}>
        <Text style={styles.brand}>RPS-GPT</Text>
        <View style={styles.aiPill}>
          <MaterialCommunityIcons name="brain" size={10} color="#f59e0b" />
          <Text style={styles.aiPillTxt}>NEURAL CHAMP</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>
        AI predicts your move using deep behavioral analysis
      </Text>

      {/* Scoreboard */}
      <View style={styles.scoreboard}>
        <View style={styles.scoreCol}>
          <Text style={styles.scoreLabel}>YOU</Text>
          <Text style={styles.scoreVal}>{score.you}</Text>
        </View>
        <Text style={styles.scoreVs}>vs</Text>
        <View style={styles.scoreCol}>
          <Text style={[styles.scoreLabel, { color: "#f59e0b" }]}>AI</Text>
          <Text style={styles.scoreVal}>{score.ai}</Text>
        </View>
      </View>

      {/* Last round */}
      <View style={styles.lastRound}>
        <View style={styles.handBox}>
          {yourMove ? (
            <FontAwesome5 name={MOVES.find((m) => m.id === yourMove)!.icon as any} size={56} color="#fff" />
          ) : (
            <MaterialCommunityIcons name="hand-back-left-outline" size={56} color="#3f3f5c" />
          )}
          <Text style={styles.handLabel}>YOU</Text>
        </View>

        <View style={styles.vsCircle}>
          <Text style={styles.vsTxt}>VS</Text>
        </View>

        <View style={styles.handBox}>
          {thinking ? (
            <View style={styles.aiThinkBox}>
              <AIThinking
                active={thinking}
                steps={[
                  { text: "Activating front camera (jk)..." },
                  { text: "Analyzing your micro-expressions..." },
                  { text: "Loading 1.4B RPS games dataset..." },
                  { text: `Reviewing your move history (n=${score.you + score.ai})...` },
                  { text: "Predicting your move with HandNet-v4..." },
                  { text: "Computing counter-strategy..." },
                  { text: "Detecting psychological warfare..." },
                  { text: "Consulting Bobby Fischer (for some reason)..." },
                ]}
                result={aiLabel}
                accent="#f59e0b"
                resultSize={28}
                thinkingSize={11}
                onDone={handleDone}
              />
            </View>
          ) : aiMove ? (
            <FontAwesome5
              name={MOVES.find((m) => m.id === aiMove)!.icon as any}
              size={56}
              color="#f59e0b"
            />
          ) : (
            <MaterialCommunityIcons name="brain" size={56} color="#3f3f5c" />
          )}
          <Text style={[styles.handLabel, { color: "#f59e0b" }]}>AI</Text>
        </View>
      </View>

      {result && !thinking && (
        <View style={styles.resultBanner}>
          <Text style={[styles.resultTxt, {
            color: result === "win" ? "#10b981" : result === "lose" ? "#ef4444" : "#a3a3a3",
          }]}>{resultTxt}</Text>
        </View>
      )}

      <Text style={styles.pickLabel}>Pick your move</Text>
      <View style={styles.moves}>
        {MOVES.map((m) => (
          <TouchableOpacity
            key={m.id}
            onPress={() => play(m.id)}
            style={styles.moveBtn}
            activeOpacity={0.85}
          >
            <FontAwesome5 name={m.icon as any} size={36} color="#fff" />
            <Text style={styles.moveTxt}>{m.label}</Text>
          </TouchableOpacity>
        ))}
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
    backgroundColor: "rgba(245,158,11,0.12)",
    borderWidth: 1,
    borderColor: "rgba(245,158,11,0.3)",
  },
  aiPillTxt: { color: "#f59e0b", fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  subtitle: { color: "#6b7280", fontSize: 13, marginTop: 8 },

  scoreboard: {
    flexDirection: "row",
    backgroundColor: "#0f0f1f",
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
    borderWidth: 1,
    borderColor: "#1f1f2e",
  },
  scoreCol: { alignItems: "center" },
  scoreLabel: { color: "#fff", fontSize: 11, fontWeight: "800", letterSpacing: 2 },
  scoreVal: { color: "#fff", fontSize: 36, fontWeight: "900", marginTop: 2 },
  scoreVs: { color: "#374151", fontSize: 13, fontWeight: "700" },

  lastRound: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 28,
    paddingHorizontal: 8,
  },
  handBox: { alignItems: "center", gap: 8, minWidth: 130 },
  aiThinkBox: { width: 130, height: 60, alignItems: "center", justifyContent: "center" },
  handLabel: { color: "#fff", fontSize: 11, fontWeight: "800", letterSpacing: 1 },
  vsCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
  },
  vsTxt: { color: "#374151", fontSize: 11, fontWeight: "900", letterSpacing: 1 },
  resultBanner: { alignItems: "center", marginTop: 20 },
  resultTxt: { fontSize: 22, fontWeight: "900" },

  pickLabel: {
    color: "#6b7280",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    marginTop: 28,
    textAlign: "center",
  },
  moves: { flexDirection: "row", gap: 10, marginTop: 12, marginBottom: 28 },
  moveBtn: {
    flex: 1,
    backgroundColor: "#0f0f1f",
    borderWidth: 1,
    borderColor: "#1f1f2e",
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
    gap: 8,
  },
  moveTxt: { color: "#fff", fontSize: 13, fontWeight: "700" },
});
