import { useState, useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const LANE_COUNT = 3;
const LANE_WIDTH = width * 0.8 / LANE_COUNT;
const GAME_HEIGHT = height * 0.6;
const TICK_RATE = 50;
const ENEMY_SPEED = 15;

interface Enemy {
  id: number;
  lane: number;
  y: number;
}

export interface UseRaceGameReturn {
  playerLane: number;
  enemies: Enemy[];
  score: number;
  isGameOver: boolean;
  isRunning: boolean;
  moveLeft: () => void;
  moveRight: () => void;
  startGame: () => void;
  LANE_WIDTH: number;
  LANE_COUNT: number;
  GAME_HEIGHT: number;
}

export function useRaceGame(): UseRaceGameReturn {
  const [playerLane, setPlayerLane] = useState(1);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const gameLoop = useRef<NodeJS.Timeout | null>(null);
  const scoreRef = useRef(0);

  const startGame = () => {
    setEnemies([]);
    setScore(0);
    scoreRef.current = 0;
    setIsGameOver(false);
    setIsRunning(true);
    setPlayerLane(1);
  };

  useEffect(() => {
    if (isRunning && !isGameOver) {
      gameLoop.current = setInterval(() => {
        updateGame();
      }, TICK_RATE);
    } else {
      if (gameLoop.current) clearInterval(gameLoop.current);
    }
    return () => {
      if (gameLoop.current) clearInterval(gameLoop.current);
    };
  }, [isRunning, isGameOver, playerLane, enemies]);

  const updateGame = () => {
    setEnemies((prevEnemies) => {
      const movedEnemies = prevEnemies
        .map(e => ({ ...e, y: e.y + ENEMY_SPEED }))
        .filter(e => e.y < GAME_HEIGHT);

      const collision = movedEnemies.some(
        e => e.lane === playerLane && e.y > GAME_HEIGHT - 80 && e.y < GAME_HEIGHT - 20
      );

      if (collision) {
        setIsGameOver(true);
        setIsRunning(false);
        return movedEnemies;
      }

      if (Math.random() > 0.92 && movedEnemies.length < 4) {
        movedEnemies.push({
          id: Date.now(),
          lane: Math.floor(Math.random() * LANE_COUNT),
          y: -50,
        });
      }

      scoreRef.current += 1;
      setScore(Math.floor(scoreRef.current / 10));
      return movedEnemies;
    });
  };

  const moveLeft = () => {
    if (playerLane > 0) setPlayerLane(playerLane - 1);
  };

  const moveRight = () => {
    if (playerLane < LANE_COUNT - 1) setPlayerLane(playerLane + 1);
  };

  return {
    playerLane,
    enemies,
    score,
    isGameOver,
    isRunning,
    moveLeft,
    moveRight,
    startGame,
    LANE_WIDTH,
    LANE_COUNT,
    GAME_HEIGHT,
  };
}