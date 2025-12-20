import { useState, useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

// --- Constants ---
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
export const BIRD_SIZE = 40;
export const BIRD_START_X = SCREEN_WIDTH * 0.2;
export const BIRD_START_Y = SCREEN_HEIGHT / 2;
const GRAVITY = 0.8;
const JUMP_STRENGTH = -12;
export const OBSTACLE_WIDTH = 80;
export const OBSTACLE_GAP = 180;
const OBSTACLE_SPEED = 4;
const OBSTACLE_SPACING = 300; // Distance between obstacles
export const PIPE_CAP_HEIGHT = 30;

export type Obstacle = {
  x: number;
  topHeight: number;
  passed: boolean;
  id: number;
};

export const useFlappyBird = () => {
  // --- State ---
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [birdPosition, setBirdPosition] = useState(BIRD_START_Y);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const obstacleIdCounter = useRef(0);
  const birdRotation = useRef(new Animated.Value(0)).current;
  
  // Use refs for game loop to avoid dependency issues
  const birdVelocityRef = useRef(0);
  const lastFrameTime = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // --- Game Logic ---

  // Jump Handler
  const jump = () => {
    if (!gameRunning && !gameOver) {
      startGame();
    } else if (gameRunning) {
      birdVelocityRef.current = JUMP_STRENGTH;
      setBirdVelocity(JUMP_STRENGTH);
      // Rotate bird up when jumping
      Animated.spring(birdRotation, {
        toValue: -5,
        useNativeDriver: true,
        tension: 100,
        friction: 5,
      }).start();
    }
  };

  // Start Game / Reset
  const startGame = () => {
    setGameRunning(true);
    setGameOver(false);
    setBirdPosition(BIRD_START_Y);
    birdVelocityRef.current = 0;
    setBirdVelocity(0);
    setObstacles([]);
    setScore(0);
    obstacleIdCounter.current = 0;
    birdRotation.setValue(0);
    lastFrameTime.current = null;
  };

  // Reset Game
  const resetGame = () => {
    setGameRunning(false);
    setGameOver(false);
    setBirdPosition(BIRD_START_Y);
    birdVelocityRef.current = 0;
    setBirdVelocity(0);
    setObstacles([]);
    setScore(0);
    obstacleIdCounter.current = 0;
    birdRotation.setValue(0);
    lastFrameTime.current = null;
    if (animationFrameId.current !== null) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  };

  // Game Loop with consistent delta-time
  useEffect(() => {
    if (!gameRunning) {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      lastFrameTime.current = null;
      return;
    }

    const TARGET_FPS = 60;
    const FRAME_TIME = 1000 / TARGET_FPS; // ~16.67ms per frame

    const gameLoop = (currentTime: number) => {
      if (!gameRunning) {
        animationFrameId.current = null;
        return;
      }

      // Calculate delta time for consistent movement
      if (lastFrameTime.current === null) {
        lastFrameTime.current = currentTime;
        animationFrameId.current = requestAnimationFrame(gameLoop);
        return;
      }

      const deltaTime = currentTime - lastFrameTime.current;
      lastFrameTime.current = currentTime;

      // Only update if enough time has passed (throttle to target FPS)
      if (deltaTime >= FRAME_TIME) {
        // Apply Gravity with consistent delta time
        const gravityDelta = (GRAVITY * deltaTime) / FRAME_TIME;
        birdVelocityRef.current += gravityDelta;
        
        // Update state for bird velocity
        setBirdVelocity(birdVelocityRef.current);
        
        // Rotate bird down based on velocity
        const rotation = Math.min(90, Math.max(-30, birdVelocityRef.current * 3));
        birdRotation.setValue(rotation);

        // Update bird position
        setBirdPosition((pos) => {
          const velocityDelta = (birdVelocityRef.current * deltaTime) / FRAME_TIME;
          const newPos = pos + velocityDelta;
          return Math.max(0, Math.min(SCREEN_HEIGHT - BIRD_SIZE, newPos));
        });

        // Move Obstacles & Generate New Ones with consistent speed
        setObstacles((currentObstacles) => {
          const speedDelta = (OBSTACLE_SPEED * deltaTime) / FRAME_TIME;
          let newObstacles = currentObstacles
            .map((obs) => ({ ...obs, x: obs.x - speedDelta }))
            .filter((obs) => obs.x + OBSTACLE_WIDTH > -50);

          // Add new obstacle if needed
          const lastObstacle = newObstacles[newObstacles.length - 1];
          if (
            newObstacles.length === 0 ||
            (lastObstacle && lastObstacle.x < SCREEN_WIDTH - OBSTACLE_SPACING)
          ) {
            const minHeight = 80;
            const maxHeight = SCREEN_HEIGHT - OBSTACLE_GAP - minHeight;
            const randomHeight =
              Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;

            newObstacles.push({
              x: SCREEN_WIDTH,
              topHeight: randomHeight,
              passed: false,
              id: obstacleIdCounter.current++,
            });
          }

          return newObstacles;
        });
      }

      // Continue the loop
      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    // Start the game loop
    animationFrameId.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      lastFrameTime.current = null;
    };
  }, [gameRunning]);

  // Collision Detection & Score
  useEffect(() => {
    if (!gameRunning) return;

    // Check floor/ceiling collision
    if (birdPosition >= SCREEN_HEIGHT - BIRD_SIZE || birdPosition <= 0) {
      handleGameOver();
      return;
    }

    // Check obstacle collision
    const birdLeft = BIRD_START_X;
    const birdRight = BIRD_START_X + BIRD_SIZE;
    const birdTop = birdPosition;
    const birdBottom = birdPosition + BIRD_SIZE;

    obstacles.forEach((obs) => {
      const pipeLeft = obs.x;
      const pipeRight = obs.x + OBSTACLE_WIDTH;

      // Horizontal collision check
      const isCollidingHorizontally = birdRight > pipeLeft && birdLeft < pipeRight;

      if (isCollidingHorizontally) {
        // Vertical collision check
        const topPipeBottom = obs.topHeight;
        const bottomPipeTop = obs.topHeight + OBSTACLE_GAP;

        if (birdTop < topPipeBottom || birdBottom > bottomPipeTop) {
          handleGameOver();
          return;
        }
      }

      // Score update
      if (!obs.passed && birdLeft > pipeRight) {
        setScore((s) => s + 1);
        obs.passed = true;
      }
    });
  }, [birdPosition, obstacles, gameRunning]);

  const handleGameOver = () => {
    setGameRunning(false);
    setGameOver(true);
    if (score > bestScore) {
      setBestScore(score);
    }
  };

  // Rotate bird based on velocity
  const birdRotationStyle = {
    transform: [
      {
        rotate: birdRotation.interpolate({
          inputRange: [-30, 90],
          outputRange: ['-30deg', '90deg'],
        }),
      },
    ],
  };

  return {
    // State
    gameRunning,
    gameOver,
    birdPosition,
    obstacles,
    score,
    bestScore,
    birdRotationStyle,
    // Actions
    jump,
    startGame,
    resetGame,
  };
};

