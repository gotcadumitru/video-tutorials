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

const RECENT_QS = [
  "Should I order pizza tonight?",
  "Will I get the job?",
  "Should I text my ex?",
  "Is now a good time to refactor?",
];

export default function AIYesNo() {
  const [question, setQuestion] = useState("");
  const [thinking, setThinking] = useState(false);
  const [result, setResult] = useState("");

  const ask = () => {
    if (!question.trim()) return;
    const verdict = Math.random() < 0.5 ? "YES" : "NO";
    setThinking(false);
    setTimeout(() => {
      setResult(verdict);
      setThinking(true);
    }, 30);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#1e1b4b", "#000"]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.header}>
        <Text style={styles.brand}>Decide.ai</Text>
        <View style={styles.aiPill}>
          <MaterialCommunityIcons name="brain" size={10} color="#a855f7" />
          <Text style={styles.aiPillTxt}>AI ORACLE</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>
        The world's smartest yes/no machine,{"\n"}powered by deep ethics AI
      </Text>

      <View style={styles.heroWrap}>
        <View style={styles.heroCircleOuter}>
          <LinearGradient
            colors={["#a855f7", "#5b21b6"]}
            style={StyleSheet.absoluteFill}
          />
        </View>
        <View style={styles.heroCircle}>
          {thinking ? (
            <AIThinking
              active={thinking}
              steps={[
                { text: "Loading EthicsGPT-7..." },
                { text: "Convening AI Ethics Committee..." },
                { text: "Parsing moral implications..." },
                { text: "Consulting Kantian deontology..." },
                { text: "Running utilitarian simulations..." },
                { text: "Asking Aristotle's ghost..." },
                { text: "Weighing 47 dimensions..." },
                { text: "Achieving committee consensus..." },
                { text: "Generating binary verdict..." },
              ]}
              result={result}
              accent="#a855f7"
              resultSize={64}
              thinkingSize={12}
            />
          ) : (
            <>
              <MaterialCommunityIcons name="head-question" size={80} color="#fff" />
              <Text style={styles.heroTxt}>YES{"  "}or{"  "}NO</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.inputCard}>
        <Text style={styles.label}>Your question</Text>
        <TextInput
          value={question}
          onChangeText={setQuestion}
          placeholder="Should I quit my job and start a startup?"
          placeholderTextColor="#4c4670"
          style={styles.input}
          multiline
        />
      </View>

      <Text style={styles.suggestLabel}>OR TRY ONE OF THESE</Text>
      <View style={styles.suggestions}>
        {RECENT_QS.map((q) => (
          <TouchableOpacity
            key={q}
            onPress={() => setQuestion(q)}
            style={styles.suggestionPill}
          >
            <Text style={styles.suggestionTxt}>{q}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={ask}
        style={[styles.cta, !question.trim() && styles.ctaDisabled]}
        disabled={!question.trim()}
        activeOpacity={0.85}
      >
        <LinearGradient
          colors={["#a855f7", "#7c3aed"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <MaterialCommunityIcons name="brain" size={20} color="#fff" />
        <Text style={styles.ctaTxt}>Ask the AI</Text>
        <Ionicons name="arrow-forward" size={18} color="#fff" />
      </TouchableOpacity>

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
    backgroundColor: "rgba(168,85,247,0.15)",
    borderWidth: 1,
    borderColor: "rgba(168,85,247,0.3)",
  },
  aiPillTxt: { color: "#a855f7", fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  subtitle: { color: "#9ca3af", fontSize: 13, marginTop: 8, lineHeight: 18 },

  heroWrap: {
    alignSelf: "center",
    marginTop: 16,
    width: 160,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  heroCircleOuter: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    opacity: 0.3,
  },
  heroCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1530",
    borderWidth: 2,
    borderColor: "#a855f7",
    paddingHorizontal: 18,
  },
  heroTxt: { color: "#a855f7", fontSize: 13, fontWeight: "800", marginTop: 4, letterSpacing: 1 },

  inputCard: {
    backgroundColor: "#1a1530",
    borderWidth: 1,
    borderColor: "#2a2545",
    borderRadius: 14,
    padding: 14,
    marginTop: 18,
  },
  label: { color: "#6b7280", fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  input: {
    color: "#fff",
    fontSize: 15,
    marginTop: 6,
    minHeight: 40,
    padding: 0,
  },

  suggestLabel: { color: "#4c4670", fontSize: 9, fontWeight: "800", letterSpacing: 1.5, marginTop: 14 },
  suggestions: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 8 },
  suggestionPill: {
    backgroundColor: "#1a1530",
    borderWidth: 1,
    borderColor: "#2a2545",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  suggestionTxt: { color: "#cbd5e1", fontSize: 11 },

  cta: {
    marginTop: 20,
    height: 56,
    borderRadius: 14,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#a855f7",
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  ctaDisabled: { opacity: 0.4 },
  ctaTxt: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
