import { useState, useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';

// Game Constants
const { width } = Dimensions.get('window');
const GRID_SIZE = 20; // 20x20 grid
const CELL_SIZE = Math.floor((width - 40) / GRID_SIZE);
const SPEED = 200; // ms

// Types
export type Point = [number, number];
export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface UseSnakeGameReturn {
  snake: Point[];
  food: Point;
  score: number;
  gameOver: boolean;
  isPlaying: boolean;
  changeDirection: (newDir: Direction) => void;
  restartGame: () => void;
  startGame: () => void;
}

export function useSnakeGame(): UseSnakeGameReturn {
  const [snake, setSnake] = useState<Point[]>([[10, 10], [10, 11], [10, 12]]);
  const [food, setFood] = useState<Point>([5, 5]);
  const [direction, setDirection] = useState<Direction>('UP');
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Refs to prevent closure staleness in interval
  const directionRef = useRef<Direction>('UP');
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying && !gameOver) {
      gameLoopRef.current = setInterval(moveSnake, SPEED);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, gameOver, snake]);

  const spawnFood = (currentSnake: Point[]): Point => {
    let newFood: Point;
    while (true) {
      const x = Math.floor(Math.random() * GRID_SIZE);
      const y = Math.floor(Math.random() * GRID_SIZE);
      // Ensure food doesn't spawn on snake body
      const onSnake = currentSnake.some(segment => segment[0] === x && segment[1] === y);
      if (!onSnake) {
        newFood = [x, y];
        break;
      }
    }
    return newFood;
  };

  const handleGameOver = () => {
    setGameOver(true);
    setIsPlaying(false);
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
  };

  const moveSnake = () => {
    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead: Point = [...head];

      switch (directionRef.current) {
        case 'UP': newHead[1] -= 1; break;
        case 'DOWN': newHead[1] += 1; break;
        case 'LEFT': newHead[0] -= 1; break;
        case 'RIGHT': newHead[0] += 1; break;
      }

      // 1. Check Wall Collision
      if (
        newHead[0] < 0 || 
        newHead[0] >= GRID_SIZE || 
        newHead[1] < 0 || 
        newHead[1] >= GRID_SIZE
      ) {
        handleGameOver();
        return prevSnake;
      }

      // 2. Check Self Collision
      if (prevSnake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])) {
        handleGameOver();
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // 3. Check Food
      if (newHead[0] === food[0] && newHead[1] === food[1]) {
        setScore(s => s + 10);
        setFood(spawnFood(newSnake));
        // Don't pop tail (grow)
      } else {
        newSnake.pop(); // Remove tail
      }

      return newSnake;
    });
  };

  const changeDirection = (newDir: Direction) => {
    const currentDir = directionRef.current;
    // Prevent 180 degree turns
    if (newDir === 'UP' && currentDir === 'DOWN') return;
    if (newDir === 'DOWN' && currentDir === 'UP') return;
    if (newDir === 'LEFT' && currentDir === 'RIGHT') return;
    if (newDir === 'RIGHT' && currentDir === 'LEFT') return;

    setDirection(newDir);
    directionRef.current = newDir;
  };

  const restartGame = () => {
    setSnake([[10, 10], [10, 11], [10, 12]]);
    setFood([5, 5]);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    setDirection('UP');
    directionRef.current = 'UP';
  };

  const startGame = () => {
    setIsPlaying(true);
  };

  return {
    snake,
    food,
    score,
    gameOver,
    isPlaying,
    changeDirection,
    restartGame,
    startGame,
  };
}

export { GRID_SIZE, CELL_SIZE };
