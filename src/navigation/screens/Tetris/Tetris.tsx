import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const COLS = 10;
const ROWS = 20;

type Cell = number; // 0 = empty, 1..7 = color index
type Board = Cell[][];

const COLORS = [
  "#0a0a0f",       // 0 empty
  "#00f0f0",       // I
  "#f0f000",       // O
  "#a000f0",       // T
  "#00f000",       // S
  "#f00000",       // Z
  "#0000f0",       // J
  "#f0a000",       // L
];

type Shape = number[][];

const SHAPES: { shape: Shape; color: number }[] = [
  // I
  { color: 1, shape: [[1, 1, 1, 1]] },
  // O
  { color: 2, shape: [[1, 1], [1, 1]] },
  // T
  { color: 3, shape: [[0, 1, 0], [1, 1, 1]] },
  // S
  { color: 4, shape: [[0, 1, 1], [1, 1, 0]] },
  // Z
  { color: 5, shape: [[1, 1, 0], [0, 1, 1]] },
  // J
  { color: 6, shape: [[1, 0, 0], [1, 1, 1]] },
  // L
  { color: 7, shape: [[0, 0, 1], [1, 1, 1]] },
];

function emptyBoard(): Board {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

function rotate(s: Shape): Shape {
  const h = s.length;
  const w = s[0].length;
  const r: Shape = Array.from({ length: w }, () => Array(h).fill(0));
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) r[x][h - 1 - y] = s[y][x];
  return r;
}

function collides(board: Board, shape: Shape, x: number, y: number): boolean {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const nx = x + c;
      const ny = y + r;
      if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
      if (ny >= 0 && board[ny][nx]) return true;
    }
  }
  return false;
}

function merge(board: Board, shape: Shape, color: number, x: number, y: number): Board {
  const b = board.map((row) => row.slice());
  for (let r = 0; r < shape.length; r++)
    for (let c = 0; c < shape[r].length; c++)
      if (shape[r][c] && y + r >= 0) b[y + r][x + c] = color;
  return b;
}

function clearLines(board: Board): { board: Board; cleared: number } {
  const kept = board.filter((row) => row.some((c) => c === 0));
  const cleared = ROWS - kept.length;
  const empties = Array.from({ length: cleared }, () => Array(COLS).fill(0));
  return { board: [...empties, ...kept], cleared };
}

function randomPiece() {
  const i = Math.floor(Math.random() * SHAPES.length);
  return { shape: SHAPES[i].shape.map((r) => r.slice()), color: SHAPES[i].color };
}

