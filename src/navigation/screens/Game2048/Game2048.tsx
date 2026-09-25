import React, { useRef, useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
  PanResponder,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const SIZE = 4;
const GAP = 8;

type Grid = number[][];

const TILE_STYLES: Record<number, { bg: string; fg: string; size: number }> = {
  0: { bg: "rgba(255,255,255,0.05)", fg: "#fff", size: 0 },
  2: { bg: "#3b3a4a", fg: "#f5f5dc", size: 32 },
  4: { bg: "#4d4b62", fg: "#f5f5dc", size: 32 },
  8: { bg: "#f59e0b", fg: "#1a1a25", size: 30 },
  16: { bg: "#f97316", fg: "#fff", size: 30 },
  32: { bg: "#ef4444", fg: "#fff", size: 28 },
  64: { bg: "#dc2626", fg: "#fff", size: 28 },
  128: { bg: "#fbbf24", fg: "#1a1a25", size: 24 },
  256: { bg: "#facc15", fg: "#1a1a25", size: 24 },
  512: { bg: "#eab308", fg: "#1a1a25", size: 22 },
  1024: { bg: "#a855f7", fg: "#fff", size: 18 },
  2048: { bg: "#22d3ee", fg: "#000", size: 18 },
  4096: { bg: "#10b981", fg: "#fff", size: 18 },
};

function emptyGrid(): Grid {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function addRandom(g: Grid): Grid {
  const empty: [number, number][] = [];
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) if (!g[r][c]) empty.push([r, c]);
  if (empty.length === 0) return g;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  const ng = g.map((row) => row.slice());
  ng[r][c] = Math.random() < 0.9 ? 2 : 4;
  return ng;
}

function slideRow(row: number[]): { row: number[]; gain: number } {
  const filtered = row.filter((v) => v !== 0);
  let gain = 0;
  for (let i = 0; i < filtered.length - 1; i++) {
    if (filtered[i] === filtered[i + 1]) {
      filtered[i] *= 2;
      gain += filtered[i];
      filtered.splice(i + 1, 1);
    }
  }
  while (filtered.length < SIZE) filtered.push(0);
  return { row: filtered, gain };
}

function transpose(g: Grid): Grid {
  const t = emptyGrid();
  for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) t[c][r] = g[r][c];
  return t;
}

function move(g: Grid, dir: "left" | "right" | "up" | "down"): { grid: Grid; gain: number; moved: boolean } {
  let work = g.map((r) => r.slice());
  if (dir === "up" || dir === "down") work = transpose(work);
  if (dir === "right" || dir === "down") work = work.map((r) => r.slice().reverse());

  let totalGain = 0;
  const next = work.map((row) => {
    const { row: nr, gain } = slideRow(row);
    totalGain += gain;
    return nr;
  });

  let result = next;
  if (dir === "right" || dir === "down") result = result.map((r) => r.slice().reverse());
  if (dir === "up" || dir === "down") result = transpose(result);

  const moved = JSON.stringify(result) !== JSON.stringify(g);
  return { grid: result, gain: totalGain, moved };
}

function isOver(g: Grid): boolean {
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) {
      if (g[r][c] === 0) return false;
      if (c + 1 < SIZE && g[r][c] === g[r][c + 1]) return false;
      if (r + 1 < SIZE && g[r][c] === g[r + 1][c]) return false;
    }
  return true;
}

