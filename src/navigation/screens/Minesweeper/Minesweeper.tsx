import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const SIZE = 9;
const MINES = 12;
const { width } = Dimensions.get("window");
const CELL = Math.floor((width - 32) / SIZE);

type Cell = {
  mine: boolean;
  revealed: boolean;
  flag: boolean;
  count: number;
};

type Board = Cell[][];

const NUM_COLOR: Record<number, string> = {
  1: "#3b82f6",
  2: "#10b981",
  3: "#ef4444",
  4: "#8b5cf6",
  5: "#f59e0b",
  6: "#06b6d4",
  7: "#f43f5e",
  8: "#e5e5e5",
};

function newBoard(): Board {
  const b: Board = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => ({
      mine: false,
      revealed: false,
      flag: false,
      count: 0,
    }))
  );
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * SIZE);
    const c = Math.floor(Math.random() * SIZE);
    if (!b[r][c].mine) {
      b[r][c].mine = true;
      placed++;
    }
  }
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) {
      if (b[r][c].mine) continue;
      let n = 0;
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nc >= 0 && nr < SIZE && nc < SIZE && b[nr][nc].mine) n++;
        }
      b[r][c].count = n;
    }
  return b;
}

function flood(board: Board, r: number, c: number): Board {
  const b = board.map((row) => row.map((cell) => ({ ...cell })));
  const stack: [number, number][] = [[r, c]];
  while (stack.length) {
    const [y, x] = stack.pop()!;
    if (y < 0 || x < 0 || y >= SIZE || x >= SIZE) continue;
    const cell = b[y][x];
    if (cell.revealed || cell.flag || cell.mine) continue;
    cell.revealed = true;
    if (cell.count === 0) {
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++)
          if (dr || dc) stack.push([y + dr, x + dc]);
    }
  }
  return b;
}

function checkWin(board: Board): boolean {
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) {
      const cell = board[r][c];
      if (!cell.mine && !cell.revealed) return false;
    }
  return true;
}