export default function Tetris() {
  const { width } = useWindowDimensions();
  const CELL = Math.floor((width - 40) / COLS);
  const [board, setBoard] = useState<Board>(emptyBoard);
  const [piece, setPiece] = useState(() => randomPiece());
  const [next, setNext] = useState(() => randomPiece());
  const [pos, setPos] = useState({ x: 4, y: 0 });
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);

  const boardRef = useRef(board);
  const pieceRef = useRef(piece);
  const posRef = useRef(pos);
  const overRef = useRef(gameOver);
  const pausedRef = useRef(paused);

  boardRef.current = board;
  pieceRef.current = piece;
  posRef.current = pos;
  overRef.current = gameOver;
  pausedRef.current = paused;

  const speed = Math.max(120, 700 - lines * 25);

  const spawn = useCallback(() => {
    const p = pieceRef.current;
    const startX = Math.floor((COLS - p.shape[0].length) / 2);
    if (collides(boardRef.current, p.shape, startX, 0)) {
      setGameOver(true);
      return;
    }
    setPos({ x: startX, y: 0 });
  }, []);

  const lockAndNext = useCallback(() => {
    const merged = merge(boardRef.current, pieceRef.current.shape, pieceRef.current.color, posRef.current.x, posRef.current.y);
    const { board: cleared, cleared: n } = clearLines(merged);
    setBoard(cleared);
    if (n > 0) {
      setScore((s) => s + [0, 100, 300, 500, 800][n]);
      setLines((l) => l + n);
    }
    const newPiece = next;
    setPiece(newPiece);
    setNext(randomPiece());
    pieceRef.current = newPiece;
    const startX = Math.floor((COLS - newPiece.shape[0].length) / 2);
    if (collides(cleared, newPiece.shape, startX, 0)) {
      setGameOver(true);
      return;
    }
    setPos({ x: startX, y: 0 });
  }, [next]);

  const tick = useCallback(() => {
    if (overRef.current || pausedRef.current) return;
    const { x, y } = posRef.current;
    if (!collides(boardRef.current, pieceRef.current.shape, x, y + 1)) {
      setPos({ x, y: y + 1 });
    } else {
      lockAndNext();
    }
  }, [lockAndNext]);

  useEffect(() => {
    const id = setInterval(tick, speed);
    return () => clearInterval(id);
  }, [tick, speed]);

  const move = (dx: number) => {
    if (gameOver || paused) return;
    const { x, y } = posRef.current;
    if (!collides(boardRef.current, pieceRef.current.shape, x + dx, y)) {
      setPos({ x: x + dx, y });
    }
  };

  const rotatePiece = () => {
    if (gameOver || paused) return;
    const r = rotate(pieceRef.current.shape);
    let { x, y } = posRef.current;
    // wall kick
    for (const dx of [0, -1, 1, -2, 2]) {
      if (!collides(boardRef.current, r, x + dx, y)) {
        setPiece({ ...pieceRef.current, shape: r });
        setPos({ x: x + dx, y });
        return;
      }
    }
  };

  const drop = () => {
    if (gameOver || paused) return;
    let { x, y } = posRef.current;
    while (!collides(boardRef.current, pieceRef.current.shape, x, y + 1)) y++;
    setPos({ x, y });
    setTimeout(lockAndNext, 0);
  };

  const reset = () => {
    setBoard(emptyBoard());
    const p = randomPiece();
    setPiece(p);
    setNext(randomPiece());
    setPos({ x: 4, y: 0 });
    setScore(0);
    setLines(0);
    setGameOver(false);
    setPaused(false);
  };

  // render board with active piece overlay
  const display = board.map((row) => row.slice());
  for (let r = 0; r < piece.shape.length; r++) {
    for (let c = 0; c < piece.shape[r].length; c++) {
      if (piece.shape[r][c] && pos.y + r >= 0) {
        if (pos.y + r < ROWS && pos.x + c < COLS) display[pos.y + r][pos.x + c] = piece.color;
      }
    }
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <View>
          <Text style={styles.label}>SCORE</Text>
          <Text style={styles.value}>{score}</Text>
        </View>
        <Text style={styles.title}>TETRIS</Text>
        <View>
          <Text style={styles.label}>LINES</Text>
          <Text style={[styles.value, { textAlign: "right" }]}>{lines}</Text>
        </View>
      </View>

      <View style={styles.boardWrap}>
        <View style={styles.boardBorder}>
          {display.map((row, ri) => (
            <View key={ri} style={styles.row}>
              {row.map((c, ci) => (
                <View
                  key={ci}
                  style={[
                    styles.cell,
                    {
                      width: CELL,
                      height: CELL,
                      backgroundColor: c ? COLORS[c] : "#0a0a0f",
                      borderTopColor: c ? "rgba(255,255,255,0.4)" : "transparent",
                      borderLeftColor: c ? "rgba(255,255,255,0.4)" : "transparent",
                      borderBottomColor: c ? "rgba(0,0,0,0.4)" : "transparent",
                      borderRightColor: c ? "rgba(0,0,0,0.4)" : "transparent",
                    },
                  ]}
                />
              ))}
            </View>
          ))}
        </View>

        <View style={styles.sidePanel}>
          <Text style={styles.sideLabel}>NEXT</Text>
          <View style={styles.nextWrap}>
            {next.shape.map((row, ri) => (
              <View key={ri} style={{ flexDirection: "row" }}>
                {row.map((c, ci) => (
                  <View
                    key={ci}
                    style={[
                      styles.smallCell,
                      { backgroundColor: c ? COLORS[next.color] : "transparent" },
                    ]}
                  />
                ))}
              </View>
            ))}
          </View>
          <TouchableOpacity onPress={() => setPaused((p) => !p)} style={styles.pauseBtn}>
            <Ionicons name={paused ? "play" : "pause"} size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {(gameOver || paused) && (
        <View style={styles.overlay}>
          <Text style={styles.overlayTitle}>{gameOver ? "GAME OVER" : "PAUSED"}</Text>
          <TouchableOpacity onPress={gameOver ? reset : () => setPaused(false)} style={styles.overlayBtn}>
            <Text style={styles.overlayBtnTxt}>{gameOver ? "PLAY AGAIN" : "RESUME"}</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => move(-1)} style={styles.ctrlBtn}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={rotatePiece} style={styles.ctrlBtn}>
          <MaterialCommunityIcons name="rotate-right" size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={drop} style={[styles.ctrlBtn, styles.ctrlPrimary]}>
          <Ionicons name="arrow-down" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => move(1)} style={styles.ctrlBtn}>
          <Ionicons name="chevron-forward" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000", paddingTop: 50 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 4,
  },
  label: { color: "#5a5a6a", fontSize: 10, fontWeight: "700", letterSpacing: 1.5 },
  value: { color: "#fff", fontSize: 20, fontWeight: "800", marginTop: 2 },
  boardWrap: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 8,
    flex: 1,
  },
  boardBorder: {
    borderWidth: 2,
    borderColor: "#1f1f2a",
    backgroundColor: "#000",
  },
  row: { flexDirection: "row" },
  cell: {
    borderWidth: 1,
  },
  sidePanel: { flex: 1, alignItems: "center" },
  sideLabel: { color: "#5a5a6a", fontSize: 10, fontWeight: "700", letterSpacing: 1.5, marginBottom: 6 },
  nextWrap: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: "#1f1f2a",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0a0a0f",
  },
  smallCell: { width: 14, height: 14, borderWidth: 1, borderColor: "rgba(0,0,0,0.4)" },
  pauseBtn: {
    marginTop: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1f1f2a",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
    alignItems: "center",
    justifyContent: "center",
  },
  overlayTitle: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: 4,
    marginBottom: 24,
  },
  overlayBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 4,
  },
  overlayBtnTxt: { color: "#000", fontWeight: "800", letterSpacing: 2 },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 16,
    gap: 10,
  },
  ctrlBtn: {
    flex: 1,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#1f1f2a",
    alignItems: "center",
    justifyContent: "center",
  },
  ctrlPrimary: { backgroundColor: "#fff" },
});
