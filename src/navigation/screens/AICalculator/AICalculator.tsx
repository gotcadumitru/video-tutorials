import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AIThinking, AIStep } from "../../../components/AIThinking";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get("window");
const BTN = (width - 60) / 4;

type Op = "+" | "-" | "×" | "÷" | null;

export default function AICalculator() {
  const [display, setDisplay] = useState("0");
  const [previous, setPrevious] = useState<number | null>(null);
  const [op, setOp] = useState<Op>(null);
  const [resetNext, setResetNext] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [aiResult, setAiResult] = useState("");

  const inputDigit = (d: string) => {
    if (thinking) setThinking(false);
    if (display === "0" || resetNext) {
      setDisplay(d);
      setResetNext(false);
    } else setDisplay(display + d);
  };

  const inputDot = () => {
    if (thinking) setThinking(false);
    if (resetNext) {
      setDisplay("0.");
      setResetNext(false);
      return;
    }
    if (!display.includes(".")) setDisplay(display + ".");
  };

  const inputOp = (next: Op) => {
    if (thinking) setThinking(false);
    setPrevious(parseFloat(display));
    setOp(next);
    setResetNext(true);
  };

  // 👇 THE JOKE — equals runs "AI" instead of math
  const equals = () => {
    if (previous == null || op == null) return;
    const b = parseFloat(display);
    const result = compute(previous, b, op);
    setAiResult(format(result));
    setDisplay(format(result));
    setPrevious(null);
    setOp(null);
    setResetNext(true);
    setThinking(true);
  };

  const clear = () => {
    setThinking(false);
    setDisplay("0");
    setPrevious(null);
    setOp(null);
    setResetNext(false);
  };

  const question =
    previous != null && op
      ? `${format(previous)} ${op} ${display}`
      : display;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#0a0118", "#000"]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>MathGPT</Text>
          <View style={styles.aiPillRow}>
            <View style={styles.aiPill}>
              <MaterialCommunityIcons name="brain" size={10} color="#22d3ee" />
              <Text style={styles.aiPillTxt}>AI-POWERED</Text>
            </View>
            <Text style={styles.aiSub}>Math, reimagined</Text>
          </View>
        </View>
      </View>

      <View style={styles.displayWrap}>
        {thinking ? (
          <AIThinking
            active={thinking}
            steps={buildSteps(question)}
            result={aiResult}
            resultLabel="Answer"
            accent="#22d3ee"
            resultSize={84}
            thinkingSize={14}
          />
        ) : (
          <>
            {previous != null && op && (
              <Text style={styles.history}>{format(previous)} {op}</Text>
            )}
            <Text style={styles.display} numberOfLines={1} adjustsFontSizeToFit>
              {display}
            </Text>
          </>
        )}
      </View>

      <View style={styles.pad}>
        <Row>
          <Btn label="AC" onPress={clear} variant="util" />
          <Btn label="±" onPress={() => setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display)} variant="util" />
          <Btn label="%" onPress={() => setDisplay(format(parseFloat(display) / 100))} variant="util" />
          <Btn label="÷" onPress={() => inputOp("÷")} variant="op" />
        </Row>
        <Row>
          <Btn label="7" onPress={() => inputDigit("7")} />
          <Btn label="8" onPress={() => inputDigit("8")} />
          <Btn label="9" onPress={() => inputDigit("9")} />
          <Btn label="×" onPress={() => inputOp("×")} variant="op" />
        </Row>
        <Row>
          <Btn label="4" onPress={() => inputDigit("4")} />
          <Btn label="5" onPress={() => inputDigit("5")} />
          <Btn label="6" onPress={() => inputDigit("6")} />
          <Btn label="-" onPress={() => inputOp("-")} variant="op" />
        </Row>
        <Row>
          <Btn label="1" onPress={() => inputDigit("1")} />
          <Btn label="2" onPress={() => inputDigit("2")} />
          <Btn label="3" onPress={() => inputDigit("3")} />
          <Btn label="+" onPress={() => inputOp("+")} variant="op" />
        </Row>
        <Row>
          <Btn label="0" onPress={() => inputDigit("0")} wide />
          <Btn label="." onPress={inputDot} />
          <Btn label="=" onPress={equals} variant="eq" />
        </Row>
      </View>

    </View>
  );
}

