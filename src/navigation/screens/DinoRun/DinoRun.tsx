import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get("window");
const GAME_W = Math.min(width - 32, 420);
const GAME_H = 200;
const GROUND_Y = 160;
const DINO_X = 40;
const DINO_W = 36;
const DINO_H = 40;
const GRAVITY = 1.2;
const JUMP_V = -16;

type Obstacle = { x: number; w: number; h: number; type: "cactus" | "bird"; y?: number };

function spawnObstacle(): Obstacle {
  const r = Math.random();
  if (r < 0.65) {
    const big = Math.random() < 0.4;
    return {
      x: GAME_W + 20,
      w: big ? 22 : 14,
      h: big ? 38 : 26,
      type: "cactus",
    };
  }
  return {
    x: GAME_W + 20,
    w: 30,
    h: 22,
    type: "bird",
    y: Math.random() < 0.5 ? GROUND_Y - 50 : GROUND_Y - 30,
  };
}

export default function DinoRun() {
  const [dinoY, setDinoY] = useState(GROUND_Y - DINO_H);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [step, setStep] = useState(0);

  const dinoVRef = useRef(0);
  const dinoYRef = useRef(GROUND_Y - DINO_H);
  const obsRef = useRef<Obstacle[]>([]);
  const scoreRef = useRef(0);
  const speedRef = useRef(6);
  const spawnTimerRef = useRef(0);
  const runningRef = useRef(false);

  dinoYRef.current = dinoY;
  obsRef.current = obstacles;
  runningRef.current = running;

  const jump = useCallback(() => {
    if (!runningRef.current) {
      // start
      setRunning(true);
      runningRef.current = true;
      setGameOver(false);
      setObstacles([]);
      obsRef.current = [];
      setScore(0);
      scoreRef.current = 0;
      speedRef.current = 6;
      spawnTimerRef.current = 0;
      dinoVRef.current = JUMP_V;
      setDinoY(GROUND_Y - DINO_H - 1);
      return;
    }
    if (dinoYRef.current >= GROUND_Y - DINO_H - 1) {
      dinoVRef.current = JUMP_V;
    }
  }, []);

  const die = useCallback(() => {
    setRunning(false);
    runningRef.current = false;
    setGameOver(true);
    setBest((b) => Math.max(b, scoreRef.current));
  }, []);

  useEffect(() => {
    let raf: any;
    let lastStep = 0;
    const loop = (ts: number) => {
      if (!runningRef.current) {
        raf = requestAnimationFrame(loop);
        return;
      }
      // physics
      dinoVRef.current += GRAVITY;
      let ny = dinoYRef.current + dinoVRef.current;
      if (ny >= GROUND_Y - DINO_H) {
        ny = GROUND_Y - DINO_H;
        dinoVRef.current = 0;
      }
      setDinoY(ny);

      // obstacles
      const moved = obsRef.current
        .map((o) => ({ ...o, x: o.x - speedRef.current }))
        .filter((o) => o.x + o.w > -10);

      spawnTimerRef.current += 1;
      const minGap = Math.max(38, 90 - Math.floor(scoreRef.current / 30));
      if (spawnTimerRef.current > minGap && Math.random() < 0.04) {
        moved.push(spawnObstacle());
        spawnTimerRef.current = 0;
      }
      obsRef.current = moved;
      setObstacles(moved);

      // collide
      const dinoTop = ny;
      const dinoBottom = ny + DINO_H;
      for (const o of moved) {
        const oy = o.type === "bird" ? o.y! : GROUND_Y - o.h;
        const ox = o.x;
        const right = ox + o.w;
        const bottom = oy + o.h;
        const horiz = DINO_X + DINO_W - 4 > ox + 4 && DINO_X + 4 < right - 4;
        const vert = dinoBottom - 4 > oy + 4 && dinoTop + 4 < bottom - 4;
        if (horiz && vert) {
          die();
          return;
        }
      }

      // score
      scoreRef.current += 1;
      setScore(Math.floor(scoreRef.current / 4));
      speedRef.current = Math.min(14, 6 + scoreRef.current / 800);

      // run animation
      if (ts - lastStep > 80) {
        setStep((s) => (s + 1) % 2);
        lastStep = ts;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [die]);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.scoreRow}>
        <Text style={styles.label}>HI</Text>
        <Text style={styles.score}>{best.toString().padStart(5, "0")}</Text>
        <View style={{ width: 16 }} />
        <Text style={styles.score}>{score.toString().padStart(5, "0")}</Text>
      </View>

      <TouchableWithoutFeedback onPress={jump}>
        <View style={styles.gameArea}>
          {/* Stars */}
          {[
            [40, 18], [120, 36], [220, 24], [310, 50], [380, 12],
          ].map(([x, y], i) => (
            <View key={i} style={[styles.star, { left: x, top: y }]} />
          ))}

          {/* Moon */}
          <View style={styles.moon}>
            <View style={styles.moonInner} />
          </View>

          {/* Ground line */}
          <View style={styles.ground} />
          <View style={[styles.groundDots, { top: GROUND_Y + 6 }]}>
            {Array.from({ length: 30 }).map((_, i) => (
              <View
                key={i}
                style={{
                  width: 4,
                  height: 1,
                  backgroundColor: "#535353",
                  marginRight: 12,
                  marginTop: i % 3 === 0 ? 4 : 0,
                }}
              />
            ))}
          </View>

          {/* Dino */}
          <View
            style={[
              styles.dino,
              {
                left: DINO_X,
                top: dinoY,
              },
            ]}
          >
            {/* Dino body — pixel-art style with View blocks */}
            <DinoSprite step={step} airborne={dinoY < GROUND_Y - DINO_H - 1} />
          </View>

          {/* Obstacles */}
          {obstacles.map((o, i) => {
            const top = o.type === "bird" ? o.y! : GROUND_Y - o.h;
            return (
              <View
                key={i}
                style={{
                  position: "absolute",
                  left: o.x,
                  top,
                  width: o.w,
                  height: o.h,
                  backgroundColor: "#a3a3a3",
                  borderRadius: o.type === "bird" ? 6 : 0,
                }}
              >
                {o.type === "bird" && (
                  <MaterialCommunityIcons name="bird" size={o.h - 2} color="#1a1a1a" />
                )}
              </View>
            );
          })}

          {/* Start / end overlay */}
          {!running && !gameOver && (
            <View style={styles.centerOverlay}>
              <Text style={styles.tapTxt}>Tap to start</Text>
            </View>
          )}
          {gameOver && (
            <View style={styles.centerOverlay}>
              <Text style={styles.gameOverTxt}>G A M E   O V E R</Text>
              <Text style={styles.tapTxtSmall}>Tap to play again</Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.hint}>
        <Text style={styles.hintTxt}>Tap anywhere to jump</Text>
      </View>
    </View>
  );
}

function DinoSprite({ step, airborne }: { step: number; airborne: boolean }) {
  // simple pixel-art block dino composed of Views
  return (
    <View style={{ width: DINO_W, height: DINO_H }}>
      {/* head */}
      <View style={[sp.block, { left: 16, top: 0, width: 18, height: 14 }]} />
      {/* eye */}
      <View style={[sp.eye, { left: 28, top: 4 }]} />
      {/* neck */}
      <View style={[sp.block, { left: 14, top: 12, width: 4, height: 6 }]} />
      {/* body */}
      <View style={[sp.block, { left: 4, top: 14, width: 22, height: 14 }]} />
      {/* tail */}
      <View style={[sp.block, { left: 0, top: 14, width: 6, height: 6 }]} />
      {/* legs */}
      {airborne ? (
        <>
          <View style={[sp.block, { left: 8, top: 28, width: 4, height: 8 }]} />
          <View style={[sp.block, { left: 18, top: 28, width: 4, height: 8 }]} />
        </>
      ) : step === 0 ? (
        <>
          <View style={[sp.block, { left: 8, top: 28, width: 4, height: 12 }]} />
          <View style={[sp.block, { left: 18, top: 28, width: 4, height: 6 }]} />
        </>
      ) : (
        <>
          <View style={[sp.block, { left: 8, top: 28, width: 4, height: 6 }]} />
          <View style={[sp.block, { left: 18, top: 28, width: 4, height: 12 }]} />
        </>
      )}
    </View>
  );
}

const sp = StyleSheet.create({
  block: { position: "absolute", backgroundColor: "#e8e8e8" },
  eye: {
    position: "absolute",
    width: 2,
    height: 2,
    backgroundColor: "#1a1a1a",
  },
});

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0d0d0f", paddingTop: 60, alignItems: "center" },
  scoreRow: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    marginBottom: 14,
    gap: 6,
    alignItems: "baseline",
  },
  label: { color: "#a3a3a3", fontSize: 13, fontWeight: "700", letterSpacing: 1 },
  score: {
    color: "#e8e8e8",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 2,
    fontFamily: "Courier",
  },
  gameArea: {
    width: GAME_W,
    height: GAME_H,
    backgroundColor: "#0d0d0f",
    borderWidth: 1,
    borderColor: "#1f1f1f",
    overflow: "hidden",
  },
  star: {
    position: "absolute",
    width: 2,
    height: 2,
    backgroundColor: "#535353",
  },
  moon: {
    position: "absolute",
    right: 24,
    top: 14,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#e8e8e8",
    overflow: "hidden",
  },
  moonInner: {
    position: "absolute",
    left: -8,
    top: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#0d0d0f",
  },
  ground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: GROUND_Y,
    height: 1,
    backgroundColor: "#535353",
  },
  groundDots: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
  },
  dino: { position: "absolute" },
  centerOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  tapTxt: { color: "#e8e8e8", fontSize: 16, fontWeight: "700", letterSpacing: 2 },
  tapTxtSmall: { color: "#a3a3a3", fontSize: 12, marginTop: 8, letterSpacing: 1 },
  gameOverTxt: { color: "#e8e8e8", fontSize: 18, fontWeight: "900", letterSpacing: 4 },
  hint: { marginTop: 28 },
  hintTxt: { color: "#535353", fontSize: 12, letterSpacing: 1 },
});