export default function Game2048() {
  const { width } = useWindowDimensions();
  const BOARD = Math.min(width - 32, 380);
  const TILE = (BOARD - GAP * (SIZE + 1)) / SIZE;
  const [grid, setGrid] = useState<Grid>(() => addRandom(addRandom(emptyGrid())));
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [over, setOver] = useState(false);
  const gridRef = useRef(grid);
  gridRef.current = grid;

  const tryMove = (dir: "left" | "right" | "up" | "down") => {
    if (over) return;
    const { grid: ng, gain, moved } = move(gridRef.current, dir);
    if (!moved) return;
    const withRand = addRandom(ng);
    setGrid(withRand);
    setScore((s) => {
      const ns = s + gain;
      if (ns > best) setBest(ns);
      return ns;
    });
    if (isOver(withRand)) setOver(true);
  };

  const reset = () => {
    setGrid(addRandom(addRandom(emptyGrid())));
    setScore(0);
    setOver(false);
  };

  const responder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) =>
          Math.abs(g.dx) > 6 || Math.abs(g.dy) > 6,
        onPanResponderRelease: (_, g) => {
          const { dx, dy } = g;
          if (Math.max(Math.abs(dx), Math.abs(dy)) < 30) return;
          if (Math.abs(dx) > Math.abs(dy)) tryMove(dx > 0 ? "right" : "left");
          else tryMove(dy > 0 ? "down" : "up");
        },
      }),
    []
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#15131e" }}>
      <View style={styles.root}>
        <StatusBar barStyle="light-content" />

        <View style={styles.header}>
          <Text style={styles.title}>2048</Text>
          <View style={styles.scoreRow}>
            <View style={styles.scoreBox}>
              <Text style={styles.scoreLabel}>SCORE</Text>
              <Text style={styles.scoreValue}>{score}</Text>
            </View>
            <View style={styles.scoreBox}>
              <Text style={styles.scoreLabel}>BEST</Text>
              <Text style={styles.scoreValue}>{best}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.subtitle}>
          Swipe to combine tiles.{"\n"}Reach the <Text style={{ color: "#22d3ee" }}>2048</Text> tile.
        </Text>

        <View style={styles.boardWrap} {...responder.panHandlers}>
          <View style={[styles.board, { width: BOARD, height: BOARD }]}>
              {Array.from({ length: SIZE * SIZE }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.bgTile,
                    {
                      width: TILE,
                      height: TILE,
                      left: GAP + (i % SIZE) * (TILE + GAP),
                      top: GAP + Math.floor(i / SIZE) * (TILE + GAP),
                    },
                  ]}
                />
              ))}
              {grid.map((row, r) =>
                row.map((v, c) => {
                  if (!v) return null;
                  const t = TILE_STYLES[v] || TILE_STYLES[2048];
                  return (
                    <View
                      key={`${r}-${c}`}
                      style={[
                        styles.tile,
                        {
                          width: TILE,
                          height: TILE,
                          backgroundColor: t.bg,
                          left: GAP + c * (TILE + GAP),
                          top: GAP + r * (TILE + GAP),
                        },
                      ]}
                    >
                      <Text style={[styles.tileTxt, { color: t.fg, fontSize: t.size }]}>
                        {v}
                      </Text>
                    </View>
                  );
                })
              )}
          </View>
        </View>

        {over && (
          <View style={styles.overlay}>
            <Text style={styles.overTxt}>Game Over</Text>
            <Text style={styles.overScore}>Score {score}</Text>
            <TouchableOpacity onPress={reset} style={styles.resetBtn}>
              <Text style={styles.resetTxt}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.bottomRow}>
          <TouchableOpacity onPress={reset} style={styles.newGameBtn}>
            <Ionicons name="refresh" size={18} color="#15131e" />
            <Text style={styles.newGameTxt}>New Game</Text>
          </TouchableOpacity>
        </View>

        {/* fallback dpad for emulator/web */}
        <View style={styles.dpad}>
          <TouchableOpacity onPress={() => tryMove("up")} style={styles.dpadBtn}>
            <Ionicons name="chevron-up" size={22} color="#fff" />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity onPress={() => tryMove("left")} style={styles.dpadBtn}>
              <Ionicons name="chevron-back" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => tryMove("down")} style={styles.dpadBtn}>
              <Ionicons name="chevron-down" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => tryMove("right")} style={styles.dpadBtn}>
              <Ionicons name="chevron-forward" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingTop: 60, paddingHorizontal: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { color: "#fff", fontSize: 56, fontWeight: "900", letterSpacing: -2 },
  scoreRow: { flexDirection: "row", gap: 8 },
  scoreBox: {
    backgroundColor: "#27243a",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 80,
    alignItems: "center",
  },
  scoreLabel: { color: "#7a7595", fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  scoreValue: { color: "#fff", fontSize: 18, fontWeight: "800" },
  subtitle: { color: "#9b96b8", fontSize: 13, marginTop: 12, lineHeight: 18 },
  boardWrap: { alignItems: "center", marginTop: 18 },
  board: {
    backgroundColor: "#27243a",
    borderRadius: 8,
    position: "relative",
  },
  bgTile: {
    position: "absolute",
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  tile: {
    position: "absolute",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  tileTxt: { fontWeight: "900" },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(21,19,30,0.92)",
    alignItems: "center",
    justifyContent: "center",
  },
  overTxt: { color: "#fff", fontSize: 40, fontWeight: "900" },
  overScore: { color: "#9b96b8", fontSize: 16, marginTop: 8 },
  resetBtn: {
    marginTop: 24,
    backgroundColor: "#22d3ee",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
  },
  resetTxt: { color: "#000", fontWeight: "800", fontSize: 16 },
  bottomRow: { alignItems: "center", marginTop: 16 },
  newGameBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  newGameTxt: { color: "#15131e", fontWeight: "800" },
  dpad: {
    alignItems: "center",
    gap: 12,
    marginTop: 14,
  },
  dpadBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#27243a",
    alignItems: "center",
    justifyContent: "center",
  },
});
