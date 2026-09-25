import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const WORDS = [
  "REACT", "PIXEL", "BRAVE", "STORM", "OCEAN", "FLAME", "NIGHT", "MAPLE",
  "GRAPE", "SHARP", "LUNAR", "ROYAL", "CIDER", "PRIME", "SPARK", "ANGEL",
  "TIGER", "PIANO", "SUGAR", "SOLAR", "CLOUD", "RAVEN", "CRISP", "AMBER",
];

const ROWS = 6;
const LEN = 5;

type State = "empty" | "tbd" | "absent" | "present" | "correct";

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
];

function evaluate(guess: string, answer: string): State[] {
  const result: State[] = Array(LEN).fill("absent");
  const remaining: (string | null)[] = answer.split("");
  for (let i = 0; i < LEN; i++) {
    if (guess[i] === answer[i]) {
      result[i] = "correct";
      remaining[i] = null;
    }
  }
  for (let i = 0; i < LEN; i++) {
    if (result[i] === "correct") continue;
    const idx = remaining.indexOf(guess[i]);
    if (idx !== -1) {
      result[i] = "present";
      remaining[idx] = null;
    }
  }
  return result;
}

const COLOR: Record<State, string> = {
  empty: "transparent",
  tbd: "transparent",
  absent: "#3a3a3c",
  present: "#b59f3b",
  correct: "#538d4e",
};

export default function Wordle() {
  const { width } = useWindowDimensions();
  const TILE = Math.min((width - 80) / LEN, 60);
  const [answer, setAnswer] = useState(() => WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [evals, setEvals] = useState<State[][]>([]);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const [shake, setShake] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const keyState = useMemo(() => {
    const m: Record<string, State> = {};
    guesses.forEach((g, gi) => {
      const e = evals[gi];
      for (let i = 0; i < LEN; i++) {
        const ch = g[i];
        const cur = m[ch];
        if (cur === "correct") continue;
        if (e[i] === "correct") m[ch] = "correct";
        else if (e[i] === "present") m[ch] = "present";
        else if (!cur) m[ch] = "absent";
      }
    });
    return m;
  }, [guesses, evals]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1500);
  };

  const onKey = (k: string) => {
    if (status !== "playing") return;
    if (k === "BACK") {
      setCurrent((c) => c.slice(0, -1));
      return;
    }
    if (k === "ENTER") {
      if (current.length !== LEN) {
        setShake(true);
        setTimeout(() => setShake(false), 400);
        showToast("Not enough letters");
        return;
      }
      const e = evaluate(current, answer);
      const newGuesses = [...guesses, current];
      const newEvals = [...evals, e];
      setGuesses(newGuesses);
      setEvals(newEvals);
      setCurrent("");
      if (current === answer) {
        setStatus("won");
        showToast(["Genius", "Magnificent", "Impressive", "Splendid", "Great", "Phew"][newGuesses.length - 1]);
      } else if (newGuesses.length >= ROWS) {
        setStatus("lost");
        showToast(answer);
      }
      return;
    }
    if (current.length < LEN) setCurrent((c) => c + k);
  };

  const reset = () => {
    setAnswer(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setGuesses([]);
    setEvals([]);
    setCurrent("");
    setStatus("playing");
  };

  const rows = Array.from({ length: ROWS });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Wordle</Text>
        <View style={styles.headerActions}>
          <Ionicons name="stats-chart" size={22} color="#fff" />
          <Ionicons name="settings-outline" size={22} color="#fff" />
        </View>
      </View>

      {toast && (
        <View style={styles.toast}>
          <Text style={styles.toastTxt}>{toast}</Text>
        </View>
      )}

      <View style={styles.grid}>
        {rows.map((_, ri) => {
          const guess = guesses[ri];
          const isCurrent = ri === guesses.length && status === "playing";
          const e = evals[ri];
          return (
            <View
              key={ri}
              style={[styles.row, isCurrent && shake && styles.rowShake]}
            >
              {Array.from({ length: LEN }).map((__, ci) => {
                let letter = "";
                let state: State = "empty";
                if (guess) {
                  letter = guess[ci];
                  state = e[ci];
                } else if (isCurrent) {
                  letter = current[ci] || "";
                  state = letter ? "tbd" : "empty";
                }
                return (
                  <View
                    key={ci}
                    style={[
                      styles.tile,
                      {
                        width: TILE,
                        height: TILE,
                        backgroundColor: COLOR[state],
                        borderColor:
                          state === "empty"
                            ? "#3a3a3c"
                            : state === "tbd"
                            ? "#565758"
                            : "transparent",
                      },
                    ]}
                  >
                    <Text style={[styles.tileTxt, { fontSize: TILE * 0.5 }]}>{letter}</Text>
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>

      <View style={styles.keyboard}>
        {KEYS.map((row, ri) => (
          <View key={ri} style={styles.keyRow}>
            {row.map((k) => {
              const wide = k === "ENTER" || k === "BACK";
              const s = keyState[k];
              return (
                <TouchableOpacity
                  key={k}
                  onPress={() => onKey(k)}
                  style={[
                    styles.key,
                    wide && styles.keyWide,
                    s && { backgroundColor: COLOR[s] },
                  ]}
                  activeOpacity={0.7}
                >
                  {k === "BACK" ? (
                    <Ionicons name="backspace-outline" size={20} color="#fff" />
                  ) : (
                    <Text style={[styles.keyTxt, wide && styles.keyTxtWide]}>{k}</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      {status !== "playing" && (
        <View style={styles.endOverlay} pointerEvents="box-none">
          <View style={styles.endCard}>
            <Text style={styles.endTitle}>{status === "won" ? "You got it" : "So close"}</Text>
            <Text style={styles.endAnswer}>{answer}</Text>
            <TouchableOpacity onPress={reset} style={styles.endBtn}>
              <Text style={styles.endBtnTxt}>New Word</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#121213", paddingTop: 50 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#3a3a3c",
  },
  title: { color: "#fff", fontSize: 28, fontWeight: "900", letterSpacing: 2 },
  headerActions: { flexDirection: "row", gap: 16 },
  toast: {
    position: "absolute",
    top: 120,
    alignSelf: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 6,
    zIndex: 10,
  },
  toastTxt: { color: "#000", fontWeight: "800", fontSize: 13, letterSpacing: 1 },
  grid: { alignItems: "center", paddingTop: 24, gap: 6, flex: 1 },
  row: { flexDirection: "row", gap: 6 },
  rowShake: { transform: [{ translateX: 4 }] },
  tile: {
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
  },
  tileTxt: { color: "#fff", fontWeight: "800" },
  keyboard: { paddingHorizontal: 4, paddingBottom: 28, gap: 6 },
  keyRow: { flexDirection: "row", justifyContent: "center", gap: 4 },
  key: {
    flex: 1,
    height: 54,
    backgroundColor: "#818384",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 36,
  },
  keyWide: { flex: 1.5, maxWidth: 60 },
  keyTxt: { color: "#fff", fontSize: 14, fontWeight: "800" },
  keyTxtWide: { fontSize: 11 },
  endOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  endCard: {
    backgroundColor: "#1f1f20",
    paddingHorizontal: 32,
    paddingVertical: 28,
    borderRadius: 12,
    alignItems: "center",
  },
  endTitle: { color: "#fff", fontSize: 26, fontWeight: "900" },
  endAnswer: {
    color: "#538d4e",
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 4,
    marginTop: 8,
  },
  endBtn: {
    marginTop: 22,
    backgroundColor: "#538d4e",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 24,
  },
  endBtnTxt: { color: "#fff", fontWeight: "800", fontSize: 14, letterSpacing: 1 },
});