export default function Minesweeper() {
  const [board, setBoard] = useState<Board>(newBoard);
  const [flagMode, setFlagMode] = useState(false);
  const [status, setStatus] = useState<"playing" | "lost" | "won">("playing");
  const [time, setTime] = useState(0);
  const [flagsLeft, setFlagsLeft] = useState(MINES);
  const startedRef = useRef(false);

  useEffect(() => {
    if (status !== "playing" || !startedRef.current) return;
    const id = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [status]);

  const tap = (r: number, c: number) => {
    if (status !== "playing") return;
    startedRef.current = true;
    const cell = board[r][c];
    if (cell.revealed) return;

    if (flagMode) {
      const b = board.map((row) => row.map((c2) => ({ ...c2 })));
      b[r][c].flag = !b[r][c].flag;
      setBoard(b);
      setFlagsLeft((f) => f + (b[r][c].flag ? -1 : 1));
      return;
    }

    if (cell.flag) return;
    if (cell.mine) {
      const b = board.map((row) =>
        row.map((c2) => ({ ...c2, revealed: c2.mine || c2.revealed }))
      );
      setBoard(b);
      setStatus("lost");
      return;
    }
    const b = flood(board, r, c);
    setBoard(b);
    if (checkWin(b)) setStatus("won");
  };

  const longTap = (r: number, c: number) => {
    if (status !== "playing") return;
    const cell = board[r][c];
    if (cell.revealed) return;
    const b = board.map((row) => row.map((c2) => ({ ...c2 })));
    b[r][c].flag = !b[r][c].flag;
    setBoard(b);
    setFlagsLeft((f) => f + (b[r][c].flag ? -1 : 1));
  };

  const reset = () => {
    setBoard(newBoard());
    setStatus("playing");
    setTime(0);
    setFlagsLeft(MINES);
    startedRef.current = false;
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Minesweeper</Text>
      </View>

      <View style={styles.statusBar}>
        <View style={styles.statBox}>
          <MaterialCommunityIcons name="flag-variant" size={18} color="#f43f5e" />
          <Text style={styles.statTxt}>{flagsLeft.toString().padStart(2, "0")}</Text>
        </View>

        <TouchableOpacity onPress={reset} style={styles.faceBtn}>
          {status === "won" ? (
            <Ionicons name="happy" size={32} color="#fbbf24" />
          ) : status === "lost" ? (
            <Ionicons name="sad" size={32} color="#f43f5e" />
          ) : (
            <Ionicons name="happy-outline" size={32} color="#fbbf24" />
          )}
        </TouchableOpacity>

        <View style={styles.statBox}>
          <Ionicons name="time-outline" size={18} color="#22d3ee" />
          <Text style={styles.statTxt}>{time.toString().padStart(3, "0")}</Text>
        </View>
      </View>

      <View style={styles.boardWrap}>
        <View style={styles.board}>
          {board.map((row, r) => (
            <View key={r} style={{ flexDirection: "row" }}>
              {row.map((cell, c) => {
                const dark = (r + c) % 2 === 0;
                let bg = cell.revealed
                  ? dark ? "#1a1a25" : "#22222e"
                  : dark ? "#2c5d3f" : "#347448";
                if (cell.revealed && cell.mine) bg = "#ef4444";
                return (
                  <TouchableOpacity
                    key={c}
                    onPress={() => tap(r, c)}
                    onLongPress={() => longTap(r, c)}
                    style={[
                      styles.cell,
                      {
                        backgroundColor: bg,
                        width: CELL,
                        height: CELL,
                      },
                    ]}
                    activeOpacity={0.85}
                  >
                    {cell.revealed && cell.mine && (
                      <MaterialCommunityIcons name="bomb" size={CELL * 0.55} color="#0a0a0a" />
                    )}
                    {cell.revealed && !cell.mine && cell.count > 0 && (
                      <Text
                        style={{
                          color: NUM_COLOR[cell.count],
                          fontSize: CELL * 0.5,
                          fontWeight: "900",
                        }}
                      >
                        {cell.count}
                      </Text>
                    )}
                    {!cell.revealed && cell.flag && (
                      <MaterialCommunityIcons name="flag-variant" size={CELL * 0.55} color="#f43f5e" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.toolbar}>
        <TouchableOpacity
          style={[styles.toolBtn, !flagMode && styles.toolActive]}
          onPress={() => setFlagMode(false)}
        >
          <MaterialCommunityIcons name="pickaxe" size={20} color={!flagMode ? "#0a0a0f" : "#fff"} />
          <Text style={[styles.toolTxt, !flagMode && styles.toolTxtActive]}>Dig</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toolBtn, flagMode && styles.toolActive]}
          onPress={() => setFlagMode(true)}
        >
          <MaterialCommunityIcons name="flag-variant" size={20} color={flagMode ? "#0a0a0f" : "#fff"} />
          <Text style={[styles.toolTxt, flagMode && styles.toolTxtActive]}>Flag</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.hint}>Tip: long-press to flag a cell</Text>

      {status !== "playing" && (
        <View style={styles.endOverlay}>
          <View style={styles.endCard}>
            <Ionicons
              name={status === "won" ? "trophy" : "skull"}
              size={64}
              color={status === "won" ? "#fbbf24" : "#f43f5e"}
            />
            <Text style={styles.endTitle}>{status === "won" ? "You won!" : "Boom"}</Text>
            <Text style={styles.endSub}>
              {status === "won" ? `Cleared in ${time}s` : "Better luck next time"}
            </Text>
            <TouchableOpacity onPress={reset} style={styles.endBtn}>
              <Text style={styles.endBtnTxt}>New Game</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0a0a0f", paddingTop: 56 },
  header: { paddingHorizontal: 20, paddingBottom: 8 },
  title: { color: "#fff", fontSize: 28, fontWeight: "900", letterSpacing: -0.5 },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#15151f",
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  statBox: { flexDirection: "row", alignItems: "center", gap: 6 },
  statTxt: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1,
    fontFamily: "Courier",
  },
  faceBtn: { padding: 4 },
  boardWrap: { alignItems: "center", marginTop: 16 },
  board: {
    borderWidth: 2,
    borderColor: "#1f1f2a",
  },
  cell: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.2)",
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 24,
    paddingHorizontal: 16,
  },
  toolBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#15151f",
    borderWidth: 1.5,
    borderColor: "#1f1f2a",
  },
  toolActive: { backgroundColor: "#fff", borderColor: "#fff" },
  toolTxt: { color: "#fff", fontWeight: "700" },
  toolTxtActive: { color: "#0a0a0f" },
  hint: { color: "#5a5a6a", fontSize: 11, textAlign: "center", marginTop: 14 },
  endOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
    alignItems: "center",
    justifyContent: "center",
  },
  endCard: {
    backgroundColor: "#15151f",
    paddingHorizontal: 40,
    paddingVertical: 32,
    borderRadius: 12,
    alignItems: "center",
  },
  endTitle: { color: "#fff", fontSize: 28, fontWeight: "900", marginTop: 12 },
  endSub: { color: "#7a7595", fontSize: 14, marginTop: 4 },
  endBtn: {
    marginTop: 24,
    backgroundColor: "#fff",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 8,
  },
  endBtnTxt: { color: "#0a0a0f", fontWeight: "800" },
});
