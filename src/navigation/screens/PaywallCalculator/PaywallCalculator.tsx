import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import { Paywall } from "../../../components/Paywall";
import Ionicons from "@expo/vector-icons/Ionicons";

type Op = "+" | "-" | "×" | "÷" | null;

export default function PaywallCalculator() {
  const [display, setDisplay] = useState("0");
  const [previous, setPrevious] = useState<number | null>(null);
  const [op, setOp] = useState<Op>(null);
  const [resetNext, setResetNext] = useState(false);
  const [paywall, setPaywall] = useState(false);

  const inputDigit = (d: string) => {
    if (display === "0" || resetNext) {
      setDisplay(d);
      setResetNext(false);
    } else {
      setDisplay(display + d);
    }
  };

  const inputDot = () => {
    if (resetNext) {
      setDisplay("0.");
      setResetNext(false);
      return;
    }
    if (!display.includes(".")) setDisplay(display + ".");
  };

  const inputOp = (next: Op) => {
    const val = parseFloat(display);
    if (previous == null) {
      setPrevious(val);
    } else if (op) {
      const result = compute(previous, val, op);
      setPrevious(result);
      setDisplay(format(result));
    }
    setOp(next);
    setResetNext(true);
  };

  // 👇 THE JOKE — equals shows the paywall instead of computing
  const equals = () => {
    setPaywall(true);
  };

  const clear = () => {
    setDisplay("0");
    setPrevious(null);
    setOp(null);
    setResetNext(false);
  };

  const sign = () => {
    setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display);
  };

  const percent = () => {
    setDisplay(format(parseFloat(display) / 100));
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.brand}>Calc</Text>
        <View style={styles.proPill}>
          <Ionicons name="lock-closed" size={10} color="#fbbf24" />
          <Text style={styles.proPillTxt}>FREE</Text>
        </View>
      </View>

      <View style={styles.displayWrap}>
        <Text style={styles.display} numberOfLines={1} adjustsFontSizeToFit>
          {display}
        </Text>
        {previous != null && op && (
          <Text style={styles.history}>
            {format(previous)} {op}
          </Text>
        )}
      </View>

      <View style={styles.pad}>
        <Row>
          <Btn label="C" onPress={clear} variant="util" />
          <Btn label="±" onPress={sign} variant="util" />
          <Btn label="%" onPress={percent} variant="util" />
          <Btn label="÷" onPress={() => inputOp("÷")} variant="op" active={op === "÷"} />
        </Row>
        <Row>
          <Btn label="7" onPress={() => inputDigit("7")} />
          <Btn label="8" onPress={() => inputDigit("8")} />
          <Btn label="9" onPress={() => inputDigit("9")} />
          <Btn label="×" onPress={() => inputOp("×")} variant="op" active={op === "×"} />
        </Row>
        <Row>
          <Btn label="4" onPress={() => inputDigit("4")} />
          <Btn label="5" onPress={() => inputDigit("5")} />
          <Btn label="6" onPress={() => inputDigit("6")} />
          <Btn label="-" onPress={() => inputOp("-")} variant="op" active={op === "-"} />
        </Row>
        <Row>
          <Btn label="1" onPress={() => inputDigit("1")} />
          <Btn label="2" onPress={() => inputDigit("2")} />
          <Btn label="3" onPress={() => inputDigit("3")} />
          <Btn label="+" onPress={() => inputOp("+")} variant="op" active={op === "+"} />
        </Row>
        <Row>
          <Btn label="0" onPress={() => inputDigit("0")} wide />
          <Btn label="." onPress={inputDot} />
          <Btn label="=" onPress={equals} variant="eq" />
        </Row>
      </View>

      <Paywall
        visible={paywall}
        onClose={() => setPaywall(false)}
        appName="Calc"
        tagline="Get the equals sign and so much more"
        accent="#f97316"
        features={[
          { icon: "infinite", label: "Unlimited calculations", lib: "ion" },
          { icon: "calculator-variant", label: "Scientific mode", lib: "mci" },
          { icon: "history", label: "Calculation history", lib: "mci" },
          { icon: "color-palette-outline", label: "20+ premium themes", lib: "ion" },
          { icon: "block-helper", label: "Remove all ads forever", lib: "mci" },
        ]}
      />
    </View>
  );
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
  active,
}: {
  label: string;
  onPress: () => void;
  variant?: "num" | "op" | "util" | "eq";
  wide?: boolean;
  active?: boolean;
}) {
  const bg =
    variant === "num"
      ? "#1f1f24"
      : variant === "op"
      ? active ? "#fff" : "#f97316"
      : variant === "eq"
      ? "#f97316"
      : "#3a3a40";
  const fg =
    variant === "op" && active
      ? "#f97316"
      : variant === "util"
      ? "#0a0a0a"
      : "#fff";
  const { width } = useWindowDimensions();
  const BTN = (width - 60) / 4;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[
        styles.btn,
        { backgroundColor: bg, width: wide ? BTN * 2 + 12 : BTN, height: BTN, borderRadius: BTN / 2 },
      ]}
    >
      <Text
        style={[
          styles.btnTxt,
          { color: fg, textAlign: wide ? "left" : "center", paddingLeft: wide ? 28 : 0 },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0a0a0a", paddingHorizontal: 20, paddingTop: 60 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 16,
  },
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
  btn: {
    alignItems: "center",
    justifyContent: "center",
  },
  btnTxt: { fontSize: 30, fontWeight: "500" },
});
