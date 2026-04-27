import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';

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

export default function RaceGame() {
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
    return () => { if (gameLoop.current) clearInterval(gameLoop.current); };
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

  const moveLeft = () => playerLane > 0 && setPlayerLane(playerLane - 1);
  const moveRight = () => playerLane < LANE_COUNT - 1 && setPlayerLane(playerLane + 1);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#000', '#1a0033', '#000']} style={styles.fullScreen}>
        <SafeAreaView style={styles.safe}>
          
          <View style={styles.header}>
            <Text style={styles.title}>NEON<Text style={{color: '#FF0055'}}>RUSH</Text></Text>
            <View style={styles.scoreCounter}>
              <Text style={styles.scoreText}>{score.toString().padStart(5, '0')}</Text>
            </View>
          </View>

          <View style={styles.track}>
            {[...Array(LANE_COUNT)].map((_, i) => (
              <View key={i} style={styles.laneLine} />
            ))}
            
            {enemies.map(enemy => (
              <View 
                key={enemy.id} 
                style={[styles.enemy, { left: enemy.lane * LANE_WIDTH + (LANE_WIDTH * 0.1), top: enemy.y }]}
              >
                <Text style={{fontSize: 30}}>🚔</Text>
              </View>
            ))}

            <View style={[styles.player, { left: playerLane * LANE_WIDTH + (LANE_WIDTH * 0.1) }]}>
              <Text style={{fontSize: 40}}>🏎️</Text>
              <View style={styles.playerGlow} />
            </View>

            {(!isRunning || isGameOver) && (
              <View style={styles.overlay}>
                {isGameOver && <Text style={styles.gameOverText}>CRASHED</Text>}
                <TouchableOpacity style={styles.startBtn} onPress={startGame}>
                  <Text style={styles.startBtnText}>{isGameOver ? 'RETRY' : 'IGNITION'}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.controls}>
            <TouchableOpacity style={styles.btn} onPress={moveLeft}>
              <Text style={styles.btnText}>LEFT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={moveRight}>
              <Text style={styles.btnText}>RIGHT</Text>
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