function buildSteps(question: string): AIStep[] {
  return [
    { text: "Initializing neural calculation engine..." },
    { text: "Connecting to MathGPT-7 (1.4T parameters)..." },
    { text: "Spinning up 8x NVIDIA H100 GPUs in us-east-1..." },
    { text: `Tokenizing operands from "${question}"...` },
    { text: "Embedding numerical representations..." },
    { text: "Cross-referencing with Wolfram Alpha API..." },
    { text: "Running 1.4 trillion parameter forward pass..." },
    { text: "Consulting MIT mathematics department dataset..." },
    { text: "Verifying answer with secondary safety model..." },
    { text: "Confidence threshold reached (99.7%)..." },
    { text: "Streaming answer..." },
  ];
}

function compute(a: number, b: number, op: Op): number {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "×": return a * b;
    case "÷": return b === 0 ? 0 : a / b;
    default: return b;
  }
}

function format(n: number): string {
  if (Number.isInteger(n)) return n.toString();
  return parseFloat(n.toFixed(8)).toString();
}

function Row({ children }: { children: React.ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

function Btn({
  label,
  onPress,
  variant = "num",
  wide,
}: {
  label: string;
  onPress: () => void;
  variant?: "num" | "op" | "util" | "eq";
  wide?: boolean;
}) {
  const bg =
    variant === "num"
      ? "#1a1530"
      : variant === "op"
      ? "#22d3ee"
      : variant === "eq"
      ? "transparent"
      : "#3f3f5c";
  const fg = variant === "op" ? "#000" : variant === "util" ? "#cbd5e1" : "#fff";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[styles.btn, { width: wide ? BTN * 2 + 12 : BTN }]}
    >
      {variant === "eq" ? (
        <View style={styles.eqBtn}>
          <LinearGradient
            colors={["#22d3ee", "#a855f7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <MaterialCommunityIcons name="brain" size={20} color="#000" />
          <Text style={[styles.btnTxt, { fontSize: 20, color: "#000" }]}>{label}</Text>
        </View>
      ) : (
        <View style={[styles.btnFill, { backgroundColor: bg }]}>
          <Text
            style={[
              styles.btnTxt,
              {
                color: fg,
                textAlign: wide ? "left" : "center",
                paddingLeft: wide ? 28 : 0,
              },
            ]}
          >
            {label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: 20, paddingTop: 60 },
  header: { paddingBottom: 16 },
  brand: { color: "#fff", fontSize: 28, fontWeight: "900", letterSpacing: -1 },
  aiPillRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 },
  aiPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: "rgba(34,211,238,0.12)",
    borderWidth: 1,
    borderColor: "rgba(34,211,238,0.3)",
  },
  aiPillTxt: { color: "#22d3ee", fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  aiSub: { color: "#6b7280", fontSize: 12 },
  displayWrap: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 24,
    alignItems: "flex-end",
  },
  history: { color: "#5a5a60", fontSize: 18, fontWeight: "500", marginBottom: 4 },
  display: { color: "#fff", fontSize: 84, fontWeight: "200", letterSpacing: -2 },
  pad: { gap: 12, paddingBottom: 32 },
  row: { flexDirection: "row", gap: 12 },
  btn: { height: BTN, borderRadius: BTN / 2, overflow: "hidden" },
  btnFill: {
    flex: 1,
    borderRadius: BTN / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  eqBtn: {
    flex: 1,
    flexDirection: "row",
    gap: 6,
    borderRadius: BTN / 2,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  btnTxt: { fontSize: 30, fontWeight: "500" },
});
