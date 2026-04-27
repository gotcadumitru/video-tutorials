import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSnakeGame, GRID_SIZE, CELL_SIZE } from './useSnakeGame';
import { styles } from './styles';

const BOARD_SIZE = CELL_SIZE * GRID_SIZE;

export default function SnakeGame() {
  const { snake, food, score, gameOver, isPlaying, changeDirection, restartGame, startGame } = useSnakeGame();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#0F2027', '#203A43', '#2C5364']}
        style={styles.background}
      >
        <SafeAreaView style={styles.safeArea}>
          
          <View style={styles.header}>
            <Text style={styles.title}>NEON<Text style={styles.accentText}>SNAKE</Text></Text>
            <View style={styles.scoreBoard}>
              <Text style={styles.scoreLabel}>SCORE</Text>
              <Text style={styles.scoreValue}>{score}</Text>
            </View>
          </View>

          <View style={[styles.board, { width: BOARD_SIZE, height: BOARD_SIZE }]}>
            <View
              style={[
                styles.food,
                {
                  left: food[0] * CELL_SIZE,
                  top: food[1] * CELL_SIZE,
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                },
              ]}
            />
            
            {snake.map((segment, index) => (
              <View
                key={`${segment[0]}-${segment[1]}-${index}`}
                style={[
                  styles.snakeSegment,
                  {
                    left: segment[0] * CELL_SIZE,
                    top: segment[1] * CELL_SIZE,
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    backgroundColor: index === 0 ? '#00FF00' : 'rgba(0, 255, 0, 0.6)',
                    zIndex: index === 0 ? 10 : 1
                  },
                ]}
              />
            ))}

            {gameOver && (
              <View style={styles.overlay}>
                <Text style={styles.gameOverText}>GAME OVER</Text>
                <TouchableOpacity style={styles.restartBtn} onPress={restartGame}>
                  <Text style={styles.restartText}>TRY AGAIN</Text>
                </TouchableOpacity>
              </View>
            )}

            {!isPlaying && !gameOver && (
              <View style={styles.overlay}>
                <TouchableOpacity style={styles.restartBtn} onPress={startGame}>
                  <Text style={styles.restartText}>START GAME</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.controls}>
            <View style={styles.controlRow}>
              <TouchableOpacity style={styles.controlBtn} onPress={() => changeDirection('UP')}>
                <Text style={styles.controlText}>▲</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.controlRowMiddle}>
              <TouchableOpacity style={styles.controlBtn} onPress={() => changeDirection('LEFT')}>
                <Text style={styles.controlText}>◀</Text>
              </TouchableOpacity>
              <View style={{ width: 60 }} />
              <TouchableOpacity style={styles.controlBtn} onPress={() => changeDirection('RIGHT')}>
                <Text style={styles.controlText}>▶</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.controlRow}>
              <TouchableOpacity style={styles.controlBtn} onPress={() => changeDirection('DOWN')}>
                <Text style={styles.controlText}>▼</Text>
              </TouchableOpacity>
            </View>
          </View>

        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

